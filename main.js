var isMousePressInputAccept = false;
var isComputeLinearRegression = false;
var isComputeLinearRegressionGD = false;
var isNeuralNetworksPerceptron = false;
var isDrawLine = true;
var isShowXAndYAxis = false;
var isShowXAndYText = false;
var canvasBackground = "gray";

function setup() {
    var canvas = createCanvas(maxCanvasX, maxCanvasY);
    canvas.parent('divCanvas');
    background(canvasBackground);
    setDefaultValues();
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
    attachRefresh("#chkLinearRegressionGD");
    attachRefresh("#chkNeuralNetworksPerceptron");
    attachRefresh("#txtLearningRate");
}

function attachRefresh(id) {
    $(id).on('change keydown paste input', function () {
        refreshSettings();
    });
}

function addInputData(xParam, yParam, label, refreshDataView) {
    var x = map(xParam, 0, width, 0, 1);
    var y = map(yParam, 0, height, 1, 0);
    var xMapped = map(mouseX, 0, width, 0, maxX) | 0;
    var yMapped = map(mouseY, 0, height, maxY, 0) | 0;

    //var point = createVector(x, y, label);
    var item = {
        x : x,
        y : y,
        label : label
    };
    data.push(item);
    if (refreshDataView) {
        appendToTable("#tableData", xMapped, yMapped);
        fillInputs();
    }
}

function mousePressed() {
    if (!isMousePressInputAccept) return;
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
    addInputData(mouseX, mouseY, null, true);
}

function resetData() {
    setDefaultValues();
    data = [];
    slop = 0;
    yIntercept = 0;
    weights = perceptron.init(weights);
    fillInputs();
    $("#txtPredictionX").val("");
    $("#txtPredictionY").val("");
}

function updateSampleData() {
    data = [];
    weights = perceptron.init(weights);
    slop = 0;
    yIntercept = 0;

    var strData = $("#txtData").val().split("\n");
    for (var i = 0; i < strData.length; i++) {
        strData[i] = strData[i].replace('\t',',');
        var strData2 = strData[i].split(",");
        if (strData2.length < 2 || isNaN(strData2[0]) || isNaN(strData2[1])) continue;
        var x = map(Number(strData2[0]), 0, maxX, 0, width);
        var y = map(Number(strData2[1]), 0, maxY, height, 0);
        var label = "";
        if (strData2.length == 3) {
            label = Number(strData2[2]);
        }
        if (i + 1 == strData.length) {
            addInputData(x, y, label, true);
        } else {
            addInputData(x, y, label, false);
        }
    }
}

function refreshSettingsButtonClick() {
    updateSampleData();
    refreshSettings();
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
    isComputeLinearRegressionGD = $('#chkLinearRegressionGD').prop('checked');
    isNeuralNetworksPerceptron = $('#chkNeuralNetworksPerceptron').prop('checked');
    isMousePressInputAccept = $('#chkMousePressInputAccept').prop('checked');
    learning_rate = $("#txtLearningRate").val();
    $("#spanLearningRate").text(learning_rate);
    slop = Number($("#txtSlop").val());
    yIntercept = Number($("#txtYIntercept").val());
    weights[0] = Number($("#txtWeight0").val());
    weights[1] = Number($("#txtWeight1").val());
    drawLine();
}

function fillInputs() {
    $("#txtMaxX").val(maxX);
    $("#txtMaxY").val(maxY);

    $("#txtXText").val(xText);
    $("#txtYText").val(yText);
    $('#chkIsShowXAndYAxis').prop('checked', isShowXAndYAxis);
    $('#chkIsShowXAndYText').prop('checked', isShowXAndYText);
    $('#chkIsDrawLine').prop('checked', isDrawLine);
    $('#chkLinearRegression').prop('checked', isComputeLinearRegression);
    $('#chkLinearRegressionGD').prop('checked', isComputeLinearRegressionGD);
    $('#chkNeuralNetworksPerceptron').prop('checked', isNeuralNetworksPerceptron);
    $('#chkMousePressInputAccept').prop('checked', isMousePressInputAccept);
    var dataString = "";
    for (var i = 0; i < data.length; i++) {
        var xMapped = map(data[i].x, 0, 1, 0, maxX) | 0;
        var yMapped = map(data[i].y, 1, 0, maxY, 0) | 0;
        var label = "";
        if (data[i].label) {
            label = "," + data[i].label;
        }
        dataString += xMapped + "," + yMapped + label + "\n";
    }
    $("#txtData").val(dataString);
    $("#learning_rate").val(learning_rate);
    $("#spanLearningRate").text(learning_rate);

    $("#txtSlop").val(slop);
    var slopMapped = map(slop,0, maxX, 0, 1);
    //$("#spanSlop").text(slopMapped);
    $("#txtYIntercept").val(yIntercept);
    var yMapped = map(slop,0, maxY, 0, 1);
    //$("#spanYIntercept").text(yMapped);
    $("#txtWeight0").val(weights[0]);
    $("#txtWeight1").val(weights[1]);


}

function setDefaultValues() {
    maxX = 100;
    maxY = 100;
    xText = "";
    yText = "";
    weights = perceptron.init(weights);
    isShowXAndYAxis = false;
    isShowXAndYText = false;
    isDrawLine = false;
    isMousePressInputAccept = false;
    isComputeLinearRegression = false;
    isComputeLinearRegressionGD = false;
    isNeuralNetworksPerceptron = false;
}

function draw() {
    background(canvasBackground);
    for (var i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        var label = "";
        if (isNeuralNetworksPerceptron) {
            label = data[i].label;
            strokeWeight(3);
            fill(canvasBackground);
            stroke("white");
            ellipse(x, y, 15, 15);
            textSize(18);
            if (label == 1) {
                fill("white");
                stroke("red");
            } else {
                fill("white");
                stroke("green");
            }
            if(!label){
                fill("white");
                stroke("blue"); 
                
                var inputs = [];
                inputs.push(data[i].x);
                inputs.push(data[i].y);
                var guessedValue = perceptron.guess(inputs, weights);

                label="g: " + guessedValue;
            }
            text(label, x + 11, y + 11);
        } else {
            fill(255);
            stroke("white");
            ellipse(x, y, 8, 8);
        }

    }


    strokeWeight(5);
    //draw line X & y
    if (isShowXAndYAxis) {
        strokeWeight(8);
        stroke("#4000ff");
        line(2, maxCanvasY - 2, (maxCanvasX - 2), (maxCanvasY - 2));
        line(2, 2, 2, (maxCanvasY - 2));
        strokeWeight(5);
    }

    if (isComputeLinearRegression) {
        linearRegressionWithOrdinaryLeastSqures();
    } else if (isComputeLinearRegressionGD) {
        linearRegressionGradientDescent();
    } else if (isNeuralNetworksPerceptron) {
        if ($('#chkNeuralNetworksPerceptronLive').prop('checked')) {
            trainAllDataUsingNeuralNetworksPerceptron();
        }
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
    var x = Number($("#txtPredictionX").val());
    var y = Number($("#txtPredictionY").val());
    var xPre = map(x, 0, maxX, 0, width);
    var yPre = map(y, 0, maxY, height, 0);
    addInputData(xPre, yPre, null, true);
}

function drawLine() {
    //if (slop == 0 && yIntercept == 0) return;
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

function refreshAIModel() {
    
    //$("#spanSlop").text(slop);
    //var tmpSlop = map(slop, 0, 1, 0, maxX);
    $("#txtSlop").val(slop.toFixed(2));
    
    
    
    var tmpYIntercept = map(yIntercept, 0, 1, 0, maxY);
    $("#txtYIntercept").val(tmpYIntercept.toFixed(2));
    //$("#spanYIntercept").text(yIntercept);

    $("#txtWeight0").val(weights[0]);
    $("#txtWeight1").val(weights[1]);
}

function getPointY(slopParam, xParam, bParam) {
    return slopParam * xParam + bParam;
}

function appendToTable(tableId, col1, col2) {
    $(tableId + ' tr:last').after('<tr><td>' + col1 + '</td><td>' + col2 + '</td></tr>');
}