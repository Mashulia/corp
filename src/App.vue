<template>
  <div>
    <div
      class="cells"
      v-if="!isSubmit && PRODUCTS.length">
      <div class="cell cell-xl-8">
        <cart/>
      </div>
      <cart-form
      @onSubmit="onSubmit()"/>
    </div>
    <cart-empty v-else-if="PRODUCTS.length === 0 && !isSubmit"/>
    <cart-submit v-if="isSubmit"/>
  </div>
</template>
<script>
import cart from "./components/cart.vue"
import cartForm from "./components/cart-form.vue"
import cartEmpty from "./components/cart-empty.vue"
import cartSubmit from "./components/cart-submit.vue"
import {mapActions, mapGetters} from "vuex"
import axios from "axios"
export default {
  components: { cartForm, cart, cartEmpty, cartSubmit },
  data() {
    return {
      isSubmit: false
    }
  },
  name: "app",
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
  onSubmit() {
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