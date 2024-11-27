/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_YOUTUBE_API_KEY: string;
    // Add any other environment variables you need here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }