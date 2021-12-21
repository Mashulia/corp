<template>
  <cart v-if="PRODUCTS.length" />
  <cart-empty v-else />
  <cart-submit v-show="hidden" />
</template>
<script>
import cart from "./components/cart.vue";
import cartEmpty from "./components/cart-empty.vue";
import cartSubmit from "./components/cart-submit.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app-cart",
  components: { cart, cartEmpty, cartSubmit },
  data() {
    return {
      hidden: false
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "ID_ARRAY"])
  },
  methods: {
    ...mapActions([
      "SET_PRODUCTS_TO_STATE",
      "SHOW_CART_FORM",
      "GET_ID_ARRAY_OF_PRODUCTS"
    ])
  },
  mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    this.GET_ID_ARRAY_OF_PRODUCTS();
  }
};
</script>
