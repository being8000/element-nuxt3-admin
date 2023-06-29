// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  // import: {
  //   autoImport: true,
  // },
  runtimeConfig: {
    private: {
      // The private keys which are only available server-side
      ORIGIN: process.env.ORIGIN,
      NUXT_SECRET: process.env.NUXT_SECRET,
      STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    },
    public: {},
    auth: {
      computed: {
        origin: process.env.ORIGIN,
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt",
    "@sidebase/nuxt-auth",
    "nuxt-icon",
  ],
  auth: {
    provider: {
      type: "authjs",
    },
    // provider: {
    //   type: "local",
    //   endpoints: {
    //     getSession: { path: "/user" },
    //   },
    //   pages: {
    //     login: "/",
    //   },
    //   token: {
    //     signInResponseTokenPointer: "/token/accessToken",
    //   },
    //   sessionDataType: {
    //     id: "string",
    //     email: "string",
    //     name: "string",
    //     role: "admin | guest | account",
    //     subscriptions: "{ id: number, status: 'ACTIVE' | 'INACTIVE' }[]",
    //   },
    // },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: true,
      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: 5000,
    },
    globalAppMiddleware: {
      isEnabled: true,
      // override: true,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  elementPlus: {
    /** Options */
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;',
        },
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  // tailwindcss: {
  //   exposeConfig: true,
  // },
});
