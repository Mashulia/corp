<template>
  <span>{{ fullValue }}</span>
</template>
<script>
import { mapGetters } from "vuex";
import gsap from "gsap";
export default {
  data() {
    return {
      tweeningValue: this.cartTotalCost
    };
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
    fullValue() {
      return Math.trunc(this.tweeningValue).toLocaleString();
    },
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
  methods: {
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
  }
};
</script>
<style></style>
