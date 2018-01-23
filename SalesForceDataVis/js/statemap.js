//Width and height
var w = 600;
var h = 400;

//Define map projection
var projection = d3.geoAlbersUsa()
    .translate([w/2, h/2])
    .scale([650]);

//Define path generator
var path = d3.geoPath()
    .projection(projection);




//Create SVG element
var svgState = d3.select("#statemap")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Load in agriculture data
//acs2015_county_data.csv


function returnAvg(arr){
    sum=arr.reduce(function (a,b){
        return (a+b)
    })

    return sum/arr.length
}

d3.csv("acs2015_county_data.csv", function(data) {

    console.log(data)

    var stateObjHispanic = {};
    var stateObjWhite= {};
    var stateObjBlack = {};
    var stateObjAsian = {};
    var stateObjNative = {};
    var stateObjPacific={}
    var reformattedArray = data.map(function(obj) {

        if (obj.State in stateObjHispanic){
            stateObjHispanic[obj.State].push(parseInt(obj.Hispanic));
            stateObjWhite[obj.State].push(parseInt(obj.White));
            stateObjAsian[obj.State].push(parseInt(obj.Asian));
            stateObjNative[obj.State].push(parseInt(obj.Native));
            stateObjBlack[obj.State].push(parseInt(obj.Black));
            stateObjPacific[obj.State].push(parseInt(obj.Pacific));
            //stateObjWhite[obj.State].push(parseInt(obj.White));


        }
        else{
            stateObjHispanic[obj.State]=[]
            stateObjHispanic[obj.State].push( parseInt(obj.Hispanic));
            stateObjWhite[obj.State]=[]
            stateObjWhite[obj.State].push(parseInt(obj.White));
            stateObjAsian[obj.State]=[]
            stateObjAsian[obj.State].push(parseInt(obj.Asian));
            stateObjNative[obj.State]=[]
            stateObjNative[obj.State].push(parseInt(obj.Native));
            stateObjBlack[obj.State]=[]
            stateObjBlack[obj.State].push(parseInt(obj.Black));
            stateObjPacific[obj.State]=[]
            stateObjPacific[obj.State].push(parseInt(obj.Pacific));
        }


        // return rObj;
    });
    stateObj={}
    whiteCountryWise=[]
    blackCountryWise=[]
    asianCountryWise=[]
    hispanicCountryWise=[]
    nativeCountryWise=[]
    pacificCountryWise=[]
    stateWiseRaceDistribution={}
    
    Object.keys(stateObjAsian).forEach(function (d) {
        allRaces=[]
        stateObjAsiansum=stateObjAsian[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjAsiansum/stateObjAsian[d].length)
        asianCountryWise.push(stateObjAsiansum/stateObjAsian[d].length)

        stateObjBlacksum=stateObjBlack[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjBlacksum/stateObjBlack[d].length)
        blackCountryWise.push(stateObjBlacksum/stateObjBlack[d].length)

        stateObjHispanicsum=stateObjHispanic[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjHispanicsum/stateObjHispanic[d].length)
        hispanicCountryWise.push(stateObjHispanicsum/stateObjHispanic[d].length)

        stateObjNativesum=stateObjNative[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjNativesum/stateObjNative[d].length)
        nativeCountryWise.push(stateObjNativesum/stateObjNative[d].length)


        stateObjPacificsum=stateObjPacific[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjPacificsum/stateObjPacific[d].length)
        pacificCountryWise.push(stateObjPacificsum/stateObjPacific[d].length)


        stateObjWhitesum=stateObjWhite[d].reduce(function (a,b){
            return (a+b)
        })
        allRaces.push(stateObjWhitesum/stateObjWhite[d].length)
        whiteCountryWise.push(stateObjWhitesum/stateObjWhite[d].length)








        var maxRace = allRaces.reduce(function(a, b) {
            return Math.max(a, b);
        });
        console.log(maxRace)
        var diversity
        if(maxRace>90){
            diversity=1
        }
        else if(maxRace>70 && maxRace<=90){
            diversity=2
        }
        else if (maxRace>50 && maxRace<=70){
           diversity=3
        }
        else{
            diversity=4
        }

        stateObj[d]=diversity
        stateWiseRaceDistribution[d]=allRaces


    })

    //Sending initial data to histogram

    


    populationValues=Object.values(stateObj)

    console.log(d3.max(populationValues))
    //Define quantize scale to sort data values into buckets of color
    var color = d3.scaleOrdinal()
        .domain([1,2,3,4])
        .range(['#edf8fb','#b2e2e2','#66c2a4','#238b45']);


    //Set input domain for color scale
    // color.domain([
    //     d3.min(data, function(d) { return d.value; }),
    //     d3.max(data, function(d) { return d.value; })
    // ]);

    //Load in GeoJSON data
    d3.json("us-states.json", function(json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        data=Object.keys(stateObj)
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i]

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(stateObj[data[i]]);

            var stateWiseRaceVal=stateWiseRaceDistribution[data[i]]

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    if(dataValue==1){
                        json.features[j].properties.diversity = "Very Low Diversity";
                    }
                    if(dataValue==2){
                        json.features[j].properties.diversity = "Low Diversity";
                    }
                    if(dataValue==3){
                        json.features[j].properties.diversity = "High Diversity";
                    }
                    if(dataValue==4){
                        json.features[j].properties.diversity = "Very High Diversity";
                    }

                    json.features[j].properties.stateWiseRace = stateWiseRaceVal


                    //Stop looking through the JSON
                    break;

                }
            }
        }


        console.log(json)


        //Bind data and create one path per GeoJSON feature
        svgState.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
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
                div .html("<b>"+ d.properties.name + "</b> <br/>" + d.properties.diversity)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");


            })
            .on("mouseout", function(d){
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            // .on("click", function (d) {
            //
            //     //drawHistogram([1,2,3,4,5,6],true)
            //
            //     // //Update all labels
            //     // svg.selectAll("text")
            //     //     .data(dataset)
            //     //     .transition()
            //     //     .delay(function (d, i) {
            //     //         return i / dataset.length * 1000;
            //     //     })
            //     //     .duration(500)
            //     //     .text(function (d) {
            //     //         return d;
            //     //     })
            //     //     .attr("x", function (d, i) {
            //     //         return xScale(i) + xScale.bandwidth() / 2;
            //     //     })
            //     //     .attr("y", function (d) {
            //     //         return h - yScale(d) + 14;
            //     //     });
            //
            // });


        drawHistogram([returnAvg(asianCountryWise),returnAvg(blackCountryWise),returnAvg(hispanicCountryWise),returnAvg(nativeCountryWise),returnAvg(pacificCountryWise),returnAvg(whiteCountryWise)])



        svgState.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate("+w/6+","+(h-((10/100)*h))+")");

        var legendLinear = d3.legendColor()
            .shapeWidth(80)
            .orient('horizontal')
            .scale(color)
            .labels(["Very Low diversity","","","Very High diversity",]);

        svgState.select(".legendLinear")
            .call(legendLinear);


    });

});
/**
 * Created by aditeyapandey on 1/22/18.
 */
