var myNav = document.getElementById("scroll");
window.onscroll = function () {
  "use strict";
  if (
    document.body.scrollTop >= 200 ||
    document.documentElement.scrollTop >= 200
  ) {
    myNav.classList.add("colored");
    myNav.classList.add("navbar-dark");
    myNav.classList.add("navbar-light");
    myNav.classList.remove("opaque");
  } else {
    myNav.classList.add("opaque");
    myNav.classList.add("navbar-light");
    myNav.classList.remove("navbar-dark");
    myNav.classList.remove("colored");
  }
};

// update leaderboard on loading the page
const body = document.getElementsByTagName("body")[0];
body.onload = updateContent();

async function updateContent() {
  // easy leader
  const easyResponse = await fetch("/easyapi");
  const easyData = await easyResponse.json();
  console.log(easyData);

  if (easyData.length >= 1) {
    var elementId = "firstname";
    var elementUserName = document.getElementById(elementId);
    console.log(elementUserName.innerText);
    elementUserName.innerText = easyData[0].userName;
  }

  // medium leader
  const medResponse = await fetch("/mediumapi");
  const medData = await medResponse.json();
  console.log(medData);

  if (medData.length >= 1) {
    var elementId = "secondname";
    var elementUserName = document.getElementById(elementId);
    elementUserName.innerHTML = medData[0].userName;
  }

  // hard leader
  const hardResponse = await fetch("/hardapi");
  const hardData = await hardResponse.json();
  console.log(hardData);

  if (hardData.length >= 1) {
    var elementId = "thirdname";
    var elementUserName = document.getElementById(elementId);
    elementUserName.innerHTML = hardData[0].userName;
  }
}
