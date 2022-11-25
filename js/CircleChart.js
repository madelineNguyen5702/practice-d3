import CircleConfig from "./configuration/CircleConfig.js";

document.getElementById("circle-section").innerHTML = `
    <h1>Circle Chart Here</h1>
`;

var { height, width, radius } = CircleConfig;

var svg = d3
  .select("#circle-section")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

// set the color scale
var color = d3
  .scaleOrdinal()
  .domain(data)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

// Compute the position of each group on the pie:
var pie = d3.pie().value(function (d) {
  return d.value;
});
var data_ready = pie(d3.entries(data));

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll("whatever")
  .data(data_ready)
  .enter()
  .append("path")
  .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
  .attr("fill", function (d) {
    return color(d.data.key);
  })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);

// var width = 400;

// var height = 400;

// var data = [10, 20, 30];

// var colors = ["green", "purple", "yellow"];

// var svgCircle = d3
//   .select("#circle-graph")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height);

// var g = svgCircle
//   .selectAll("g")
//   .data(data)
//   .enter()
//   .append("g")
//   .attr("transform", function (d, i) {
//     return "translate(0,0)";
//   });

// g.append("circle")
//   .attr("cx", function (d, i) {
//     return i * 75 + 50;
//   })

//   .attr("cy", function (d, i) {
//     return 75;
//   })

//   .attr("r", function (d) {
//     return d * 1.5;
//   })

//   .attr("fill", function (d, i) {
//     return colors[i];
//   });

// g.append("text")
//   .attr("x", function (d, i) {
//     return i * 75 + 25;
//   })

//   .attr("y", 80)
//   .attr("stroke", "teal")
//   .attr("font-size", "10px")
//   .attr("font-family", "sans-serif")
//   .text(function (d) {
//     return d;
//   });
