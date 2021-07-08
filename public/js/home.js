var myNav = document.getElementById('scroll');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200 ) {
        myNav.classList.add("colored");
        myNav.classList.add("navbar-dark");
        myNav.classList.add("navbar-light");
        myNav.classList.remove("opaque");
    } 
    else {
        myNav.classList.add("opaque");
        myNav.classList.add("navbar-light");
        myNav.classList.remove("navbar-dark");
        myNav.classList.remove("colored");
    }
};