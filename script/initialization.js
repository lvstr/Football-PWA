//Sticky Navbar Init
const initNav = () => {
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $("nav").addClass("nav-clr");
      } else {
        $("nav").removeClass("nav-clr");
      }
    });
  });

  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $("nav li a, nav span").addClass("text-clr");
      } else {
        $("nav li a, nav span").removeClass("text-clr");
      }
    });
  });
};
//Sticky Navbar Init

//LibraryInit
const initLib = () => {
  M.AutoInit();
  AOS.init();
};
//LibraryInit

export default {
  initNav,
  initLib,
};
