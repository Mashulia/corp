<template>
  <cart v-if="PRODUCTS.length" :URL="URL" :TEXT="TEXT" />
  <cart-empty v-else :TEXT="TEXT" />
</template>
<script>
import cart from "./components/cart.vue";
import cartEmpty from "./components/cart-empty.vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
export default {
  name: "app-cart",
  components: { cart, cartEmpty },
  data() {
    return {
      URL: document.querySelector("#app-cart").getAttribute("data-url"),
      text: document.querySelector("#app-cart").getAttribute("data-text"),
      TEXT: []
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CONSTANTS"])
  },
  methods: {
    ...mapActions([
      "SET_PRODUCTS_TO_STATE",
      "DEACTIVATE_CART_STATUS",
      "DELETE_ALL_PRODUCTS_FROM_CART",
      "SHOW_CART_FORM"
    ])
  },
  mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    const axiosInstance = axios.create();
    try {
      axiosInstance.get(this.text).then(response => {
        this.TEXT = response.data;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
</script>
