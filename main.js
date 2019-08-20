var data = [];
var slop = 0;
var b = 0;

var maxTemperatureX = 40;
var maxSalesCountY = 100;

function setup() {

    var canvas = createCanvas(400, 400);
    canvas.parent('divCanvas');
    background("green");
}

function mousePressed() {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);
    var temperature = map(mouseX, 0, width, 0, maxTemperatureX) | 0;
    var salesCount = map(mouseY, 0, height, maxSalesCountY, 0 ) | 0;

    var point = createVector(x, y);
    data.push(point);
    appendToTable("#tableData", temperature, salesCount);
}

function draw() {
    background("green");
    for (i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        fill(255);
        stroke("yellow");
        ellipse(x, y, 8, 8);
    }
    stroke("red");
    strokeWeight(5)
    line(20,20, 20, 380);
    line(20, 380, 380, 380);
    stroke("green");
    fill(255);
    textSize(16);
    text('0', 5, 390);
    text('100', 3, 25);
    text('40°C', 355, 395);
    text('Temperature   --->', 220, 395);
    translate(12, 160);
    rotate(55);
    text('Sales Count   --->', 0,0);
}

function drawLine() {
    var lineStartPointX = 0;
    var lineStartPointY = getPointY();
}

function getPointY(slopParam, xParam, bParam) {
    return slopeParam * xParam + bParam;
}

function appendToTable(tableId, col1, col2) {
    $(tableId + ' tr:nth-child(1)').after('<tr><td>' + col1 + '</td><td>' + col2 + '</td></tr>');
}