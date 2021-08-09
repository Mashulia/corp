function handleNavOverflow(navigation, spacing) {
  let navList = navigation.querySelector("ul");
  let maxNavWidth = navigation ? navigation.offsetWidth : 600;
  // console.log("max width " + maxNavWidth);
  let navItems = navList ? navList.children : [];
  let factNavWidth = 0;
  var extraNav = navigation.querySelector(".nav--extra");
  var extraNavUl = extraNav ? extraNav.getElementsByTagName("ul")[0] : [];
  for (let i = 0; i < navItems.length; i++) {
    let el = navItems[i];
    factNavWidth += el.offsetWidth;
    // console.log("current width " + factNavWidth + " (" + (i + 1) + " elements)");
    // console.log("child " + i + " " + el.offsetWidth);
    if (
      extraNavUl &&
      (factNavWidth > maxNavWidth ||
        (el.nextElementSibling && factNavWidth > maxNavWidth - spacing))
    ) {
      extraNavUl.appendChild(el.cloneNode(true));
      el.style.display = "none";
    }
  }
  if (extraNavUl && extraNavUl.children.length) {
    navigation.classList.add("nav--overflown");
  }
  navigation.classList.add("nav--handled");
}
function resetNavOverflow(navigation) {
  let navList = navigation.querySelector("ul");
  let navItems = navList ? navList.children : [];
  var extraNav = navigation.querySelector(".nav--extra");
  var extraNavUl = extraNav ? extraNav.getElementsByTagName("ul")[0] : [];
  if (extraNavUl) {
    navigation.classList.remove("nav--overflown");
    extraNavUl.innerHTML = null;
  }
  navigation.classList.remove("nav--handled");
  for (let i = 0; i < navItems.length; i++) {
    let el = navItems[i];
    el.style.display = "";
  }
}
export { handleNavOverflow, resetNavOverflow };
