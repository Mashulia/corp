<template>
  <div class="cart-contents__item">
    <div class="cart-contents__row">
      <a
        v-if="product.pic"
        class="cart-contents__image"
        href="product-item.html"
      >
        <!-- Размер картинок 124х93-->
        <img :src="product.pic" />
      </a>
      <div v-else class="cart-contents__image no-image"></div>
      <div class="cart-contents__info">
        <a class="cart-contents__name" href="product-item-2.html">
          {{ product.name }}</a
        >
        <div class="cart-contents__price">
          <div v-if="product.price > 0" class="cart-contents__price__value">
            {{ product.price }} {{ product.currency }}
          </div>
          <div v-else class="cart-contents__price__value">
            {{ TEXT.ON_REQUEST_TEXT }}
          </div>
          <div class="cart-contents__price__label">{{ product.currency }}</div>
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
            {{ product.price * product.qty }} {{ product.currency }}
          </div>
          <div v-else class="cart-contents__price__value">
            {{ TEXT.ON_REQUEST_TEXT }}
          </div>
          <div class="cart-contents__price__label">
            x {{ product.qty }} {{ product.currency }}
          </div>
        </div>
      </div>
      <div class="cart-contents__remove">
        <button
          class="button-remove button button-icon"
          title="Удалить товар из корзины"
          @click="deleteFromCart"
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "cart-item",
  computed: {
    ...mapGetters(["CONSTANTS"])
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    TEXT: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(["CHANGE_STATE_LOCALSTORAGE"]),
    deleteFromCart() {
      this.$emit("deleteFromCart");
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
    }
  }
};
</script>
<style></style>
