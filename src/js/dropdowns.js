import { revealer } from "./reveal";
class dropdown extends revealer {
  constructor(triggerEl, rootClass, winWidth) {
    super(triggerEl, rootClass);
    this.winWidth = winWidth;
  }
  toggle(e) {
    super.toggle(e);
    if (
      window.innerWidth > this.winWidth &&
      this.wrapper.classList.contains("opened")
    ) {
      this.fixDropdown();
      this.closeWhatever();
    }
  }
  fixDropdown() {
    let bounding = this.wrapper.getBoundingClientRect();
    if (
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth)
    ) {
      this.wrapper.classList.add("right");
    }
  }
  closeWhatever() {
    const closeExpanded = (event) => {
      if (!this.wrapper.contains(event.target)) {
        this.wrapper.classList.remove("opened");
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener("click", closeExpanded);
    };
    document.addEventListener("click", closeExpanded);
  }
}
class expand extends dropdown {}
export { dropdown, expand };
