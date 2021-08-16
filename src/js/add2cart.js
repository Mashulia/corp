export function handleAdd2Cart() {
  const addedNotification = document.getElementById("product-added");
  let notificationOpened = true;
  addedNotification.classList.add("notification--opened");
  addedNotification.addEventListener("click", closeAddedNotification);
  setTimeout(function () {
    if (notificationOpened) {
      closeAddedNotification();
    }
  }, 4000);

  function closeAddedNotification() {
    addedNotification.classList.remove("notification--opened");
    addedNotification.removeEventListener("click", closeAddedNotification);
  }
}
