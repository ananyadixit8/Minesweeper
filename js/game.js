function makeGrid(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}


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


function preload() {
    bomb = loadImage("images/bomb.png");
    flag = loadImage("images/flag.png");

}

function resetGame(){

    var div = document.getElementById("ending");
    div.innerHTML = "";

    var button = document.getElementById("playAgain");
    button.style.display = "none";

    var userTime = document.getElementById("userTime");
    userTime.innerHTML = "";

    var userName = document.getElementById("userName");
    userName.style.visibility = "hidden";

}

function moveOptionsToSide(){
    var userOptions = document.getElementById("userOptions");
    userOptions.classList.remove("center");
}

function setDimensions() {

    //reset all elements 
    resetGame();


    length = 300;
    width = 300;
    var form = document.querySelector('select');
    difficulty = form.value;
   
    if (difficulty == 1) {
        rows = 14;
        cols = 9;
        length = rows * w;
        width = cols * w;
        totalMines = 9;
        flagCount = 9;
        revealedCount = 0;
        gameStart = new Date();
        gameFinish = false;
        moveOptionsToSide();
        
    }
    else if(difficulty == 2){

        rows = Math.floor(300 / w);
        cols = Math.floor(300 / w);
        totalMines = 30;
        flagCount = 30;
        revealedCount = 0;
        gameStart = new Date();
        gameFinish = false;
        moveOptionsToSide();
    }
    else if (difficulty == 3) {
        rows = 22;
        cols = 22;
        length = rows * w;
        width = cols * w;
        totalMines = 80;
        flagCount = 80;
        revealedCount = 0;
        gameStart = new Date();
        gameFinish = false;
        moveOptionsToSide();
    }
    else{
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
    

    grid = makeGrid(rows, cols);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, w);

        }
    }

    //Pick random mines 
    var options = [];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            options.push([i, j]);

        }
    }
    for (var n = 0; n < totalMines; n++) {
        var pick = floor(random(options.length));
        var i = options[pick][0];
        var j = options[pick][1];
        options.splice(pick, 1);
        grid[i][j].mine = true;
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].countMines();

        }
    }

    resizeCanvas(length, width);
    

}



function setup() {

    cnv = createCanvas(length, width);
    cnv.parent('canvasContainer');

    //disable default right click on canvas
    var canvas = document.getElementsByTagName("canvas");
    canvas[0].addEventListener('contextmenu', event => event.preventDefault());

    setDimensions();


}

function dfs(i, j) {
    if (grid[i][j].revealed == true || grid[i][j].mine == true || grid[i][j].flag == true) {
        return;
    }
    grid[i][j].reveal();
    revealedCount++;
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


function gameOver() {
    
    //make sure time isn't updated anymore
    gameFinish = true;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].mine == true) {
                grid[i][j].revealed = true;
            }
            grid[i][j].flag = false;
        }
    }
    var div = document.getElementById("ending");
    div.innerHTML = "GAME OVER!";
    var button = document.getElementById("playAgain");
    button.style.display = "block";
    return;


}

function gameWon() {
    
    //make sure time isn't updated anymore
    gameFinish = true;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].mine == true) {
                grid[i][j].revealed = true;
            }
            grid[i][j].flag = false;
        }
    }

    var div = document.getElementById("ending");
    div.innerHTML = "YOU WON!";

    var button = document.getElementById("playAgain");
    button.style.display = "block";

    var userName = document.getElementById("userName");
    userName.style.visibility = "visible";
    
    //update the leadetboard
    updateLeaderboard();


    return;
}

function displayTime(){
    if(gameFinish){
        return;
    }

    //display the time 
    var currTime = new Date();
    time = currTime - gameStart;
    time = floor(time / 1000);
    var seconds = time % 60;
    var minutes = floor(time / 60);
    var userTime = document.getElementById("userTime");
    userTime.innerHTML = minutes + ":" + seconds;

}

function updateLeaderboard(){
    var user = document.querySelector('input').value;
    var index = -1;
    for(var i = 0;i<10;i++){
       if(time<leader_table[i]){
           index=i;
           break;
       } 
    }
    if(index==-1){
        return ;
    }

    for(var i=index+1;i<10;i++){
        leader_table[i]=leader_table[i-1];
    }
    leader_table[index]=time;
    return ;

    
}


function mousePressed() {


    if (mouseButton === LEFT) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    if (grid[i][j].mineCount == 0) {

                        dfs(i, j);
                    }
                    else {
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
    }
    else if (mouseButton === RIGHT) {
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