
"use strict";

var dailysalesPromise = d3.json("http://localhost:8080/daily_sales");

Promise.all([dailysalesPromise])
.then(values=> {

    var dailysalescounts= values[0];
    //document.write(dailysalescounts.map(d => d.count))

    // Create bar chart
    var margin = {top:50, left:50, right:50, bottom: 50};
     var height = 500 - margin.top - margin.bottom;
    var width = 800 - margin.left - margin.right;

    var barSvg = d3.select("#bar")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
        .domain(dailysalescounts.map(d => d.date))
        .range([0, width])
        .padding(0.9);
    barSvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // title
    barSvg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +  (height + margin.top/4*3) + ")")
      .style("text-anchor", "middle")
      .text("Count by Date");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(dailysalescounts.map(d => d.count))])
        .range([height, 0]);
    barSvg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    function handleClick(d, i) {
        // mouse click event
        d3.select(this).transition()
            .duration("50")
            .attr("opacity", ".85");
        // bar chart with mouse click
        var u = barSvg.selectAll("rect").data(dailysalescounts[d.id]);
        u.enter()
            .append("rect")
            .merge(u)
            .transition()
            .duration("1000")
            .attr("x", d => x(d[0]))
            .attr("y", d => y(d[1]))
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return height - y(d[1]);
            })
            .attr("fill", "#69b3a2")
        };

   })
.catch(error => console.log(error));
