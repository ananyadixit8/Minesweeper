//function that initializes an array of specified number of rows and columns

function makeGrid(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

//variables to keep track of all elements in the game

var grid;
var w = 20;
var length = 300;
var width = 300;
var rows = Math.floor(300 / w);
var cols = Math.floor(300 / w);
var totalMines = 30;
var revealedCount = 0;
var flagCount = 30;
var cnv;
let bomb;
let flag;
var difficulty = 0;
var gameStart;
var time;
var gameFinish;
var userName = "Anonymous";

//function that preloads the mine and flag images

function preload() {
  bomb = loadImage("images/bomb.png");
  flag = loadImage("images/flag.png");
}

//function resets all html elements to their original state

function resetGame() {
  var div = document.getElementById("ending");
  div.innerHTML = "";

  var button = document.getElementById("playAgain");
  button.style.display = "none";

  var userTime = document.getElementById("userTime");
  userTime.innerHTML = "";

  var userNameDiv = document.getElementById("userNameDiv");
  userNameDiv.style.visibility = "hidden";
}

//function to move the difficulty options to the left side when game starts

function moveOptionsToSide() {
  var userOptions = document.getElementById("userOptions");
  userOptions.classList.remove("center");
}

//function used to set the dimensions of the grid according to difficulty
function setDimensions() {
  //reset all elements
  resetGame();

  length = 300;
  width = 300;

  //get the difficulty value from the options
  var form = document.querySelector("select");
  difficulty = form.value;

  //for easy difficulty
  if (difficulty == 1) {
    //initialize the grid variables
    rows = 14;
    cols = 9;
    length = rows * w;
    width = cols * w;
    totalMines = 10;
    flagCount = 10;
    revealedCount = 0;
    gameStart = new Date();
    gameFinish = false;

    //move difficulty options to the left
    moveOptionsToSide();

    //re-align canvas
    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.left = "36%";

    //re-align the timer
    var userTime = document.getElementById("userTime");
    userTime.style.top = "35%";
    userTime.style.left = "75%";
  }
  //for medium difficulty
  else if (difficulty == 2) {
    //initialize the grid variables
    rows = Math.floor(300 / w);
    cols = Math.floor(300 / w);
    totalMines = 30;
    flagCount = 30;
    revealedCount = 0;
    gameStart = new Date();
    gameFinish = false;

    //move difficulty options to the left
    moveOptionsToSide();

    //re-align canvas
    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.left = "36%";

    //re-align the timer
    var userTime = document.getElementById("userTime");
    userTime.style.top = "45%";
    userTime.style.left = "76%";
  }
  //for hard difficulty
  else if (difficulty == 3) {
    //initialize the grid variables
    rows = 22;
    cols = 22;
    length = rows * w;
    width = cols * w;
    totalMines = 80;
    flagCount = 80;
    revealedCount = 0;
    gameStart = new Date();
    gameFinish = false;

    //move difficulty options to the left
    moveOptionsToSide();

    //re-align canvas
    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.left = "30%";

    //re-align the timer
    var userTime = document.getElementById("userTime");
    userTime.style.top = "55%";
    userTime.style.left = "80%";
  }
  //when no difficulty has been selected
  else {
    //initialize the grid variables
    rows = 0;
    cols = 0;
    length = 0;
    width = 0;
    totalMines = 0;
    flagCount = 0;
    revealedCount = 0;
    gameStart = new Date();
    gameFinish = true;
  }

  //make an array of specified size to keep track of number of mines surrounding a particular cell
  grid = makeGrid(rows, cols);

  //initialize each array element as a new Cell
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  //store all cell indexes in options to chose some random element as a mine
  var options = [];
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      options.push([i, j]);
    }
  }

  //choose some random cell indexes to create mines
  for (var n = 0; n < totalMines; n++) {
    var pick = floor(random(options.length));
    var i = options[pick][0];
    var j = options[pick][1];
    options.splice(pick, 1);
    grid[i][j].mine = true;
  }

  //store the number of mines surrounding a particular cell in the grid
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].countMines();
    }
  }

  //resize the canvas according to specified length and width
  resizeCanvas(length, width);
}

//p5.js function to define the initial environment of the page
function setup() {
  //create the required canvas
  cnv = createCanvas(length, width);
  //assign the canvas to the div element with id "canvasContainer" in html for alignment purposes
  cnv.parent("canvasContainer");

  //disable default right click on canvas
  var canvas = document.getElementsByTagName("canvas");
  canvas[0].addEventListener("contextmenu", (event) => event.preventDefault());

  //set dimensions according to difficulty selected
  setDimensions();
}

//function to reveal all surronding cells with no mines around when a particular cell is clicked
function dfs(i, j) {
  //if this cell has been revealed or it is a mine or it has been flagged , return
  if (
    grid[i][j].revealed == true ||
    grid[i][j].mine == true ||
    grid[i][j].flag == true
  ) {
    return;
  }

  //reveral this cell
  grid[i][j].reveal();

  //increase the count of revealed cells
  revealedCount++;

  //if this cell has no mines around it , repeat the same for all valid neighbourhood cells
  if (grid[i][j].mineCount == 0) {
    for (var h = -1; h <= 1; h++) {
      for (var v = -1; v <= 1; v++) {
        if (h == 0 && v == 0) {
          continue;
        }
        var x = h + i;
        var y = v + j;

        if (x >= 0 && x < rows && y >= 0 && y < cols) {
          dfs(x, y);
        }
      }
    }
  }

  return;
}

function setUsername() {
  userName = document.getElementById("userName").value;
  console.log(userName);

  // update the leaderboard
  updateLeaderboard();
}

async function updateLeaderboard() {
  console.log("update");
  const data = { time, difficulty, userName };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);
}

//when the user clicks on a mine
function gameOver() {
  //make sure time isn't updated anymore
  gameFinish = true;

  //reveal all mines and remove all flags
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (grid[i][j].mine == true) {
        grid[i][j].revealed = true;
      }
      grid[i][j].flag = false;
    }
  }

  //display game over message
  var div = document.getElementById("ending");
  div.innerHTML = "GAME OVER!";

  //display play again button
  var button = document.getElementById("playAgain");
  button.style.display = "block";

  //if difficulty is not hard, block scroll of body
  if (difficulty !== 3) {
    var body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
  }

  return;
}

//when all mines have been correctly flagged
function gameWon() {
  //make sure time isn't updated anymore
  gameFinish = true;

  //reveal all mines and remove all flags
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (grid[i][j].mine == true) {
        grid[i][j].revealed = true;
      }
      grid[i][j].flag = false;
    }
  }

  //display you won message
  var div = document.getElementById("ending");
  div.innerHTML = "YOU WON!";
  div.style.left = "33%";

  //display play again button
  var button = document.getElementById("playAgain");
  button.style.display = "block";

  //diaply username form to update leaderboard if required
  var userName = document.getElementById("userNameDiv");
  userName.style.visibility = "visible";

  return;
}

//display time score
function displayTime() {
  //if game has been finished, dont update time
  if (gameFinish) {
    return;
  }

  //calculate the time in seconds and minutes
  var currTime = new Date();
  time = currTime - gameStart;
  time = floor(time / 1000);
  var seconds = time % 60;
  var minutes = floor(time / 60);
  var userTime = document.getElementById("userTime");

  var extraZeroMinutes = "";
  var extraZeroSeconds = "";
  if (floor(minutes / 10) == 0) {
    extraZeroMinutes = "0";
  }
  if (floor(seconds / 10) == 0) {
    extraZeroSeconds = "0";
  }
  userTime.innerHTML =
    extraZeroMinutes + minutes + ":" + extraZeroSeconds + seconds;
}

function mousePressed() {
  if (mouseButton === LEFT) {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          if (grid[i][j].mineCount == 0) {
            dfs(i, j);
          } else {
            grid[i][j].reveal();
            revealedCount++;
          }
          if (grid[i][j].mine == true) {
            gameOver();
          }
          if (revealedCount == rows * cols - totalMines) {
            gameWon();
          }
        }
      }
    }
  } else if (mouseButton === RIGHT) {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].flagToggle();
        }
      }
    }
  }
}

function draw() {
  clear();
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }

  displayTime();
}
