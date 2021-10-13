const URL = "http://localhost:3000/products";

import {
  createApp
} from "vue";

import {
  createStore
} from "vuex";

let store = createStore({
  state: {
    products: []
  },
  mutations: {
    SET_TO_STATE: (state) => {
      if (localStorage.getItem("cart") && localStorage.getItem("cart") !== "[]") {
        state.products = JSON.parse(localStorage.getItem("cart"));
      }
    },
    CHANGE_LOCALSTORAGE: (state) => {
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    ACTIVATE_CART: () => {
      let cartBtns = document.querySelectorAll(".bcart__button");
      if (localStorage.getItem("cart") && localStorage.getItem("cart") !== "[]") {
        for (let i = 0; i < cartBtns.length; i++) {
          cartBtns[i].classList.add("bcart__button--active");
        }
      }
    },
    DEACTIVATE_CART: () => {
      let cartBtns = document.querySelectorAll(".bcart__button");
      for (let i = 0; i < cartBtns.length; i++) {
        cartBtns[i].classList.remove("bcart__button--active");
      }
    },
    REMOVE_ITEM_FROM_CART: (state, index) => {
      state.products.splice(index, 1);
      if (state.products.length === 0) {
        localStorage.clear();
      }
    },
    REMOVE_ALL_PRODUCTS_FROM_CART: (state) => {
      state.products.length = 0;
      localStorage.clear();
    },
    INCREMENT: (state, index) => {
      state.products[index].qty++;
    },
    DECREMENT: (state, index) => {
      if (state.products[index].qty > 1) {
        state.products[index].qty--;
      }
    }
  },
  actions: {
    SET_PRODUCTS_TO_STATE({
      commit,
      products
    }) {
      commit("SET_TO_STATE", products);
      commit("ACTIVATE_CART");
      return products;
    },
    DELETE_PRODUCT_FROM_CART({
      commit,
      index
    }) {
      commit("REMOVE_ITEM_FROM_CART", index);
    },
    DELETE_ALL_PRODUCTS_FROM_CART({
      commit
    }) {
      commit("REMOVE_ALL_PRODUCTS_FROM_CART");
    },
    INCREMENT_CART_PRODUCT({
      commit
    }, index) {
      commit("INCREMENT", index);
    },
    DECREMENT_CART_PRODUCT({
      commit
    }, index) {
      commit("DECREMENT", index);
    },
    ACTIVATE_CART_STATUS({
      commit
    }) {
      commit("ACTIVATE_CART");
      commit;
    },
    DEACTIVATE_CART_STATUS({
      commit
    }) {
      commit("DEACTIVATE_CART");
    },
    CHANGE_STATE_LOCALSTORAGE({
      commit
    }) {
      commit("CHANGE_LOCALSTORAGE");
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    }
  }
})

const app = createApp({});
app.use(store);

export default store;