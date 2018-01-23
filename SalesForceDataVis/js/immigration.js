/**
 * Created by aditeyapandey on 1/23/18.
 */
var w = 600;
var h = 400;

//Defining the tooltip div
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Define map projection
var projection = d3.geoAlbersUsa()
    .translate([w/2, h/2])
    .scale([700]);

//Define path generator
var path = d3.geoPath()
    .projection(projection);

//Create SVG element
var svgImmigration = d3.select("#immigration")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


//Load in agriculture data
//acs2015_county_data.csv

d3.csv("acs2015_county_data.csv", function(data) {

    console.log(data)

    var stateImmigration = {};

    var reformattedArray = data.map(function(obj) {

        if (obj.State in stateImmigration){
            stateImmigration[obj.State].push((parseInt(obj.TotalPop)-parseInt(obj.Citizen))/parseInt(obj.TotalPop));
        }
        else{
            stateImmigration[obj.State]=[]
            stateImmigration[obj.State].push((parseInt(obj.TotalPop)-parseInt(obj.Citizen))/parseInt(obj.TotalPop));
        }

    });

    var stateImmigrationRatio={}
    Object.keys(stateImmigration).forEach(function (d) {
        stateImmigrationRatio[d]=returnAvg(stateImmigration[d])
    })
    console.log(statePovertyRatio)

    var populationValues=Object.values(stateImmigrationRatio)

    console.log(d3.max(populationValues))
    //Define quantize scale to sort data values into buckets of color
    var color = d3.scaleLinear()
        .domain([d3.min(populationValues), d3.max(populationValues)])
        .range(["#e5f5f9", "#2ca25f"])
        .interpolate(d3.interpolateHcl);


    //Set input domain for color scale
    // color.domain([
    //     d3.min(data, function(d) { return d.value; }),
    //     d3.max(data, function(d) { return d.value; })
    // ]);

    //Load in GeoJSON data
    d3.json("us-states.json", function(json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        data=Object.keys(stateImmigrationRatio)
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i]

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(stateImmigrationRatio[data[i]]);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;

                }
            }
        }


        console.log(json)


        //Bind data and create one path per GeoJSON feature
        svgImmigration.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class",function(d){
                return d.properties.name
            })
            .style("fill", function(d) {
                //Get data value
                var value = d.properties.value;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            })
            .on("mouseover", function(d){

                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("<b>"+ d.properties.name + "</b> <br/>" + "Immigration: "+d.properties.value.toFixed(2)+"%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");


            })
            .on("mouseout", function(d){
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
        ;

        svgImmigration.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate("+w/4+","+(h-((10/100)*h))+")");

        var legendLinear = d3.legendColor()
            .shapeWidth(50)
            .orient('horizontal')
            .scale(color)


        svgImmigration.select(".legendLinear")
            .call(legendLinear);

    });

});