class splitter {
  constructor(el) {
    Object.assign(this, {
      $wrapper: el
    });
    this.$trigger = this.$wrapper.children[0].querySelector(".split__toggle");
    this.$trigger.onclick = () => this.toggle();
  }

  toggle() {
    this.$wrapper.classList.toggle(`split--opened`);
  }
}
export { splitter };
