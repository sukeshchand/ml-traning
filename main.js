var data = [];
var slop = 0;
var yIntercept = 0;

var maxCanvasX = 700;
var maxCanvasY = 700;

var marginLineX = 50;
var marginLineY = 50;

var maxX = 50;
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
    setupEvents();
}

function setupEvents() {
    attachRefresh("#txtMaxX");
    attachRefresh("#txtXText");
    attachRefresh("#txtMaxY");
    attachRefresh("#chkIsShowXAndYAxis");
    attachRefresh("#txtXText");
    attachRefresh("#txtYText");
    attachRefresh("#chkIsShowXAndYText");
    attachRefresh("#chkIsDrawLine");
    attachRefresh("#chkMousePressInputAccept");
    attachRefresh("#chkLinearRegression");
}

function attachRefresh(id) {
    $(id).on('change keydown paste input', function () {
        refreshSettings();
    });
}

function addInputData(xParam, yParam, refreshDataView) {
    var x = map(xParam, 0, width, 0, 1);
    var y = map(yParam, 0, height, 1, 0);
    var xMapped = map(mouseX, 0, width, 0, maxX) | 0;
    var yMapped = map(mouseY, 0, height, maxY, 0) | 0;

    var point = createVector(x, y);
    data.push(point);
    if (refreshDataView) {
        appendToTable("#tableData", xMapped, yMapped);
        fillInputs();
    }
}

function mousePressed() {
    if (!isMousePressInputAccept) return;
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
    addInputData(mouseX, mouseY, true);
}

function updateData() {
    data = [];
    slop = 0;
    yIntercept = 0;

    var strData = $("#txtData").val().split("\n");
    for (i = 0; i < strData.length; i++) {
        var strData2 = strData[i].split(",");
        if(strData2.length !=2 || isNaN(strData2[0]) || isNaN(strData2[1])) continue;
        var x = map(Number(strData2[0]), 0, maxX, 0, width);
        var y = map(Number(strData2[1]),0, maxY, height, 0);
        if(i + 1 == strData.length){
            addInputData(x, y, true); 
        }
        else{
            addInputData(x, y, false); 
        }
    }
}

function refreshSettings() {
    maxX = Number($("#txtMaxX").val());
    maxY = Number($("#txtMaxY").val());

    xText = $("#txtXText").val();
    yText = $("#txtYText").val();
    isShowXAndYAxis = $('#chkIsShowXAndYAxis').prop('checked');
    isShowXAndYText = $('#chkIsShowXAndYText').prop('checked');
    isDrawLine = $('#chkIsDrawLine').prop('checked');
    isComputeLinearRegression = $('#chkLinearRegression').prop('checked');
    isMousePressInputAccept = $('#chkMousePressInputAccept').prop('checked');
}

function fillInputs() {
    $("#txtMaxX").val(maxX)
    $("#txtMaxY").val(maxY);

    $("#txtXText").val(xText);
    $("#txtYText").val(yText);
    $('#chkIsShowXAndYAxis').prop('checked', isShowXAndYAxis);
    $('#chkIsShowXAndYText').prop('checked', isShowXAndYText);
    $('#chkIsDrawLine').prop('checked', isDrawLine);
    $('#chkLinearRegression').prop('checked', isComputeLinearRegression);
    $('#chkMousePressInputAccept').prop('checked', isMousePressInputAccept);
    var dataString = "";
    for (i = 0; i < data.length; i++) {
        var xMapped = map(data[i].x, 0, 1, 0, maxX) | 0;
        var yMapped = map(data[i].y, 1, 0, maxY, 0) | 0;
        dataString += xMapped + "," + yMapped + "\n";
    }
    $("#txtData").val(dataString);
}

function defaultTestValues() {
    maxX = 50;
    maxY = 100;

    xText = "Tempeature"
    yText = "Ice cream sales count"
    isShowXAndYAxis = true;
    isShowXAndYText = true;
    isDrawLine = true;
    isMousePressInputAccept = true;
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

    if (isComputeLinearRegression) {
        linearRegression();
    }
    if (isDrawLine) {
        drawLine();
    }

    $("#divDataCount").html("Data count: <span style='color:red;'>" + data.length + "</span>");
    if (!(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)) {
        var mouseXConverted = map(mouseX, 0, width, 0, maxX);
        var mouseYConverted = map(mouseY, height, 0, 0, maxY);
        $("#divMouseXY").html("x: <span style='color:red;'>" + mouseXConverted.toFixed(0) + "</span>, y: <span style='color:red;'>" + mouseYConverted.toFixed(0) + "</span>");
    }

    if (isShowXAndYText) {
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

    if (denominator != 0) {
        slop = numerator / denominator; // slop is the m variable in the formula - y = mx + b
        yIntercept = yMean - slop * xMean; // yIntercept is the b variable in the formula - y = mx + b
    }

    displayLineDetails();
}

function predictY() {
    var x = +($("#txtPredictionX").val());

    var xConverted = map(x, 0, maxX, 0, width);
    xConverted = map(xConverted, 0, width, 0, 1);

    // predict y
    var y = slop * xConverted + yIntercept;

    var yConverted = map(y, 1, 0, 0, height);
    yConverted = map(yConverted, height, 0, 0, maxY);

    $("#txtPredictionY").val(yConverted.toFixed(0));
}


function addXYToData() {
    var x = Number($("#txtPredictionX").val())
    var y = Number($("#txtPredictionY").val())
    var xPre = map(x, 0, maxX, 0, width);
    var yPre = map(y, 0, maxY, height, 0);
    addInputData(xPre, yPre, true);
}

function drawLine() {
    if (slop == 0 && yIntercept == 0) return;
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

function displayLineDetails() {
    var tmpSlop = map(slop, 0, 1, 0, maxX);
    var tmpYIntercept = map(yIntercept, 0, 1, 0, maxY);

    $("#txtSlop").val(tmpSlop.toFixed(2));
    $("#txtYIntercept").val(tmpYIntercept.toFixed(2));
}

function getPointY(slopParam, xParam, bParam) {
    return slopParam * xParam + bParam;
}

function appendToTable(tableId, col1, col2) {
    $(tableId + ' tr:last').after('<tr><td>' + col1 + '</td><td>' + col2 + '</td></tr>');
}