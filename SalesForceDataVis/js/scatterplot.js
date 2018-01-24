/**
 * Created by aditeyapandey on 1/23/18.
 */
//Width and height


function scatterPlot(id,attribute) {


    var w = 500;
    var h = 300;
    var padding = 50;

//Dynamic, random dataset
//     var dataset = [];											//Initialize empty array
    // var numDataPoints = 50;										//Number of dummy data points to create
    // var maxRange = Math.random() * 1000;						//Max range of new values
    // for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
    //     var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
    //     var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
    //     dataset.push([newNumber1, newNumber2]);					//Add new number to array
    // }
    d3.csv("acs2015_county_data.csv", function(data) {

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
            stateImmigrationRatio[d]=returnAvg(stateImmigration[d])*100
        })

        var statePoverty = {};

        var reformattedArray = data.map(function(obj) {

            if (obj.State in statePoverty){
                statePoverty[obj.State].push(parseInt(obj[attribute]));
            }
            else{
                statePoverty[obj.State]=[]
                statePoverty[obj.State].push( parseInt(obj[attribute]));
            }

        });

        var statePovertyRatio={}
        Object.keys(statePoverty).forEach(function (d) {
            statePovertyRatio[d]=returnAvg(statePoverty[d])
        })

        var dataset = [];


        Object.keys(statePovertyRatio).forEach(function (d) {
            dataset.push([statePovertyRatio[d],stateImmigrationRatio[d],d])
        })

        console.log(dataset)

        //Create scale functions
        var xScale = d3.scaleLinear()
            .domain([d3.min(dataset, function (d) {
                return d[0];
            })-(10/100)*(d3.min(dataset, function (d) {
                return d[0];
            })), d3.max(dataset, function (d) {
                return d[0];
            })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(dataset, function (d) {
                return d[1];
            })-(10/100)*(d3.min(dataset, function (d) {
                return d[1];
            })), d3.max(dataset, function (d) {
                return d[1];
            })])
            .range([h - padding, padding]);

        //Define X axis
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);

    //Define Y axis
            var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5);



    //Create SVG element
            var svg = d3.select("#"+id)
                .append("svg")
                .attr("width", w-padding)
                .attr("height", h);

//Create circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d[0]);
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
            .attr("r", 4)
            .attr("fill","#238443")
            .on("mouseover",function (d) {
                d3.selectAll("."+d[2].replace(/\s/g, '')).style("stroke","black").style("stroke-width","3")

                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div .html("<b>"+ d[2] + "</b> <br/>" + attribute +": "+d[0].toFixed(2)+"%" +"<br/>" +"Immigration: "+d[1].toFixed(2)+"%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");


            })
            .on("mouseout",function (d) {
                d3.selectAll("."+d[2].replace(/\s/g, '')).style("stroke","").style("stroke-width","0")

                div.transition()
                    .duration(500)
                    .style("opacity", 0);

            });;

//Create X axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
            //.text("Poverty in %");

//Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis)


        svg.append("text")
            .attr("transform",
                "translate(" + (w/2) + " ," +
                (h -padding/4) + ")")
            .style("text-anchor", "middle")
            .text(attribute+" in %");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Immigration in %");


//On click, update with new data
        d3.select("p")
            .on("click", function () {

                //New values for dataset
                var numValues = dataset.length;						 		//Count original length of dataset
                var maxRange = Math.random() * 1000;						//Max range of new values
                dataset = [];  						 				 		//Initialize empty array
                for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
                    var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
                    var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
                    dataset.push([newNumber1, newNumber2]);					//Add new number to array
                }

                //Update scale domains
                xScale.domain([0, d3.max(dataset, function (d) {
                    return d[0];
                })]);
                yScale.domain([0, d3.max(dataset, function (d) {
                    return d[1];
                })]);

                //Update all circles
                svg.selectAll("circle")
                    .data(dataset)
                    .transition()
                    .duration(1000)
                    .attr("cx", function (d) {
                        return xScale(d[0]);
                    })
                    .attr("cy", function (d) {
                        return yScale(d[1]);
                    });

            });

    })

}