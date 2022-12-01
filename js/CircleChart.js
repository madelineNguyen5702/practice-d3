import csvToJson from "../utilities/csvToJson.js";
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

function countPopulationByAge(arr, age) {
  return _.filter(arr, { age }).reduce(function myFunc(total, { population }) {
    return total + population * 1;
  }, 0);
}
let data = {};
axios
  .get("https://query.data.world/s/6ice2zg4hcmzsnxnmtnni75upec64a")
  .then((res) => {
    let object = csvToJson(res.data);
    var ageKeys = [...new Set(Object.keys(object).map((e) => object[e].age))];
    for (let index = 0; index < ageKeys.length; index++) {
      data[ageKeys[index]?.toString()] = countPopulationByAge(
        object,
        ageKeys[index]
      );
    }
    renderPieChart(data);
  });

function renderPieChart(data) {
  // set the color scale
  var color = d3
    .scaleOrdinal()
    .domain(data)
    .range(["#dbed17", "#0f07f4", "#be25c3", "#ec0b0b", "#2bcd1c"]);

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
}
