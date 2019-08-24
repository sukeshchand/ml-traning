var data = [];
var slop = 1;
var yIntercept = 0;

var maxCanvasX = 700;
var maxCanvasY = 700;

var marginLineX = 50;
var marginLineY = 50;

var maxX = 40;
var maxY = 100;

var xText = "";
var yText = "";

var isMousePressInputAccept = false;
var isComputeLinearRegression = true;
var isDrawLine = true;
var isShowXAndYAxis = false;
var isShowXAndYText = false;
var canvasBackground = "gray";

function setup() {
    var canvas = createCanvas(maxCanvasX, maxCanvasY);
    canvas.parent('divCanvas');
    background(canvasBackground);
    defaultTestValues();
    fillInputs();
}

function mousePressed() {
    if (!isMousePressInputAccept) return;
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);
    var temperature = map(mouseX, 0, width, 0, maxX) | 0;
    var salesCount = map(mouseY, 0, height, maxY, 0) | 0;

    var point = createVector(x, y);
    data.push(point);
    appendToTable("#tableData", temperature, salesCount);
}

function refreshSettings(){
    maxX = Number($("#txtMaxX").val());
    maxY = Number($("#txtMaxY").val());

    xText = $("#txtXText").val();
    yText = $("#txtYText").val();
    isShowXAndYAxis = $('#chkIsShowXAndYAxis').prop('checked');
    isShowXAndYText = $('#chkIsShowXAndYText').prop('checked');
}

function fillInputs() {
    $("#txtMaxX").val(maxX)
    $("#txtMaxY").val(maxY);

    $("#txtXText").val(xText);
    $("#txtYText").val(yText);
    $('#chkIsShowXAndYAxis').prop('checked', isShowXAndYAxis);
    $('#chkIsShowXAndYText').prop('checked', isShowXAndYText);
}

function defaultTestValues(){
    maxX = 50;
    maxY = 100;

    xText = "Tempeature"
    yText = "Ice cream sales count"
    isShowXAndYAxis = true;
    isShowXAndYText = true;
}

function draw() {
    background(canvasBackground);
    for (i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        fill(255);
        stroke("white");
        ellipse(x, y, 8, 8);
    }
    stroke("cyan");
    strokeWeight(5);

    //draw line X & y
    if (isShowXAndYAxis) {
        line(marginLineX, maxCanvasY - marginLineX, (maxCanvasX - marginLineX), (maxCanvasY - marginLineY));
        line(marginLineX, marginLineY, marginLineX, (maxCanvasY - marginLineY));
    }
    if(isShowXAndYText){
        stroke(canvasBackground);
        fill(255);
        textSize(25);
        text('0', marginLineX - 15, maxCanvasY - marginLineX + 20);
        text(xText + " ------>  (Max value:" + maxX + ")", marginLineX + marginLineY, maxCanvasY - 20);

        fill(255);
        stroke(canvasBackground);
        translate(20, maxCanvasY - marginLineY - marginLineX);
        rotate(55);
        text(yText + " ------>  (Max value:" + maxY + ")", 0, 0);
    
    }

    if (isComputeLinearRegression) {
        linearRegression();
    }
    if (isDrawLine) {
        drawLine();
    }

    $("#divDataCount").html("Total data points:" + data.length);
}

function linearRegression() {
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
        numerator += (x - xMean) * (y - yMean);
        denominator += (x - xMean) * (x - xMean);
    }

    slop = numerator / denominator; // slop is the m variable in the formula - y = mx + b
    yIntercept = yMean - slop * xMean; // yIntercept is the b variable in the formula - y = mx + b
}

function drawLine() {

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
    displayLineDetails();
}

function displayLineDetails() {
    var tmpSlop = map(slop, 0, 1, 0, 100);
    var tmpYIntercept = map(yIntercept, 0, 1, 0, 100);

    $("#divSlop").html("Slop: " + tmpSlop.toFixed(2));
    $("#divYIntercept").html("YIntercept: " + tmpYIntercept.toFixed(2));
}

function getPointY(slopParam, xParam, bParam) {
    return slopParam * xParam + bParam;
}

function appendToTable(tableId, col1, col2) {
    $(tableId + ' tr:last').after('<tr><td>' + col1 + '</td><td>' + col2 + '</td></tr>');
}