import { createApp } from "vue";
import appCart from "./app-cart.vue";
import store from "./vuex/store.js";

document.addEventListener(
  "DOMContentLoaded",
  function() {
    let cartApp = document.querySelector("#app-cart");

    if (cartApp) {
      createApp(appCart)
        .use(store)
        .mount("#app-cart");

      let urlCartData = cartApp.getAttribute("data-url");
      let catalogLink = cartApp.getAttribute("data-link-catalog");
      let mainPageLink = cartApp.getAttribute("data-link-index-page");

      if (!urlCartData && catalogLink && mainPageLink) {
        console.log(
          '%cRequired parameter "data-url"(link for synchronization with the server) is empty',
          "color: red"
        );
      } else if (urlCartData && !catalogLink && mainPageLink) {
        console.log(
          '%cRequired parameter "data-link-catalog"(link to catalog page) is empty',
          "color: red"
        );
      } else if (urlCartData && catalogLink && !mainPageLink) {
        console.log(
          '%cRequired parameter "data-link-index-page"(link to index page) is empty',
          "color: red"
        );
      } else if (!urlCartData && !catalogLink && !mainPageLink) {
        console.log(
          '%cRequired parameter "data-link-catalog"(link to catalog page),"data-link-index-page"(link to index page) and data-url(link for synchronization with the server) are empty',
          "color: red"
        );
      }
    }
  },
  false
);
