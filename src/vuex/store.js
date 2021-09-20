const URL = 'http://localhost:3000/products';

import {
  createApp
} from 'vue';
import createPersistedState from "vuex-persistedstate";

import {
  createStore
} from 'vuex';
import axios from 'axios';

let store = createStore({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    REMOVE_ITEM_FROM_CART: (state, index) => {
      state.products.splice(index, 1);
    },
    REMOVE_ALL_PRODUCTS_FROM_CART: (state, products) => {
      state.products.length = 0;
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
    GET_PRODUCTS_FROM_API({
      commit
    }) {
      return axios(URL, {
          method: "GET"
        })
        .then((products) => {
          commit('SET_PRODUCTS_TO_STATE', products.data);
          return products;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    DELETE_PRODUCT_FROM_CART({
      commit,
      index
    }) {
      commit('REMOVE_ITEM_FROM_CART', index);
    },
    DELETE_ALL_PRODUCTS_FROM_CART({
      commit
    }) {
      commit('REMOVE_ALL_PRODUCTS_FROM_CART');
    },
    INCREMENT_CART_PRODUCT({
      commit
    }, index) {
      commit('INCREMENT', index);
    },
    DECREMENT_CART_PRODUCT({
      commit
    }, index) {
      commit('DECREMENT', index);
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    }
  },
  plugins: [createPersistedState()]
});
const app = createApp({});
app.use(store);

export default store;