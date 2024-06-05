declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_PASSWORD: string;
        DATABASE_URI: string;
        RESEND_API_KEY: string;
        JWT_SECRET: string;
        ANON_KEY: string;
    }
}
