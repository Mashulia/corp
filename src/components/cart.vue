<template>
  <div class="cart-contents">
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
      <div
        class="cart-contents__body"
        v-if="PRODUCTS.length">
        <cart-item
        v-for="(product, index) in PRODUCTS"
        :key="product.id"
        :product_data="product"
        @deleteFromCart="deleteFromCart(index)"
        @incrementProduct="incrementProduct(index)"
        @decrementProduct="decrementProduct(index)">
        </cart-item>
      </div>
      <div
      class="cart-contents__body-title"
      v-else>
      Ваша корзина пуста
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
import cartItem from './cart-item.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'cart',
  components: { cartItem },
      computed: {
    ...mapGetters([
      'PRODUCTS'
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
      'GET_PRODUCTS_FROM_API',
      'DELETE_PRODUCT_FROM_CART',
      'DELETE_ALL_PRODUCTS_FROM_CART',
      'INCREMENT_CART_PRODUCT',
      'DECREMENT_CART_PRODUCT'
    ]),
    deleteFromCart(index) {
      this.DELETE_PRODUCT_FROM_CART(index)
    },
    deleteAllProductsFromCart() {
      this.DELETE_ALL_PRODUCTS_FROM_CART()
    },
    incrementProduct(index) {
      this.INCREMENT_CART_PRODUCT(index)
    },
    decrementProduct(index) {
      this.DECREMENT_CART_PRODUCT(index)
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if (response.data) {
        console.log("Data arrived!")
      }
    })
    if (localStorage.CART) {
      this.CART = JSON.parse(localStorage.CART)
    }
  },
  watch: {
   PRODUCTS: {
     handler(newCart) {
     localStorage.CART = JSON.stringify(newCart);
   },
    deep: true
    }
  }
}
</script>
<style>
  
</style>