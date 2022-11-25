// set the dimensions and margins of the graph
var width = 450,
  height = 300,
  margin = 3;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

var CircleConfig = {
  width,
  height,
  radius,
};

export default CircleConfig;
