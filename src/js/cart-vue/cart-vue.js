  import {createApp} from "vue";
  import appCart from "./app-cart.vue";
  import store from "./vuex/store.js";
  
  document.addEventListener('DOMContentLoaded', function() { 
    let cartApp = document.querySelector("#app-cart");

    if (cartApp) {
      createApp(appCart, { props: ["data-url"] })
        .use(store)
        .mount("#app-cart");
    }
  }, false);
