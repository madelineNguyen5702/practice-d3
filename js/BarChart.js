import { barData, dataUrl } from "../data/barData.js";
import BarConfig from "./configuration/BarConfig.js";
document.getElementById("bar-section").innerHTML = `
<h1>Bar Chart Here</h1>
`;
var { margin, height, width } = BarConfig;

let dataAxios = "";
axios
  .get("https://query.data.world/s/hj7a6jusamaf4oxowc2nv44idjgiwu")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {});

// append the svg object to the body of the page
var svg = d3
  .select("#bar-section")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv(
  // import csv
  "https://query.data.world/s/hj7a6jusamaf4oxowc2nv44idjgiwu",
  function (data) {
    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
    // Add Y axis
    var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Country);
      })
      .attr("y", function (d) {
        return y(d.Value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.Value);
      })
      .attr("fill", "#69b3a2");
  }
);
