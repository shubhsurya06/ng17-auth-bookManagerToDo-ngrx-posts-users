export interface User {
    id?: number,
    username?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    gender?: string,
    image?: string,
    accessToken?: string | undefined | null,
    refreshToken?: string,
    password?: string,
    expiresInMins?: number | undefined
}
