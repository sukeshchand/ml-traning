var data = [];
var slop = 1;
var yIntercept = 0;

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
    var salesCount = map(mouseY, 0, height, maxSalesCountY, 0) | 0;

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
        stroke("white");
        ellipse(x, y, 8, 8);
    }
    stroke("blue");
    strokeWeight(5);
    line(20, 20, 20, 380);
    line(20, 380, 380, 380);
    stroke("green");
    fill(255);
    textSize(16);
    text('0', 5, 390);
    text('100', 3, 25);
    text('40°C', 355, 395);
    text('Temperature   --->', 220, 395);
    drawLine();

    fill(255);
    stroke("green");
    translate(12, 160);
    rotate(55);
    text('Sales Count   --->', 0, 0);
}

function linearRegression() {

}

function drawLine() {

    var xSum = 0;
    var ySum = 0;
    for (i = 0; i < data.length; i++) {
        xSum += data[i].x;
        ySum += data[i].y;
    }
    var xMean = xSum / data.length;
    var yMean = ySum / data.length;

    // find numerator and denominator
    var numerator = 0;
    var denominator = 0;
    for (i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
        numerator += (x-xMean) * (y-yMean);
        denominator += (x-xMean) * (x-xMean);
    }

    slop = numerator / denominator; // slop is the m variable in the formula - y = mx + b
    yIntercept = yMean - slop * xMean; // yIntercept is the b variable in the formula - y = mx + b

    var x1 = 0;
    var y1 = getPointY(slop, x1, yIntercept);

    var x2 = 1;
    var y2 = getPointY(slop, x2, yIntercept);

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);

    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);

    stroke("red");
    line(x1, y1, x2, y2);
}

function getPointY(slopParam, xParam, bParam) {
    return slopParam * xParam + bParam;
}

function appendToTable(tableId, col1, col2) {
    $(tableId + ' tr:last').after('<tr><td>' + col1 + '</td><td>' + col2 + '</td></tr>');
}