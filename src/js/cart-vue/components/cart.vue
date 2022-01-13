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
      <transition-group name="slide-fade" mode="out-in">
        <cart-item
          v-for="(product, index) in PRODUCTS"
          :key="product.id"
          :product="product"
          :qty="qty"
          @deleteFromCart="deleteFromCart(index)"
          @showRemoveNotification="showRemoveNotification(index)"
          @incrementProduct="incrementProduct(index)"
          @decrementProduct="decrementProduct(index)"
        />
      </transition-group>
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
      products: [],
      cartIdArray: [],
      qty: 0
    };
  },
  props: {
    sessid: {
      type: String,
      required: true
    },
    URL: {
      type: String,
      required: true
    },
    params: {
      type: String,
      required: true
    }
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
      this.PRODUCTS.splice(index, 1);
      this.DELETE_PRODUCT_FROM_CART(index);
      this.CHANGE_STATE_LOCALSTORAGE();
    },
    showRemoveNotification(index) {
      this.PRODUCTS[index].disabled = true;
      this.qty = this.PRODUCTS[index].qty;
      this.PRODUCTS[index].qty = 0;
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
      let _this = this;
      try {
        axios.post(_this.URL, form_data).then(response => {
          _this.products = response.data.products;
          this.removeElems(this.PRODUCTS, _this.products);
          this.CHANGE_STATE_LOCALSTORAGE();
          this.updateData();
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    updateData() {
      for (let j = 0; j < this.PRODUCTS.length; j++) {
        for (let i = 0; i < this.products.length; i++) {
          if (this.PRODUCTS[j].id === this.products[i].id) {
            if (this.PRODUCTS[j].name !== this.products[i].name) {
              this.PRODUCTS[j].name = this.products[i].name;
            }
            if (this.PRODUCTS[j].price !== this.products[i].price) {
              this.PRODUCTS[j].price = this.products[i].price;
            }
            if (this.PRODUCTS[j].pic !== this.products[i].pic) {
              this.PRODUCTS[j].pic = this.products[i].pic;
            }
            if (this.PRODUCTS[j].currency !== this.products[i].currency) {
              this.PRODUCTS[j].currency = this.products[i].currency;
            }
          }
        }
      }
    },
    removeElems(array1, array2) {
      let i = 0;
      let entry1;
      while (i < array1.length) {
        entry1 = array1[i];
        if (
          array2.some(function(entry2) {
            return entry1.id === entry2.id;
          })
        ) {
          // Found, progress to next
          ++i;
        } else {
          // Not found, remove
          array1.splice(i, 1);
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
    }
  },
  mounted() {
    this.tween(this.value, Number(this.cartTotalCost));
    if (this.URL) {
      this.loadData();
    }
  }
};
</script>
