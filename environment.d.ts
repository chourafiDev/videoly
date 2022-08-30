declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_LOCAL: string;
      DB_CONNECTION_ATLAS: string;
      AUTH_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

export {};
