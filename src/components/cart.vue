<template>
  <div
    class="cart-contents">
    <div class="cart-contents__header">
      <div class="cells fx-justify-between">
        <div class="cell cell-auto">
          <div class="cart-contents__header__title">Список заказа</div>
        </div>
        <div class="cell cell-auto">
          <button
            class="cart-contents__header__erase js-cart-empty"
            @click="deleteAllProductsFromCart">Очистить все</button>
        </div>
      </div>
    </div>
    <div class="cart-contents__body">
      <cart-item
      v-for="(product, index) in PRODUCTS"
      :key="product.id"
      :product="product"
      @deleteFromCart="deleteFromCart(index)"
      @incrementProduct="incrementProduct(index)"
      @decrementProduct="decrementProduct(index)">
      </cart-item>
    </div>
    <div class="cart-contents__footer">
      <div class="cells fx-justify-between">
        <div class="cell cell-auto">
          <div class="cart-contents__footer__title">Итого:</div>
        </div>
        <div class="cell cell-auto">
          <div class="cart-contents__footer__value">{{cartTotalCost}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cartItem from "./cart-item.vue"
import {mapActions, mapGetters} from "vuex"
export default {
  name: "cart",
  components: { cartItem },
  data() {
    return {

    }
  },
  computed: {
  ...mapGetters([
    "PRODUCTS"
    ]),
    cartTotalCost() {
      let result = [];
      if(this.PRODUCTS.length) {
          for(let product of this.PRODUCTS) {
          result.push(product.price * product.qty);
        }
        result = result.reduce(function(sum, el){
          return sum + el;
        })
        return result;
      }
      else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions([
      "DELETE_PRODUCT_FROM_CART",
      "DELETE_ALL_PRODUCTS_FROM_CART",
      "INCREMENT_CART_PRODUCT",
      "DECREMENT_CART_PRODUCT",
      "DEACTIVATE_CART_STATUS",
      "CHANGE_STATE_LOCALSTORAGE"
    ]),
    deleteFromCart(index) {
      this.DELETE_PRODUCT_FROM_CART(index)
      this.CHANGE_STATE_LOCALSTORAGE()
    },
    deleteAllProductsFromCart() {
      this.DELETE_ALL_PRODUCTS_FROM_CART(),
      localStorage.clear()
      this.CHANGE_STATE_LOCALSTORAGE()
      this.DEACTIVATE_CART_STATUS()
    },
    incrementProduct(index) {
      this.INCREMENT_CART_PRODUCT(index)
      this.CHANGE_STATE_LOCALSTORAGE()
    },
    decrementProduct(index) {
      this.DECREMENT_CART_PRODUCT(index)
      this.CHANGE_STATE_LOCALSTORAGE()
      if(localStorage.getItem("cart") && localStorage.getItem("cart") === "[]") {
        localStorage.clear()
        this.CHANGE_STATE_LOCALSTORAGE()
        this.DEACTIVATE_CART_STATUS()
      }
    }
  }
}
</script>
<style>

</style>