let cartForm = document.querySelector(".custom-form .collapsing-form");
let cartFormButton = document.querySelector(".collapsing-form .button-submit");

function addNotification(evt) {
  evt.preventDefault();
  cartFormButton.addEventListener(click => {
    cartForm.classList.add("collapsing-form--handled");
  })
};
