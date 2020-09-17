import User from "app/modules/users/domain/interfaces/User";

export interface AuthResponse {
    user: User
    session: {
        token: string
        expiredAt?: string
    }
}
