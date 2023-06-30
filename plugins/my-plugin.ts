export default defineNuxtPlugin({
  name: "my-plugin",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    // You can directly register Nuxt app hooks here
    "app:created"() {
      console.log("app:created");
      //
    },
    "app:beforeMount"() {
      console.log("app:beforeMount");
      //
    },
    "app:chunkError"() {
      console.log("app:chunkError");
      //
    },
    "app:data:refresh"() {
      console.log("app:data:refresh");
      //
    },
    "app:error:cleared"() {
      console.log("app:error:cleared");
      //
    },
    "app:mounted"() {
      const route = useRoute();
      window.addEventListener("scroll", (evt) => {
        useState(`page-scroll-top-${route.path}`).value = window.scrollY;
      });
      //
    },
    "app:redirected"() {
      console.log("app:redirected");
      //
    },
    "app:suspense:resolve"() {
      console.log("app:suspense:resolve");
      //
    },
    "link:prefetch"() {
      console.log("link:prefetch");
      //
    },
    "page:finish"() {
      const route = useRoute();
      // route.meta.loading?.close();
      console.log("page:finish", route.path);
      //
    },
    "page:start"() {
      const route = useRoute();
      // route.meta.loading = ElLoading.service({ fullscreen: true });
      console.log("page:start", route.path);
      //
    },
    "page:transition:finish"() {
      console.log("page:transition:finish");
      //
    },
    "page:transition:start"() {
      console.log("page:transition:start");
      //
    },
  },
});
