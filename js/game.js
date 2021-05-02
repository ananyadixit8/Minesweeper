
function makeGrid(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}


var grid;
var w = 20;
var rows = Math.floor(300 / w);
var cols = Math.floor(300 / w);
var totalMines = 30;



function setup() {
    createCanvas(300, 300);

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
}

function dfs(i, j) {
    if (grid[i][j].revealed == true || grid[i][j].mine == true) {
        return;
    }
    grid[i][j].reveal();
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
        }
    }
    var div = document.getElementById("ending");
    div.innerHTML = "GAME OVER!";
    return;


}


function mousePressed() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                if (grid[i][j].mineCount == 0) {

                    dfs(i, j);
                }
                grid[i][j].reveal();
                if (grid[i][j].mine == true) {
                    gameOver();
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