function toggleDropdown(e) {
  e.preventDefault();
  var dropdownRoot = e.target.closest(".dropdown");
  dropdownRoot.classList.toggle("dropdown--opened");
  if (
    window.innerWidth > 767 &&
    dropdownRoot.classList.contains("dropdown--opened")
  ) {
    fixDropdown(dropdownRoot.querySelector(".dropdown__body"));
    closeWhatever(dropdownRoot, "dropdown--opened");
  }
}
function fixDropdown(elem) {
  var bounding = elem.getBoundingClientRect();
  if (
    bounding.right > (window.innerWidth || document.documentElement.clientWidth)
  ) {
    elem.classList.add("dropdown__body--right");
  }
}
function closeWhatever(elem, className) {
  var closeExpanded = (event) => {
    if (!elem.contains(event.target)) {
      elem.classList.remove(className);
      removeClickListener();
    }
  };
  var removeClickListener = () => {
    document.removeEventListener("click", closeExpanded);
  };
  document.addEventListener("click", closeExpanded);
}
export { toggleDropdown, fixDropdown, closeWhatever };
