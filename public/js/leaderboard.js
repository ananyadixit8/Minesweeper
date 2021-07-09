var myNav = document.getElementById('scroll');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ) {
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

async function easyUpdate(){

    const response = await fetch('/easyapi');
    const data = await response.json();
    console.log(data);
}

async function mediumUpdate(){

    const response = await fetch('/mediumapi');
    const data = await response.json();
    console.log(data);
}

async function hardUpdate(){

    const response = await fetch('/hardapi');
    const data = await response.json();
    console.log(data);
}





