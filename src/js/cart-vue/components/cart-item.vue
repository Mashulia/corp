<template>
  <transition name="fade" mode="out-in">
    <div
      class="cart-contents__item cart-contents__item--notification"
      v-if="buttonClicked"
    >
      <div class="cart-contents__row">
        <div class="cart-contents__info">
          <span class="cart-contents__info-word">{{
            this.cartTextData.REMOVE_NOTIFICATION_PRODUCT_WORD
          }}</span>
          <div class="cart-contents__name">{{ product.name }}</div>
          <span>{{ this.cartTextData.REMOVE_NOTIFICATION_TEXT }}</span>
        </div>
        <div class="cart-contents__restore">
          <a
            class="cart-contents__restore-link"
            href="javascript:void(0)"
            @click="returnItemToCart"
            >{{ this.cartTextData.REMOVE_NOTIFICATION_RESTORE }}</a
          >
        </div>
      </div>
    </div>
    <div class="cart-contents__item" v-else>
      <div class="cart-contents__row">
        <a
          v-if="product.pic"
          class="cart-contents__image"
          v-bind:href="product.link"
        >
          <!-- Размер картинок 124х93-->
          <img :src="product.pic" />
        </a>
        <div v-else class="cart-contents__image no-image"></div>
        <div class="cart-contents__info">
          <a class="cart-contents__name" v-bind:href="product.link">
            {{ product.name }}</a
          >
          <div class="cart-contents__price">
            <div v-if="product.price > 0" class="cart-contents__price__value">
              {{ (product.price * 1).toLocaleString() }} {{ product.currency }}
            </div>
            <div v-else class="cart-contents__price__value">
              {{ this.cartTextData.ON_REQUEST_TEXT }}
            </div>
            <div class="cart-contents__price__label">
              {{ this.cartTextData.PRISE_FOR_UNIT }}
            </div>
          </div>
        </div>
        <div class="cart-contents__pricing">
          <div class="cart-contents__qty">
            <div class="qty">
              <button
                class="qty__change qty__change--minus"
                @click="decrementProduct"
              >
                -
              </button>
              <input
                class="qty__input form__input"
                type="number"
                v-model="product.qty"
                min="1"
                max="99"
                @blur="validateInputData($event)"
              />
              <button
                class="qty__change qty__change--plus"
                @click="incrementProduct"
              >
                +
              </button>
            </div>
          </div>
          <div class="cart-contents__price">
            <div v-if="product.price > 0" class="cart-contents__price__value">
              <animated-integer
                :value="multiplication"
                :product="product"
              ></animated-integer>
              {{ product.currency }}
            </div>
            <div v-else class="cart-contents__price__value">
              {{ this.cartTextData.ON_REQUEST_TEXT }}
            </div>
            <div class="cart-contents__price__label">
              x {{ product.qty }} {{ this.cartTextData.UNIT }}
            </div>
          </div>
        </div>
        <div class="cart-contents__remove">
          <button
            class="button-remove button button-icon"
            title="Удалить товар из корзины"
            @click="showItemRemoveNotification"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon/Outline/trash-2" opacity="0.6">
                <path
                  id="Mask"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 16C10 16.55 9.55 17 9 17C8.45 17 8 16.55 8 16V12C8 11.45 8.45 11 9 11C9.55 11 10 11.45 10 12V16ZM16 16C16 16.55 15.55 17 15 17C14.45 17 14 16.55 14 16V12C14 11.45 14.45 11 15 11C15.55 11 16 11.45 16 12V16ZM18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
                  fill="currentColor"
                ></path>
                <mask
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                >
                  <path
                    id="Mask_2"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 16C10 16.55 9.55 17 9 17C8.45 17 8 16.55 8 16V12C8 11.45 8.45 11 9 11C9.55 11 10 11.45 10 12V16ZM16 16C16 16.55 15.55 17 15 17C14.45 17 14 16.55 14 16V12C14 11.45 14.45 11 15 11C15.55 11 16 11.45 16 12V16ZM18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
                    fill="white"
                  ></path>
                </mask>
                <g mask="url(#mask0)"></g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import gsap from "gsap";
import animatedInteger from "./animated-integer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "cart-item",
  components: { animatedInteger },
  data() {
    return {
      tweeningValue: this.multiplication,
      cartItem: null,
      buttonClicked: false
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    arrayDisabledItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    multiplication() {
      return this.product.qty * this.product.price;
    }
  },
  created() {
    this.cartTextData = cartTextData;
  },
  methods: {
    ...mapActions([
      "CHANGE_STATE_LOCALSTORAGE",
      "DELETE_PRODUCT_FROM_CART",
      "ACTIVATE_CART_STATUS"
    ]),
    showItemRemoveNotification() {
      this.buttonClicked = true;
      this.$emit("showItemRemoveNotification");
    },
    returnItemToCart() {
      this.buttonClicked = false;
      this.product.disabled = false;
      this.product.qty = this.product.savedQty;
      this.CHANGE_STATE_LOCALSTORAGE();
      for (let i = 0; i < this.arrayDisabledItems.length; i++) {
        if (this.arrayDisabledItems[i].id == this.product.id) {
          this.arrayDisabledItems.splice(i, 1);
          this.ACTIVATE_CART_STATUS();
          let form = document.querySelector(".cart__form");
          form.setAttribute("style", "display: block");
        }
      }
    },
    incrementProduct() {
      this.$emit("incrementProduct");
    },
    decrementProduct() {
      this.$emit("decrementProduct");
    },
    validateInputData(event) {
      if (event.target.value < event.target.min || event.target.value === "") {
        this.product.qty = event.target.min;
        this.CHANGE_STATE_LOCALSTORAGE();
      } else if (
        event.target.value >= event.target.max ||
        event.target.value.length > 2
      ) {
        this.product.qty = event.target.max;
        this.CHANGE_STATE_LOCALSTORAGE();
      } else {
        this.product.qty = event.target.value;
        this.CHANGE_STATE_LOCALSTORAGE();
      }
    },
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        duration: 0.3,
        tweeningValue: newValue,
        ease: "power2"
      });
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue);
    }
  },
  mounted() {
    this.tween(this.value, Number(this.multiplication));
  }
};
</script>
<style></style>
