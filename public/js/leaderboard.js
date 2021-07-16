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

const body = document.getElementsByTagName("body")[0];
body.onload = updateContent();

function updateContent(){
    easyUpdate();
    mediumUpdate();
    hardUpdate();
}

async function easyUpdate(){
    const response = await fetch('/easyapi');
    const data = await response.json();
    console.log(data);

    //update in the html page

    for(var i=0;i<5;i++){

        var elementId = "e";
        var j = i+1;
        elementId +=  j.toString();
        elementId += "username";

        var elementUserName = document.getElementById(elementId);
        elementUserName.innerHTML = data[i].userName;

        elementId = "e";
        elementId +=  j.toString();
        elementId += "time";

        var elementTime = document.getElementById(elementId);
        elementTime.innerHTML = data[i].time;

    }



}

async function mediumUpdate(){

    const response = await fetch('/mediumapi');
    const data = await response.json();
    console.log(data);

    //update in the html page

   
    for(var i=0;i<5;i++){

        var elementId = "m";
        var j = i+1;
        elementId +=  j.toString();
        elementId += "username";

        var elementUserName = document.getElementById(elementId);
        elementUserName.innerHTML = data[i].userName;

        elementId = "m";
        elementId +=  j.toString();
        elementId += "time";

        var elementTime = document.getElementById(elementId);
        elementTime.innerHTML = data[i].time;

    }

}

async function hardUpdate(){

    const response = await fetch('/hardapi');
    const data = await response.json();
    console.log(data);


    //update in the html page

    for(var i=0;i<5;i++){

        var elementId = "h";
        var j = i+1;
        elementId +=  j.toString();
        elementId += "username";

        var elementUserName = document.getElementById(elementId);
        elementUserName.innerHTML = data[i].userName;

        elementId = "h";
        elementId +=  j.toString();
        elementId += "time";

        var elementTime = document.getElementById(elementId);
        elementTime.innerHTML = data[i].time;

    }


}





