class revealer {
  constructor(triggerEl, rootClass) {
    Object.assign(this, {
      trigger: triggerEl,
      root: rootClass
    });
    this.wrapper = this.trigger.closest(this.root);
    this.trigger.onclick = (e) => this.toggle(e);
    // this.sameNameInputs = Array.from(
    //   document.querySelectorAll(
    //     "[name='" + this.trigger.getAttribute("name") + "']"
    //   )
    // ).filter((item) => {
    //   return item != this.trigger;
    // });
  }

  toggle(e) {
    // if (this.trigger.checked) {
    //   this.wrapper.classList.add(`reveal--opened`);
    //   if (this.sameNameInputs.length) {
    //     const self = this;
    //     this.sameNameInputs.forEach((item) => {
    //       item.addEventListener("change", hideReveal);
    //     });

    //     function hideReveal() {
    //       self.wrapper.classList.remove(`reveal--opened`);
    //       self.sameNameInputs.forEach((item) => {
    //         item.removeEventListener("change", hideReveal);
    //       });
    //     }
    //   }
    // } else {
    //   this.wrapper.classList.remove(`reveal--opened`);
    // }
    e.preventDefault();
    this.wrapper.classList.toggle(`opened`);
  }
}
export { revealer };
