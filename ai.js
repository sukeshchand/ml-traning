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

var learning_rate = ".01";

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

    refreshAIModel();
}

function linearRegressionGradientDescent (){
    for (i = 0; i < data.length; i++) {
        x = data[i].x;
        y = data[i].y;
        var guess = slop * x + yIntercept;
        var error = y - guess;
        slop = slop + (error * x) * learning_rate;
        yIntercept = yIntercept + (error * learning_rate);
    }
    refreshAIModel();
}