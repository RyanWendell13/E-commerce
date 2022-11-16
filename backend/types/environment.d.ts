export interface Process{
    env: {
        MONGO_URI: string
        PORT: number
        SESSION_SECRET:string
        CORS_ORIGIN: string
    }
}