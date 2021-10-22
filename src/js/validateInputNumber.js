let inputQty = document.querySelector(".qty__input");

if (inputQty) {
  inputQty.oninput = function() {
    let minValue = this.getAttribute("data-min"),
      maxValue = this.getAttribute("data-max");
    this.value = this.value.replace(/[^0-9]/g, "");
    if (this.value < minValue && this.value === "") {
      this.value = minValue;
    } else if (this.value > maxValue && this.value !== "") {
      this.value = maxValue;
    } else {
      this.value = this.value;
    }
  }
}
