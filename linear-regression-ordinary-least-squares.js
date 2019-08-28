// Example data
/*
Temperature     Sales count
9	            29
13	            35
19	            38
24	            43
24	            49
31	            46
28	            52
35          	51
35	            56
39	            59
43	            60
46	            64
44	            69
51	            70
*/

//Linear regression using - ordinary least squares
function linearRegressionWithOrdinaryLeastSqures() {
    // Calculate the sum of all x and y
    var xSum = 0;
    var ySum = 0;
    for (var i = 0; i < data.length; i++) {
        xSum += data[i].x;  // Temperature
        ySum += data[i].y;  // sales count
    }
    
    // calculate the mean(average) of x and y
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