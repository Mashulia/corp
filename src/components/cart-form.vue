<template>
  <div class="cell cell-md-8 cell-lg-6 mx-auto cart__form cell-xl-4">
    <form
      class="custom-form collapsing-form"
      action="#"
      method="post">
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
            <input
              class="form__input"
              type="tel"
              required=""
              inputmode="text"
              v-model="tel">
          </label>
          <label class="form__field form__field--required"><span class="form__label">Email</span>
            <input
              class="form__input"
              type="email"
              required=""
              v-model="email">
          </label>
          <label class="form__field"><span class="form__label">Текст сообщения</span>
            <textarea
              class="form__input"
              rows="3"
              v-model="text">
            </textarea>
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
  data() {
    return {
     tel: '',
     email: '',
     text: ''
    }
  },
  methods: {
    showSuccessNotification() {
      this.$emit('showSuccessNotification');
    }
  },
  mounted() {
    if (localStorage.tel) {
      this.tel = localStorage.tel;
    }
    if (localStorage.email) {
      this.email = localStorage.email;
    }
    if (localStorage.text) {
      this.text = localStorage.text;
    }
  },
   watch: {
    tel(newTel) {
      localStorage.tel = newTel;
    },
    email(newEmail) {
      localStorage.email = newEmail;
    },
    text(newText) {
      localStorage.text = newText;
    }
  }
}
</script>
<style>

</style>