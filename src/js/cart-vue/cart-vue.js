import { createApp } from "vue";
import appCart from "./app-cart.vue";
import store from "./vuex/store.js";

document.addEventListener(
  "DOMContentLoaded",
  function() {
    let cartApp = document.querySelector("#app-cart");

    if (cartApp) {
      let urlCartData = cartApp.getAttribute("data-url");
      let catalogLink = cartApp.getAttribute("data-link");
      createApp(appCart)
        .use(store)
        .mount("#app-cart");

      if (!urlCartData && catalogLink) {
        console.log(
          '%cRequired parameter "data-url"(link for synchronization with the server) is empty',
          "color: red"
        );
      } else if (urlCartData && !catalogLink) {
        console.log(
          '%cRequired parameter "data-link"(link to catalog page) is empty',
          "color: red"
        );
      } else if (!urlCartData && !catalogLink) {
        console.log(
          '%cRequired parameter "data-link"(link to catalog page) and data-url(link for synchronization with the server) are empty',
          "color: red"
        );
      }
    }
  },
  false
);
