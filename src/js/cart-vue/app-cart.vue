<template>
  <cart v-if="PRODUCTS.length" />
  <cart-empty v-else />
</template>
<script>
import cart from "./components/cart.vue";
import cartEmpty from "./components/cart-empty.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app-cart",
  components: { cart, cartEmpty },
  computed: {
    ...mapGetters(["PRODUCTS", "ID_STRING"])
  },
  methods: {
    ...mapActions([
      "SET_PRODUCTS_TO_STATE",
      "DEACTIVATE_CART_STATUS",
      "DELETE_ALL_PRODUCTS_FROM_CART",
      "SHOW_CART_FORM",
      "GET_ID_STRING_OF_PRODUCTS"
    ])
  },
  mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    this.GET_ID_STRING_OF_PRODUCTS();
  }
};
</script>
