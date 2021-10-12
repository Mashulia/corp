<template>
<div>
  <div
    class="cells"
    v-if="PRODUCTS && PRODUCTS.length">
    <div class="cell cell-xl-8">
      <cart/>
    </div>
    <cart-form/>
  </div>
  <div class="page-message" v-else-if="PRODUCTS.length === 0">
    <div class="page-message__icon">
      <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83333 4.16683L8.16667 12.3335H21L23.3333 4.16683H5.83333ZM5.83333 4.16683L5.25 1.8335H0M9.33333 20.5002C8.04467 20.5002 7 19.4555 7 18.1668C7 16.8782 8.04467 15.8335 9.33333 15.8335C10.622 15.8335 11.6667 16.8782 11.6667 18.1668C11.6667 19.4555 10.622 20.5002 9.33333 20.5002ZM19.8333 20.5002C18.5447 20.5002 17.5 19.4555 17.5 18.1668C17.5 16.8782 18.5447 15.8335 19.8333 15.8335C21.122 15.8335 22.1667 16.8782 22.1667 18.1668C22.1667 19.4555 21.122 20.5002 19.8333 20.5002Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
      </svg>
    </div>
    <div class="page-message__title">Ваша корзина пуста</div>
    <div class="page-message__text">Выберите в каталоге интересующий товар и добавьте в корзину</div>
    <div class="page-message__action">
      <a class="button button-secondary" href="catalog.html">
        <div class="button__body">Перейти в каталог</div>
        <div class="button__icon">
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-width="2"></path>
          </svg>
        </div>
      </a>
    </div>
  </div>
  <!-- <div
    v-if="isSubmit">
    <div class="page-message">
      <div class="page-message__icon">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.9248 19L13.4953 16.008C13.8935 15.736 14.2398 15.413 14.4994 15.005C15.5382 13.373 16.6462 11.299 17.5811 8.8C18.2216 7.083 18.6545 5.468 18.9488 4.04C19.1911 2.85 20.2818 2 21.5283 2C24.8004 2 27.1895 5.009 26.3932 8.12L24.5061 15.6H32.5391C34.6859 15.6 36.3133 17.487 35.9497 19.561L33.6471 33.161C33.3701 34.793 31.9159 36 30.2365 36H17.4772C16.4038 36 15.3478 35.762 14.3783 35.286L8.9248 32.6V19Z" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19376 35.9994H3.73125C2.77906 35.9994 2 35.2344 2 34.2994V15.5994C2 14.6644 2.77906 13.8994 3.73125 13.8994H7.19376C8.14595 13.8994 8.92502 14.6644 8.92502 15.5994V34.2994C8.92502 35.2344 8.14595 35.9994 7.19376 35.9994Z" stroke="currentColor" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
      <div class="page-message__title">Ваш заказ успешно оформлен</div>
      <div class="page-message__text">Ваша заявка успешно отправлена!<br>
        В течение 5 минут мы Вам перезвоним
      </div>
      <div class="page-message__action">
        <a class="button button-secondary" href="index.html">
          <div class="button__body">Перейти на главную</div>
          <div class="button__icon">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-width="2"></path>
            </svg>
          </div>
        </a>
      </div>
    </div>-->
</div>
</template>
<script>
import cart from './components/cart.vue'
import cartForm from './components/cart-form.vue'
import {mapActions, mapGetters} from 'vuex'
// import axios from 'axios'
export default {
  components: { cartForm, cart },
  data() {
    return {
    }
  },
  name: "app",
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ])
  },
  methods: {
  ...mapActions([
    'SET_PRODUCTS_TO_STATE',
    'DEACTIVATE_CART_STATUS',
    'DELETE_ALL_PRODUCTS_FROM_CART'
  ]),
  showSuccessNotification() {
    this.DELETE_ALL_PRODUCTS_FROM_CART();
    this.DEACTIVATE_CART_STATUS();
    }
  },
  //   updateData() {
  //   axios.get('http://localhost:3000/products', {
  //       params: {
  //           id: this.product.id,
  //           name: this.product.name,
  //           price: this.product.id,
  //           url: this.product.pic,
  //           qty: ""
  //       }
  //   })
  //   .then(response => (
  //     this.id = response.data.id,
  //     this.name = response.data.name,
  //     this.price = response.data.price,
  //     this.url = response.data.pic,
  //     this.qty = response.data.qty
  //     ));
  //   }
  // }
   mounted() {
     this.SET_PRODUCTS_TO_STATE();
      //  setInterval(() =>this.updateData(), 10000);
  }
}
</script>
<style>

</style>