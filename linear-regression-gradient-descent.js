

// Linear Regression with Gradient Descent
function linearRegressionGradientDescent() {
    for (var i = 0; i < data.length; i++) {
        x = data[i].x;
        y = data[i].y;
        
        // make a guess
        var guess = slop * x + yIntercept;

        // calculate the error
        var error = y - guess;

        // Tweak/change the value of slop and yIntercept
        slop = slop + (error * x) * learning_rate;
        yIntercept = yIntercept + (error * learning_rate);
    }
    refreshAIModel();
}