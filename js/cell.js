function Cell(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.mine = true;
    this.revealed = true;
}

Cell.prototype.show = function () {

    stroke(0);
    strokeWeight(2);
    noFill();
    rect(this.x,this.y,this.w,this.w)
}