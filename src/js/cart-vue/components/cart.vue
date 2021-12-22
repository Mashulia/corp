<template>
  <div class="cart-contents">
    <div class="cart-contents__header">
      <div class="cells fx-justify-between">
        <div class="cell cell-auto">
          <div class="cart-contents__header__title">
            {{ this.cartTextData.HEADER_TITLE }}
          </div>
        </div>
        <div class="cell cell-auto">
          <button
            class="cart-contents__header__erase js-cart-empty"
            @click="deleteAllProductsFromCart"
          >
            {{ this.cartTextData.HEADER_REMOVE }}
          </button>
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
        @decrementProduct="decrementProduct(index)"
      />
    </div>
    <div class="cart-contents__footer">
      <div class="cells fx-justify-between">
        <div class="cell cell-auto">
          <div class="cart-contents__footer__title">
            {{ this.cartTextData.FOOTER_TITLE }}
          </div>
        </div>
        <div class="cell cell-auto">
          <div class="cart-contents__footer__value" v-if="cartTotalCost > 0">
            <animated-total :value="cartTotalCost"></animated-total>
            {{ this.cartTextData.CURRENCY_UNIT }}
          </div>
          <div class="cart-contents__footer__value" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cartItem from "./cart-item.vue";
import animatedTotal from "./animated-total.vue";
import { mapActions, mapGetters } from "vuex";
import gsap from "gsap";
import axios from "axios";
export default {
  name: "cart",
  components: { cartItem, animatedTotal },
  data() {
    return {
      tweeningValue: this.cartTotalCost,
      sessid: document.querySelector("#app-cart").getAttribute("data-sessid"),
      params: document.querySelector("#app-cart").getAttribute("data-params"),
      URL: document.querySelector("#app-cart").getAttribute("data-url"),
      products: [],
      cartIdArray: []
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "ID_ARRAY"]),
    cartTotalCost() {
      let result = [];
      if (this.PRODUCTS.length) {
        for (let product of this.PRODUCTS) {
          result.push(product.price * product.qty);
        }
        result = result.reduce(function(sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    }
  },
  created() {
    this.cartTextData = cartTextData;
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
      this.DELETE_PRODUCT_FROM_CART(index);
      this.CHANGE_STATE_LOCALSTORAGE();
    },
    deleteAllProductsFromCart() {
      this.DELETE_ALL_PRODUCTS_FROM_CART(), localStorage.clear("cart");
      this.CHANGE_STATE_LOCALSTORAGE();
      this.DEACTIVATE_CART_STATUS();
    },
    incrementProduct(index) {
      this.INCREMENT_CART_PRODUCT(index);
      this.CHANGE_STATE_LOCALSTORAGE();
    },
    decrementProduct(index) {
      this.DECREMENT_CART_PRODUCT(index);
      this.CHANGE_STATE_LOCALSTORAGE();
      if (
        localStorage.getItem("cart") &&
        localStorage.getItem("cart") === "[]"
      ) {
        localStorage.clear("cart");
        this.CHANGE_STATE_LOCALSTORAGE();
        this.DEACTIVATE_CART_STATUS();
      }
    },
    loadData() {
      const axiosInstance = axios.create();
      const form_data = new FormData();

      this.ID_ARRAY.forEach(element => {
        form_data.append("id[]", element);
      });
      form_data.append("sessid", this.sessid);
      form_data.append("params", this.params);
      try {
        axios.post(this.URL, form_data).then(response => {
          const newCartData = response.data;
          for (let i = 0; i < newCartData.length; i++) {
            this.products.push(newCartData[i]);
          }
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    updateData() {
      for (let i = 0; i < this.products.length; i++) {
        for (let j = i; j < this.PRODUCTS.length; j++) {
          if (this.PRODUCTS[j].id != this.products[i].id) {
            if (this.PRODUCTS[j].link == this.products[i].link) {
              this.PRODUCTS[j].link = this.products[i].link;
            }
            if (this.PRODUCTS[j].name != this.products[i].name) {
              this.PRODUCTS[j].name = this.products[i].name;
            }
            if (this.PRODUCTS[j].price != this.products[i].price) {
              this.PRODUCTS[j].price = this.products[i].price;
            }
            if (this.PRODUCTS[j].pic != this.products[i].pic) {
              this.PRODUCTS[j].pic = this.products[i].pic;
            }
            if (this.PRODUCTS[j].currency != this.products[i].currency) {
              this.PRODUCTS[j].currency = this.products[i].currency;
            }
          } else {
            break;
          }
        }
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
    },
    data(newValue, oldValue) {
      this.updateData(newValue, oldValue);
    }
  },
  mounted() {
    this.tween(this.value, Number(this.cartTotalCost));
    if (this.URL) {
      this.loadData();
      setTimeout(() => {
        this.updateData(this.data, this.products);
      }, 300);
    }
    // let buttons = document.querySelectorAll(".button-remove");
    // buttons.forEach(element => {
    //   element.addEventListener("click", () => {
    //     let parent = element.closest(".cart-contents__item");
    //     parent.classList.add("slide-fade");
    //   });
    // });
  }
};
</script>
