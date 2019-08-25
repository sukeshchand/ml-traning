var data = [];
var weights = [];

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
    for (var i = 0; i < data.length; i++) {
        xSum += data[i].x;
        ySum += data[i].y;
    }
    var xMean = xSum / data.length;
    var yMean = ySum / data.length;

    // find numerator and denominator
    var numerator = 0;
    var denominator = 0;
    for (var i = 0; i < data.length; i++) {
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

function linearRegressionGradientDescent() {
    for (var i = 0; i < data.length; i++) {
        x = data[i].x;
        y = data[i].y;
        var guess = slop * x + yIntercept;
        var error = y - guess;
        slop = slop + (error * x) * learning_rate;
        yIntercept = yIntercept + (error * learning_rate);
    }
    refreshAIModel();
}

//---------------------------------- Perceptron - Start--------------------------------
var perceptron = {};
perceptron.init = function (weightsParam) {
    weightsParam = new Array(2);
    // init random weights
    for (var i = 0; i < weightsParam.length; i++) {
        weightsParam[i] = random(-1, 1);
    }
    return weightsParam;
};

// activation function
perceptron.sign = function sign(n) {
    if (n >= 0) {
        return 1;
    } else {
        return -1;
    }
};

perceptron.guess = function guess(inputsParam, weightsParam) {
    var sum = 0;
    for (var indexWeightParam = 0; indexWeightParam < weightsParam.length; indexWeightParam++) {
        sum = sum + inputsParam[indexWeightParam] * weightsParam[indexWeightParam];
    }
    var output = this.sign(sum);
    return output;
};

perceptron.train = function(inputParam, weightsParam, actualAnswer){
    if(!actualAnswer) return weightsParam;
    var guessValue = this.guess(inputParam, weights);
    var error = actualAnswer - guessValue;
    
    //var x = map(inputParam[0], 0, 1, 0, width);
    //var y = map(inputParam[1], 0, 1, height, 0);
    //ellipse(x, y, 25, 25);
    
    // Tune all the weights
    for (var indexWeight = 0; indexWeight < weightsParam.length; indexWeight++) {
        weightsParam[indexWeight] += error * inputParam[indexWeight] * learning_rate ;
    }
    return weightsParam;
};


function trainData() {
    trainAllDataUsingNeuralNetworksPerceptron();
}

function trainAllDataUsingNeuralNetworksPerceptron(){
    for (var indexData = 0; indexData < data.length; indexData++) {
        var inputs = [];
        inputs.push(data[indexData].x);
        inputs.push(data[indexData].y);
        actualAnswer = data[indexData].label;
        weights = perceptron.train(inputs, weights, actualAnswer);   
        refreshAIModel();
    }
}


//---------------------------------- Perceptron - End--------------------------------