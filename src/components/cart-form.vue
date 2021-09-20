<template>
  <div class="cell cell-md-8 cell-lg-6 mx-auto cart__form cell-xl-4">
    <form class="custom-form collapsing-form" action="">
      <div class="form__header">
        <div class="form__title">Оформить заказ</div>
        <div class="form__description">Заполните форму, и наш менеджер<br>свяжется с Вами в ближайшее время</div>
        <div class="form__message">
          <div class="form__success">
            <div class="form__message__text">Ваша заявка успешно отправлена!</div>
          </div>
        </div>
      </div>
      <div class="form__bg">
        <div class="form__body">
          <label class="form__field form__field--required"><span class="form__label">Телефон</span>
            <input class="form__input" type="tel" required="" inputmode="text">
          </label>
          <label class="form__field form__field--required"><span class="form__label">Email</span>
            <input class="form__input" type="email" required="">
          </label>
          <label class="form__field"><span class="form__label">Текст сообщения</span>
            <textarea class="form__input" rows="3"></textarea>
          </label>
          <div class="form__submit">
            <button 
              class="button button-submit" 
              type="submit"
              @click="onSubmit">Отправить</button>
          </div>
          <div class="form__note">Нажимая на кнопку «Отправить», подтверждаю свое согласие с&nbsp;<a href="policy.html">условиями обработки персональных данных</a></div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'cart-form',
  initForm: {
    tel: '',
    email: '',
    text: ''
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    let storedForm = this.getStorage()
    this.form = {...this.$options.initForm, ...storedForm}
  },
  watch: {
    form: {
      handler() {
        this.updateStorage()
      },
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.form = {...this.$options.initForm}
    },
    getStorage() {
      return JSON.parse(localStorage.getItem('custom-form'))
    },
    setStorage(value) {
      localStorage.setItem('custom-form', JSON.stringify(value))
    },
    updateStorage() {
      let storedForm = this.getStorage()
      if(!storedForm) storedForm = {}

      storedForm = JSON.parse(JSON.stringify(this.form))
      this.setStorage(storedForm)
    }
  }
}
</script>
<style>
  
</style>