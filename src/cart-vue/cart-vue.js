import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store.js";

let cartData = localStorage.getItem("cart") && localStorage.getItem("cart") !== "[]",
    form = document.querySelector(".cart__form"),
    cartApp = document.querySelector("#app-cart");


if (cartApp) {
  createApp(App, { URL: "http://localhost:3000/products" })
    .use(store)
    .mount("#app-cart");
}

// if (cartData) {
//   form.setAttribute("style", "display: block");
//   // cartApp.setAttribute("style", "width: 100%; margin: 0 auto");
// } else if (!cartData) {
//   form.setAttribute("style", "display: none");
//   cartApp.setAttribute("style", "width: 100%; margin: 0 auto");
// }
