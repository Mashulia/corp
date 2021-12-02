import { createApp } from "vue";

import { createStore } from "vuex";

let store = createStore({
  state: {
    products: [],
    cartIdString: "?"
  },
  mutations: {
    SET_TO_STATE: state => {
      if (
        localStorage.getItem("cart") &&
        localStorage.getItem("cart") !== "[]"
      ) {
        state.products = JSON.parse(localStorage.getItem("cart"));
      }
    },
    GET_ID_STRING: state => {
      for (let i = 0; i < state.products.length; i++) {
        let productId = Number(state.products[i].id);
        state.cartIdString += "id[]=" + productId + "&";
      }
    },
    CHANGE_LOCALSTORAGE: state => {
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    ACTIVATE_CART: () => {
      let cartBtns = document.querySelectorAll(".bcart__button");
      if (
        localStorage.getItem("cart") &&
        localStorage.getItem("cart") !== "[]"
      ) {
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
      for (let i = 0; i < cartIdArray.length; i++) {
        if (state.products[i] == state.cartIdArray[i].id) {
          state.cartIdArray.splice(cartIdArray[i], 1);
        }
      }
      if (state.products.length === 0 && state.products === "[]") {
        localStorage.clear();
      }
    },
    REMOVE_ALL_PRODUCTS_FROM_CART: state => {
      state.products.length = 0;
      localStorage.clear();
      cartIdArray.splice(0);
    },
    INCREMENT: (state, index) => {
      state.products[index].qty = state.products[index].qty;
      if (state.products[index].qty >= 99) {
        state.products[index].qty = 99;
      } else {
        state.products[index].qty++;
      }
    },
    DECREMENT: (state, index) => {
      if (state.products[index].qty > 1) {
        state.products[index].qty--;
      }
    },
    SHOW_FORM: () => {
      let cartData =
          localStorage.getItem("cart") && localStorage.getItem("cart") !== "[]",
        form = document.querySelector(".cart__form"),
        cartApp = document.querySelector("#app-cart"),
        cell = document.querySelector(".cells .cell-xl-8");
      if (cartData && form) {
        form.setAttribute("style", "display: block");
      } else if (form) {
        form.setAttribute("style", "display: none");
      } else {
        cartApp.setAttribute("style", "width: 100%; margin: 0 auto");
        cell.setAttribute("style", "flex-basis: 100%; max-width: 100%");
      }
    }
  },
  actions: {
    SET_PRODUCTS_TO_STATE({ commit, products }) {
      commit("SET_TO_STATE", products);
      commit("ACTIVATE_CART");
    },
    DELETE_PRODUCT_FROM_CART({ commit, index }) {
      commit("REMOVE_ITEM_FROM_CART", index);
    },
    DELETE_ALL_PRODUCTS_FROM_CART({ commit }) {
      commit("REMOVE_ALL_PRODUCTS_FROM_CART");
    },
    INCREMENT_CART_PRODUCT({ commit }, index) {
      commit("INCREMENT", index);
    },
    DECREMENT_CART_PRODUCT({ commit }, index) {
      commit("DECREMENT", index);
    },
    ACTIVATE_CART_STATUS({ commit }) {
      commit("ACTIVATE_CART");
      commit;
    },
    DEACTIVATE_CART_STATUS({ commit }) {
      commit("DEACTIVATE_CART");
    },
    CHANGE_STATE_LOCALSTORAGE({ commit }) {
      commit("CHANGE_LOCALSTORAGE");
    },
    SHOW_CART_FORM({ commit }) {
      commit("SHOW_FORM");
    },
    GET_ID_STRING_OF_PRODUCTS({ commit }) {
      commit("GET_ID_STRING");
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    ID_STRING(state) {
      return state.cartIdString;
    }
  }
});

const app = createApp({});
app.use(store);

export default store;
