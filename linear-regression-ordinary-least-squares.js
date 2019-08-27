
//Linear regression using - ordinary least squares
function linearRegressionWithOrdinaryLeastSqures() {
    // Calculate the sum of all x and y
    var xSum = 0;
    var ySum = 0;
    for (var i = 0; i < data.length; i++) {
        xSum += data[i].x;
        ySum += data[i].y;
    }
    
    // calculate the mean of x and y
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