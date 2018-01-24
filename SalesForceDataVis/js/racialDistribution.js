/**
 * Created by aditeyapandey on 1/22/18.
 */
//Width and height


    //var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13];


function drawHistogram(dataset) {

    w1 = document.getElementById("racialDistribution").offsetWidth;;
    h1= 350;
    var padding = 30;

    xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w1])
        .paddingInner(0.05);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, h1-padding-90]);

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickValues(["hi", "gg", 300]) //specify an array here for values;

//Create SVG element
    var svg = d3.select("#racialDistribution")
        .append("svg")
        .attr("width", w1)
        .attr("height", h1);
    //Define Y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(5);

//Create bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return h1-padding - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
            return yScale(d);
        })
        .attr("fill", function (d) {
            return "#41b6c4"
        });

// //Create labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return d.toFixed(2)+"%";
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return h1 - yScale(d) - 30;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black");


    svg.append("g").selectAll("text")
        .data(["Asian","Black","Hispanic","Native","Pacific","White"])
        .enter()
        .append("text")
        .text(function (d) {
            return d
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return h1 -5 ;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black");

    //Create X axis
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + (h1 -padding ) + ")")
    //     .call(xAxis);



    d3.select("#statemap").selectAll("path")
        .on("click", function (element) {

            d3.select(".regionPlaceHolder").html("")
            d3.select(".regionPlaceHolder").html(element.properties.name)
            //New values for dataset
            dataset=element.properties.stateWiseRace
            //Update all rects
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function (d, i) {
                    return i / dataset.length * 1000;
                })
                .duration(500)
                .attr("y", function (d) {
                    return h1-padding - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) {
                    return yScale(d);
                })
                .attr("fill", function (d) {
                    return "#41b6c4"
                });

            //Update all labels
            svg.selectAll("text")
                .data(dataset)
                .transition()
                .delay(function (d, i) {
                    return i / dataset.length * 1000;
                })
                .duration(500)
                .text(function (d) {
                    return  d.toFixed(2)+"%";
                })
                .attr("text-anchor", "middle")
                .attr("x", function (d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                })
                .attr("y", function (d) {
                    return h1 - yScale(d) - 30;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "18px")
                .attr("fill", "black");


        });


}

//On click, update with new data
