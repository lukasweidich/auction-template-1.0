window.onload = function() {
  let navbar = document.getElementById("navbar");
  window.onscroll = function() {
    if(window.scrollY == 0){
      navbar.classList.remove("add-navbar-background");
      navbar.classList.add("remove-navbar-background");
    } else {
      navbar.classList.remove("remove-navbar-background");
      navbar.classList.add("add-navbar-background");
    }
  }
}
