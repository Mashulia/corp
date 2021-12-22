<template>
  <span>{{ fullValue }}</span>
</template>
<script>
import gsap from "gsap";
export default {
  data() {
    return {
      tweeningValue: this.multiplication
    };
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullValue() {
      return Math.trunc(this.tweeningValue).toLocaleString();
    },
    multiplication() {
      return this.product.price * this.product.qty;
    }
  },
  methods: {
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        duration: 0.5,
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
