<template>
<div class="cells">
  <div class="cell cell-xl-8">
    <cart/>
  </div>
  <cart-form v-if="PRODUCTS.length"/>
</div>
</template>
<script>
import cart from './components/cart.vue'

import cartForm from './components/cart-form.vue'
import {mapGetters} from 'vuex'
export default {
  components: { cartForm, cart },
  name: "app",
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ])
  }
}
</script>
<style>

</style>