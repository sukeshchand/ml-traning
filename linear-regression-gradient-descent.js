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



// Linear Regression with Gradient Descent
function linearRegressionGradientDescent() {
    for (var i = 0; i < data.length; i++) {
        x = data[i].x; // temperature
        y = data[i].y; // sales count
        
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
