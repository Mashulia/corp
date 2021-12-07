<template>
  <cart v-if="PRODUCTS.length && !this.isSubmit" />
  <cart-empty v-else-if="!PRODUCTS.length && !this.isSubmit" />
  <cart-submit v-else />
</template>
<script>
import cart from "./components/cart.vue";
import cartEmpty from "./components/cart-empty.vue";
import cartSubmit from "./components/cart-submit.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app-cart",
  components: { cart, cartEmpty, cartSubmit },
  data() {
    return {
      isSubmit: false
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "ID_STRING", "ID_ARRAY"])
  },
  methods: {
    ...mapActions([
      "SET_PRODUCTS_TO_STATE",
      "DEACTIVATE_CART_STATUS",
      "DELETE_ALL_PRODUCTS_FROM_CART",
      "SHOW_CART_FORM",
      "GET_ID_STRING_OF_PRODUCTS",
      "GET_ID_ARRAY_OF_PRODUCTS"
    ]),
    changeSubmitStatus() {
      let cartApp = document.querySelector("#cart-app");
      let formSubmitStatus = cartApp.getAttribute("data-is-submit");
      console.log(formSubmitStatus);
      if (formSubmitStatus) {
        this.isSubmit = true;
      }
    }
  },
  // setSubmitButtonListener() {
  //   this.cartForm.addEventListener("submit", this.submitCartForm);
  // },
  // submitCartForm(event) {
  //   let cartApp = document.querySelector("#app-cart");

  //   this.cartForm.setAttribute("style", "display: none");
  //   this.isSubmit = true;
  //   document.querySelector(".wrap .cell-xl-8").classList.add("max-width");
  //   localStorage.removeItem("cart");
  //   event.preventDefault();
  // }
  // },
  mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    this.GET_ID_ARRAY_OF_PRODUCTS();
    this.GET_ID_STRING_OF_PRODUCTS();
    this.changeSubmitStatus();
  }
};
</script>
