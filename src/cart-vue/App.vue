<template>
  <cart
  v-if="PRODUCTS.length"
  :URL="URL"
  :STRINGS="STRINGS"/>
  <cart-empty v-else/>
</template>
<script>
import cart from "./components/cart.vue"
import cartEmpty from "./components/cart-empty.vue"
import {mapActions, mapGetters} from "vuex"
export default {
  components: { cart, cartEmpty },
    data() {
      return {
        URL: document.getElementById("app-cart").dataset.url
      }
    },
  name: "app-cart",
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "STRINGS"
    ])
  },
  methods: {
  ...mapActions([
    "SET_PRODUCTS_TO_STATE",
    "DEACTIVATE_CART_STATUS",
    "DELETE_ALL_PRODUCTS_FROM_CART",
    "DEFINE_ENCODING",
    "SHOW_CART_FORM"
  ])
  },
   mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    this.DEFINE_ENCODING();
  }
}
</script>
<style>

</style>