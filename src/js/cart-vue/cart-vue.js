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
      let sessidCartData = cartApp.getAttribute("data-sessid");
      let catalogLink = cartApp.getAttribute("data-link-catalog");
      let mainPageLink = cartApp.getAttribute("data-link-index-page");
      let paramsCartData = cartApp.getAttribute("data-params");

      if (!urlCartData) {
        console.log(
          '%cRequired parameter "data-url"(link for synchronization with the server) is empty',
          "color: red"
        );
      }
      if (!catalogLink) {
        console.log(
          '%cRequired parameter "data-link-catalog"(link to catalog page) is empty',
          "color: red"
        );
      }
      if (!mainPageLink) {
        console.log(
          '%cRequired parameter "data-link-index-page"(link to index page) is empty',
          "color: red"
        );
      }
      if (!sessidCartData) {
        console.log(
          '%cRequired parameter "data-sessid"(protection against method calls on third-party sites) is empty',
          "color: red"
        );
      if (!paramsCartData) {
        console.log(
          '%cRequired parameter "data-params" is empty',
          "color: red"
        );
      }
    }
  },
  false
);
