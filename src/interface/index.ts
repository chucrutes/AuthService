export interface TokenPayload {
    iat: number
    exp: number
    userRole: string[]
    userId: string
}