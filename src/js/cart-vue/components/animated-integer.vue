<template>
  <span>{{ fullValue }}</span>
</template>
<script>
import gsap from "gsap";
export default {
  data() {
    return {
      tweeningValue: this.product.qty
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
      return this.product.qty * this.price;
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
