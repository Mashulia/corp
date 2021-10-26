  import {createApp} from "vue";
  import App from "./app-cart.vue";
  import store from "./vuex/store.js";
  
  document.addEventListener('DOMContentLoaded', function() { 
    let cartApp = document.querySelector("#app-cart");

    if (cartApp) {
      createApp(App, { props: ["data-url"] })
      .use(store)
      .mount("#app-cart");
    }
  }, false)