const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
function createPageOverlay() {
  let pageOverlay = document.createElement("div");
  pageOverlay.classList.add("page-overlay");
  document.getElementsByClassName("corp")[0].appendChild(pageOverlay);
  setTimeout(function() {
    document.body.classList.add("overlayed");
    document.body.style.paddingRight = scrollbarWidth;
  }, 100);
  return pageOverlay;
}
function removePageOverlay(pageOverlay) {
  document.body.classList.remove("overlayed");
  document.body.style.paddingRight = "";
  setTimeout(function() {
    if (pageOverlay) {
      pageOverlay.remove();
    }
  }, 300);
}
export { createPageOverlay, removePageOverlay };
