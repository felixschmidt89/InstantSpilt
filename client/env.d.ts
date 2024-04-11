// get TypeScript IntelliSense for Vite env variables (https://vitejs.dev/guide/env-and-mode.html#intellisense)

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
