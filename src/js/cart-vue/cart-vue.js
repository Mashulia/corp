import { createApp } from "vue";
import { defineCustomElement } from "vue";
import App from "./app-cart.vue";
import store from "./vuex/store.js";

let cartApp = document.querySelector("#app-cart");
const CurrentTimeComponent = defineCustomElement(CurrentTime);

if (cartApp) {
  createApp(App, {props: ["data-url"]})
    .use(store)
    .mount("#app-cart");
}
