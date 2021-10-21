import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store.js";

let cartApp = document.querySelector("#app-cart");


if (cartApp) {
  createApp(App, {props: ["data-url"]})
    .use(store)
    .mount("#app-cart");
}
