import { createPageOverlay, removePageOverlay } from "./pageOverlay";
class revealer {
  constructor(triggerEl, rootClass) {
    Object.assign(this, {
      trigger: triggerEl,
      root: rootClass
    });
    this.wrapper = this.trigger.closest(this.root);
    this.trigger.onclick = (e) => this.toggle(e);
  }

  toggle(e) {
    e.preventDefault();
    this.wrapper.classList.toggle(`opened`);
  }
}
class inputRevealer extends revealer {
  constructor(triggerEl, rootClass) {
    super(triggerEl, rootClass);
    this.sameNameInputs = Array.from(
      document.querySelectorAll(
        "[name='" + this.trigger.getAttribute("name") + "']"
      )
    ).filter((item) => {
      return item != this.trigger;
    });
  }
  toggle(e) {
    if (this.trigger.checked) {
      this.wrapper.classList.add(`opened`);

      this.wrapper
        .querySelectorAll(".spectrum-picker")
        .forEach((item) => $(item).spectrum("reflow"));
      if (this.sameNameInputs.length) {
        const self = this;
        this.sameNameInputs.forEach((item) => {
          item.addEventListener("change", hideReveal);
        });

        function hideReveal() {
          self.wrapper.classList.remove(`opened`);
          self.sameNameInputs.forEach((item) => {
            item.removeEventListener("change", hideReveal);
          });
        }
      }
    } else {
      this.wrapper.classList.remove(`opened`);
    }
  }
}
class overlayedRevealer extends revealer {
  toggle(e) {
    super.toggle(e);
    let self = this;
    if (this.wrapper.classList.contains(`opened`)) {
      let pageOverlay = createPageOverlay();
      pageOverlay.addEventListener("click", closeWhatsOpened);
    } else {
      let pageOverlay = document.getElementsByClassName("page-overlay")[0];
      removePageOverlay(pageOverlay);
    }
    function closeWhatsOpened(e) {
      e.target.removeEventListener("click", closeWhatsOpened);
      removePageOverlay(e.target);
      self.wrapper.classList.remove(`opened`);
    }
  }
}
export { revealer, inputRevealer, overlayedRevealer };
