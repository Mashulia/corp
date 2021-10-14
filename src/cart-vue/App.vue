<template>
  <div>
    <div
      class="cells"
      v-if="PRODUCTS.length">
      <div class="cell cell-xl-8">
        <cart/>
      </div>
    </div>
    <cart-empty v-else/>
    <cart-submit v-if="isSubmit"/>
  </div>
</template>
<script>
import cart from "./components/cart.vue"
import cartEmpty from "./components/cart-empty.vue"
import cartSubmit from "./components/cart-submit.vue"
import {mapActions, mapGetters} from "vuex"
export default {
  components: { cart, cartEmpty, cartSubmit },
  data() {
    return {
      isSubmit: false
    }
  },
  name: "app-cart",
  computed: {
    ...mapGetters([
      "PRODUCTS"
    ])
  },
  methods: {
  ...mapActions([
    "SET_PRODUCTS_TO_STATE",
    "DEACTIVATE_CART_STATUS",
    "DELETE_ALL_PRODUCTS_FROM_CART"
  ]),
  showSuccessNotification() {
    this.isSubmit = true;
    this.DELETE_ALL_PRODUCTS_FROM_CART();
    this.DEACTIVATE_CART_STATUS();
    }
  },
   mounted() {
     this.SET_PRODUCTS_TO_STATE();
  }
}
</script>
<style>

</style>