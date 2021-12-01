<template>
  <div class="page-message">
    <div class="page-message__icon">
      <svg
        width="25"
        height="22"
        viewBox="0 0 25 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.83333 4.16683L8.16667 12.3335H21L23.3333 4.16683H5.83333ZM5.83333 4.16683L5.25 1.8335H0M9.33333 20.5002C8.04467 20.5002 7 19.4555 7 18.1668C7 16.8782 8.04467 15.8335 9.33333 15.8335C10.622 15.8335 11.6667 16.8782 11.6667 18.1668C11.6667 19.4555 10.622 20.5002 9.33333 20.5002ZM19.8333 20.5002C18.5447 20.5002 17.5 19.4555 17.5 18.1668C17.5 16.8782 18.5447 15.8335 19.8333 15.8335C21.122 15.8335 22.1667 16.8782 22.1667 18.1668C22.1667 19.4555 21.122 20.5002 19.8333 20.5002Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
    <div class="page-message__title">
      {{ this.cartTextData.EMPTY_CART_TITLE }}
    </div>
    <div class="page-message__text">
      {{ this.cartTextData.EMPTY_CART_TEXT }}
    </div>
    <div class="page-message__action">
      <a class="button button-secondary" :href="link">
        <div class="button__body">
          {{ this.cartTextData.EMPTY_CART_LINK_TEXT }}
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
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart-empty",
  data() {
    return {
      link: document.querySelector("#app-cart").getAttribute("data-link")
    };
  },
  created() {
    this.cartTextData = cartTextData;
  },
  methods: {
    removeForm() {
      let cartData =
          localStorage.getItem("cart") && localStorage.getItem("cart") !== "[]",
        form = document.querySelector(".cart__form"),
        cell = document.querySelector(".wrap .cell-xl-8");

      if (!cartData) {
        form.setAttribute("style", "display: none");
        cell.classList.add("max-width");
      }
    }
  },
  mounted() {
    this.removeForm();
  }
};
</script>

<style></style>
