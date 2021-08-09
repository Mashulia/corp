class qtyChanger {
  constructor(el) {
    Object.assign(this, {
      $wrapper: el
    });
    this.$input = this.$wrapper.querySelector(".qty__input");
    this.min = this.$input.dataset.min || 1;
    this.max = this.$input.dataset.max || 99;
    this.$up = this.$wrapper.querySelector(".qty__change--plus");
    this.$down = this.$wrapper.querySelector(".qty__change--minus");
    this.$up.onclick = () => this.changeUp();
    this.$down.onclick = () => this.changeDown();
    this.$input.onchange = () => this.checkRange();
  }
  changeUp() {
    this.enableButton(this.$down);
    let currentValue = parseInt(this.$input.value);
    if (currentValue < this.max) {
      this.$input.value = currentValue + 1;
    }
    if (this.$input.value < this.max - 1) {
      this.enableButton(this.$up);
    } else {
      this.disableButton(this.$up);
    }
  }
  changeDown() {
    this.enableButton(this.$up);
    let currentValue = parseInt(this.$input.value);
    if (currentValue > this.min) {
      this.$input.value = currentValue - 1;
    }
    if (this.$input.value > this.min + 1) {
      this.enableButton(this.$down);
    } else {
      this.disableButton(this.$down);
    }
  }
  disableButton(el) {
    el.setAttribute("disabled", "disabled");
  }
  enableButton(el) {
    el.removeAttribute("disabled");
  }
  checkRange() {
    let currentValue = parseInt(this.$input.value);
    this.$input.value = currentValue;
    if (currentValue < this.min) {
      this.$input.value = this.min;
    } else if (currentValue > this.min) {
      this.enableButton(this.$down);
    } else {
      this.disableButton(this.$down);
    }
    if (currentValue > this.max) {
      this.$input.value = this.max;
    } else if (currentValue < this.max) {
      this.enableButton(this.$up);
    } else {
      this.disableButton(this.$up);
    }
  }
}
export { qtyChanger };
