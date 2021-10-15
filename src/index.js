import "./sass/utf.scss";
import "./sass/global.scss";

import Inputmask from "inputmask";
import "node-remove-polyfill";
import "./js/scripts.js";
import {
  createApp
} from 'vue';
import App from './cart-vue/App.vue';
import store from "./cart-vue/vuex/store.js";

createApp(App).use(store).mount('#app-cart');