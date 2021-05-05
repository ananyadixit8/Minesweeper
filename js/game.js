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



function preload() {
     bomb = loadImage("images/bomb.png");
     flag= loadImage("images/flag.png");

}

function setDimensions() {
    length = 300;
    width = 300;
    var form = document.querySelector('select');
    var difficulty = form.value;
    if (difficulty == 1) {
        rows = 14;
        cols = 9;
        length = rows * w;
        width = cols * w;
        totalMines = 15;
        flagCount = 15;
    }
    else if (difficulty == 3) {
        rows = 22;
        cols = 22;
        length = rows * w;
        width = cols * w;
        totalMines = 80;
        flagCount = 80;
    }
    else {

        rows = Math.floor(300 / w);
        cols = Math.floor(300 / w);
        totalMines = 30;
        flagCount = 30;
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
    if(difficulty==3){
        cnv.position(400,100);
    }

}



function setup() {

    cnv=createCanvas(length, width);

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
    return;
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
}