<template>
  <cart v-if="PRODUCTS.length" :sessid="sessid" :params="params" :URL="URL" />
  <cart-empty v-else :linkCatalog="linkCatalog" />
  <cart-submit
    v-show="hidden"
    :linkIndexPage="linkIndexPage"
    :submitMessage="submitMessage"
  />
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
      hidden: false,
      sessid: "",
      params: "",
      URL: "",
      linkCatalog: "",
      linkIndexPage: "",
      submitMessage: ""
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "ID_ARRAY"])
  },
  methods: {
    ...mapActions([
      "SET_PRODUCTS_TO_STATE",
      "SHOW_CART_FORM",
      "GET_ID_ARRAY_OF_PRODUCTS",
      "DELETE_PRODUCT_FROM_CART",
      "CHANGE_STATE_LOCALSTORAGE"
    ])
  },
  mounted() {
    this.SHOW_CART_FORM();
    this.SET_PRODUCTS_TO_STATE();
    this.GET_ID_ARRAY_OF_PRODUCTS();

    this.sessid = this.$el.parentElement.getAttribute("data-sessid");
    this.URL = this.$el.parentElement.getAttribute("data-url");
    this.params = this.$el.parentElement.getAttribute("data-params");
    this.sessid = this.$el.parentElement.getAttribute("data-sessid");
    this.linkCatalog = this.$el.parentElement.getAttribute("data-link-catalog");
    this.linkIndexPage = this.$el.parentElement.getAttribute(
      "data-link-index-page"
    );
    this.submitMessage = this.$el.parentElement.getAttribute(
      "data-submit-message"
    );
  }
};
</script>
