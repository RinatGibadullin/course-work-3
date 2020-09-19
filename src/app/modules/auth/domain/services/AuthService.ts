import httpResource from "app/modules/core/infrastructure/httpResource";
import { BaseResource } from "infrastructure/interfaces/BaseResource";
import { AuthCredentials } from "../interfaces/AuthCredentials";
import { AuthResponse } from "../interfaces/AuthResponse";
import sessionResource, { SessionResource } from "../resources/SessionResource";
import { SessionResponse } from "../interfaces/SessionResponse";
import userRepository, { UserRepository } from "app/modules/users/domain/repositories/UserRepository";
import { UDErrorCode } from "app/modules/ud-error/UDErrorCode";
import udError from "app/modules/ud-error/UDError";
import User from "app/modules/users/domain/interfaces/User";
import localforage from "localforage";

class AuthService {
  private STORE_TOKEN = '@token';
  private STORE_USERNAME = '@username'

  constructor(private httpResource: BaseResource,
    private userRepository: UserRepository,
    private sessionResource: SessionResource) {
  }

  public login(credentials: AuthCredentials): Promise<AuthResponse> {
    const payload = { session: credentials };
    return this.sessionResource.create(payload)
      .then((sessionResponse: SessionResponse) => this.handleSessionResponse(payload.session.username, sessionResponse))
  }

  public checkUserAuth(): Promise<AuthResponse|null> {
    return this.getStoredSession().then(async (storedAuthResponse: AuthResponse) => {
      const isValid = storedAuthResponse?.token != null;
      if (isValid) {
        const token = storedAuthResponse.token;
        const current_username = await localforage.getItem(this.STORE_USERNAME, (error: any, username: string) => { return username; })
        debugger
        this.setAuthHeader(token);
        return this.userRepository.loadById(current_username)
          .then((user: User) => this.createAuthResponse(token));
      }
      throw new Error('Session not found');
    }).catch((e) => {
      this.clearStoredSession();
      throw e;
    })
  }

  public logout(): Promise<void> {
    return this.clearStoredSession();
  }

  private handleSessionResponse(username: string, sessionResponse: SessionResponse) {
    const data = sessionResponse
    if (data.token != null) {
      this.setAuthHeader(data.token);
      this.storeSession({token: data.token});
      localforage.setItem(this.STORE_USERNAME, username)
      return {token: data.token};
    }
    udError.throw(UDErrorCode.AuthResponseInvalid);
  }

  private createAuthResponse(token : string ) {
    const authResponse = {
      token
    };
    this.storeSession(authResponse);
    return authResponse;
  }

  private storeSession(authResponse: AuthResponse): void {
    localforage.setItem(this.STORE_TOKEN, authResponse.token);
  }

  private getStoredSession(): Promise<AuthResponse> {
    return localforage.getItem(this.STORE_TOKEN);
  }

  private setAuthHeader(token: string): void {
    this.httpResource.setHeaders({ 'Authorization': 'Bearer ' + token });
  }

  private clearStoredSession(): Promise<void> {
    this.httpResource.clearHeaders();
    return localforage.removeItem(this.STORE_TOKEN);
  }

}

const authService = new AuthService(httpResource, userRepository, sessionResource);
export default authService;