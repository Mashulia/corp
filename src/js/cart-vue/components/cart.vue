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
            @click="showAllRemoveNotification"
          >
            {{ this.cartTextData.HEADER_REMOVE }}
          </button>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div
        class="cart-contents__item cart-contents__item--notification"
        v-if="show"
      >
        <div class="cart-contents__row">
          <div class="cart-contents__info">
            {{ this.cartTextData.REMOVE_NOTIFICATION_PRODUCT_ALL }}
          </div>
          <div class="cart-contents__restore">
            <a
              class="cart-contents__restore-link"
              href="javascript:void(0)"
              @click="returnAllToCart"
              >{{ this.cartTextData.REMOVE_NOTIFICATION_RESTORE }}</a
            >
          </div>
        </div>
      </div>
      <div class="cart-contents__body" v-else>
        <cart-item
          v-for="(product, index) in PRODUCTS"
          :key="product.id"
          :product="product"
          :arrayDisabledItems="arrayDisabledItems"
          @showItemRemoveNotification="showItemRemoveNotification(index)"
          @incrementProduct="incrementProduct(index)"
          @decrementProduct="decrementProduct(index)"
        />
      </div>
    </transition>
    <div class="cart-contents__footer">
      <div class="cells fx-justify-between">
        <div class="cell cell-auto">
          <div class="cart-contents__footer__title">
            {{ this.cartTextData.FOOTER_TITLE }}
          </div>
        </div>
        <div class="cell cell-auto">
          <div
            class="cart-contents__footer__value"
            v-if="cartTotalCost > 0 && show !== true"
          >
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
      arrayDisabledItems: [],
      show: false
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
      "ACTIVATE_CART_STATUS",
      "CHANGE_STATE_LOCALSTORAGE"
    ]),
    showItemRemoveNotification(index) {
      this.PRODUCTS[index].disabled = true;
      this.arrayDisabledItems.push(this.PRODUCTS[index]);
      this.PRODUCTS[index].savedQty = this.PRODUCTS[index].qty;
      this.PRODUCTS[index].qty = 0;
      this.CHANGE_STATE_LOCALSTORAGE();
      if (this.arrayDisabledItems.length === this.PRODUCTS.length) {
        this.DEACTIVATE_CART_STATUS();
        let form = document.querySelector(".cart__form");
        form.setAttribute("style", "display: none");
      }
    },
    showAllRemoveNotification() {
      if (this.arrayDisabledItems.length === this.PRODUCTS.length) {
        this.DELETE_ALL_PRODUCTS_FROM_CART();
        this.CHANGE_STATE_LOCALSTORAGE();
        this.DEACTIVATE_CART_STATUS();
      }
      for (let i = 0; i < this.PRODUCTS.length; i++) {
        this.PRODUCTS[i].disabled = true;
        this.PRODUCTS[i].savedQty = this.PRODUCTS[i].qty;
        let form = document.querySelector(".cart__form");
        form.setAttribute("style", "display: none");
      }
      this.show = !this.show;
      this.CHANGE_STATE_LOCALSTORAGE();
      this.DEACTIVATE_CART_STATUS();
    },
    returnAllToCart() {
      for (let i = 0; i < this.PRODUCTS.length; i++) {
        this.PRODUCTS[i].disabled = false;
        this.PRODUCTS[i].qty = this.PRODUCTS[i].savedQty;
      }
      let form = document.querySelector(".cart__form");
      form.setAttribute("style", "display: block");
      this.show = !this.show;
      this.CHANGE_STATE_LOCALSTORAGE();
      this.ACTIVATE_CART_STATUS();
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
    checkDisabledItems() {
      for (let i = 0; i < this.PRODUCTS.length; i++) {
        if (this.PRODUCTS[i].disabled === true) {
          this.arrayDisabledItems.push(this.PRODUCTS[i]);
        }
      }
      if (this.arrayDisabledItems.length === this.PRODUCTS.length) {
        this.DELETE_ALL_PRODUCTS_FROM_CART();
        this.CHANGE_STATE_LOCALSTORAGE();
        this.DEACTIVATE_CART_STATUS();
      } else {
        for (let i = 0; i < this.PRODUCTS.length; i++) {
          for (let j = 0; j < this.arrayDisabledItems.length; j++) {
            if (this.PRODUCTS[i].id === this.arrayDisabledItems[j].id)
              this.PRODUCTS.splice(i, 1);
            this.CHANGE_STATE_LOCALSTORAGE();
          }
        }
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
    if (this.PRODUCTS.length) {
      this.checkDisabledItems();
    }
    this.tween(this.value, Number(this.cartTotalCost));
    if (this.URL) {
      this.loadData();
    }
    this.arrayDisabledItems = [];
  }
};
</script>
