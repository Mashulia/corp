import "./sass/utf.scss";
import "./sass/global.scss";

import Inputmask from "inputmask";
import "node-remove-polyfill";
import "./js/scripts.js";
import {
  createApp
} from 'vue';
import App from './App.vue';
import store from "./vuex/store.js";

createApp(App).use(store).mount('#app');