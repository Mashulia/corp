<template>
  <div class="page-message page-message--submit">
    <div class="page-message__icon">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.9248 19L13.4953 16.008C13.8935 15.736 14.2398 15.413 14.4994 15.005C15.5382 13.373 16.6462 11.299 17.5811 8.8C18.2216 7.083 18.6545 5.468 18.9488 4.04C19.1911 2.85 20.2818 2 21.5283 2C24.8004 2 27.1895 5.009 26.3932 8.12L24.5061 15.6H32.5391C34.6859 15.6 36.3133 17.487 35.9497 19.561L33.6471 33.161C33.3701 34.793 31.9159 36 30.2365 36H17.4772C16.4038 36 15.3478 35.762 14.3783 35.286L8.9248 32.6V19Z"
          stroke="currentColor"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.19376 35.9994H3.73125C2.77906 35.9994 2 35.2344 2 34.2994V15.5994C2 14.6644 2.77906 13.8994 3.73125 13.8994H7.19376C8.14595 13.8994 8.92502 14.6644 8.92502 15.5994V34.2994C8.92502 35.2344 8.14595 35.9994 7.19376 35.9994Z"
          stroke="currentColor"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
    <div class="page-message__title">
      {{ this.cartTextData.CART_SUBMIT_TITLE }}
    </div>
    <div class="page-message__text" v-html="submitMessage"></div>

    <div class="page-message__action">
      <a class="button button-secondary" :href="linkIndexPage">
        <div class="button__body">
          {{ this.cartTextData.CART_SUBMIT_LINK_TEXT }}
        </div>
        <div class="button__icon">
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L5 5L1 1"
              stroke="currentColor"
              stroke-width="2"
            ></path>
          </svg></div
      ></a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "cart-submit",
  props: {
    linkIndexPage: {
      type: String,
      required: true
    },
    submitMessage: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["DEACTIVATE_CART_STATUS"])
  },
  created() {
    this.cartTextData = cartTextData;
  },
  mounted() {
    this.DEACTIVATE_CART_STATUS();
  }
};
</script>
