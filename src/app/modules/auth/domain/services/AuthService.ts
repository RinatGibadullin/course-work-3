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

  constructor(private httpResource: BaseResource,
    private userRepository: UserRepository,
    private sessionResource: SessionResource) {
  }

  public login(credentials: AuthCredentials): Promise<AuthResponse> {
    const payload = { session: credentials };
    return this.sessionResource.create(payload)
      .then((sessionResponse: SessionResponse) => this.handleSessionResponse(sessionResponse))
      .then(({ user, token }: { user: User, token: string }) => this.createAuthResponse({ user, token }))
  }

  public checkUserAuth(): Promise<AuthResponse|null> {
    return this.getStoredSession().then((storedAuthResponse: AuthResponse) => {
      const isValid = storedAuthResponse?.session?.token != null && storedAuthResponse?.user?.id != null;
      if (isValid) {
        const token = storedAuthResponse.session.token;
        this.setAuthHeader(token);
        return this.userRepository.loadById(storedAuthResponse.user.id)
          .then((user: User) => this.createAuthResponse({ user, token }));
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

  private handleSessionResponse(sessionResponse: SessionResponse) {
    const data = sessionResponse.data
    if (data.token != null && data.user_id != null) {
      this.setAuthHeader(data.token);
      return this.userRepository.loadById(data.user_id)
        .then((user: User) => ({ user, token: data.token }));
    }
    udError.throw(UDErrorCode.AuthResponseInvalid);
  }

  private createAuthResponse({ user, token }: { user: User, token: string }) {
    const authResponse = {
      user,
      session: { token }
    };
    this.storeSession(authResponse);
    return authResponse;
  }

  private storeSession(authResponse: AuthResponse): void {
    localforage.setItem(this.STORE_TOKEN, authResponse);
  }

  private getStoredSession(): Promise<AuthResponse> {
    return localforage.getItem(this.STORE_TOKEN);
  }

  private setAuthHeader(token: string): void {
    this.httpResource.setHeaders({ 'X-Authentication-Token': token });
  }

  private clearStoredSession(): Promise<void> {
    this.httpResource.clearHeaders();
    return localforage.removeItem(this.STORE_TOKEN);
  }

}

const authService = new AuthService(httpResource, userRepository, sessionResource);
export default authService;