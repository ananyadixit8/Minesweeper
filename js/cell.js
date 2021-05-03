function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w;
    this.y = j * w;
    this.mineCount = 0;
    this.mine = false;
    this.revealed = false;
    this.flag = false;
}

Cell.prototype.show = function () {

    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.mine) {
            fill(0);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }
        else {
            stroke(0);
            strokeWeight(2);
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.mineCount > 0) {
                textAlign(CENTER);
                fill(0);
                strokeWeight(1);
                text(this.mineCount, this.x + 0.5 * this.w, this.y + this.w - 5);
            }

        }
    }
    if (this.revealed==false && this.flag) {
        stroke(0);
        strokeWeight(2);
        fill(0);
        rect(this.x, this.y, this.w, this.w);
        textAlign(CENTER);
        fill(255);
        strokeWeight(1);
        text('F', this.x + 0.5 * this.w, this.y + this.w - 5);
    }
}

Cell.prototype.countMines = function () {
    if (this.mine) {
        this.mineCount = -1;
        return;
    }
    var mines = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var x = this.i + i;
            var y = this.j + j;

            if (x >= 0 && x < rows && y >= 0 && y < cols && grid[this.i + i][this.j + j].mine == true) {
                mines++;
            }
        }
    }
    this.mineCount = mines;
}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
    this.revealed = true;
}

Cell.prototype.flagToggle = function () {


    if (this.flag == true) {
        flagCount++;
        this.flag = false;
        var div = document.getElementById("flagExceeded");
        div.style.display = "none";
    }
    else if(flagCount>0){
        flagCount--;
        this.flag = true;
        var div = document.getElementById("flagExceeded");
        div.style.display = "none";
    }
    else if(flagCount==0){
        var div = document.getElementById("flagExceeded");
        div.style.display = "block";
    }
}