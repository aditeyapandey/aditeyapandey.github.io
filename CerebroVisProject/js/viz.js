/*
Visualizations are not adaptive to screen size, they will only look good on screen sizes more than 20 inches
ToDo  : Make visualizations adaptive, Find a good way to represent labels
Isolation mode : A mode where all the visualizations
Bifurcations are not arteries, we should have arteries display
make the pop out effect different for the currently clicked node
Two way linking datastructures for visualization
 */
//Global Variables
var selectedSegments=[]

//ToDo: Persist the selection across brain view

function drawBrainMap(globalData,viewSpec)
 {
      d3.select(".chart").remove()
      //var data= globalData.fetchDataForScatterPlot();
      var arteries=globalData.fetchDataForArteries();
      var treeData=globalData.fetchtreeData();
      var nodes = d3.hierarchy(treeData).descendants();
      var bloodFlow=globalData.fetchBloodFlowSymmetry()
      var basilarBranchids=globalData.fetchBasilarBranchid();

     var leftPCA=globalData.fetchLeftPCA()
     var rightPCA=globalData.fetchRightPCA()


     // var basilar=[145, 146, 147,46,47]


     // basilar.forEach(function(d){
     //     basilarBranchids.push(d)
     // })



      var margin = {top: 20, right: 20, bottom: 20, left: 20}
          , width = $('#brainmap').innerWidth() - margin.left - margin.right
          , height = $('#brainmap').innerWidth() - margin.top - margin.bottom;

        var x = d3.scaleLinear()
                  .domain([d3.min(arteries, function(d) { return d.x1; }), d3.max(arteries, function(d) { return d.x2 })])
                  .range([ 0, width ]);

        var y = d3.scaleLinear()
                .domain([d3.min(arteries, function(d) { return d.y1; }), d3.max(arteries, function(d) { return d.y1; })])
                .range([ height, 0 ]);

        radi=arteries.map(function(artery){
          return artery.radius
        })

        var minRadius= d3.min(radi, function(d) {return d; }) == 0 ? 0.3 : d3.min(radi, function(d) {return d; })

        var radius= d3.scaleLinear()
                  .domain([minRadius, d3.max(radi, function(d) { return d; })])
                  .range([ 1, 10 ]);


     var color=d3.scaleOrdinal().domain([0,2,3,4,5,6,7]).range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d'])

 

         // Define the line
        var line = d3.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })

        var chart = d3.select('#brainmap')
           .append('svg:svg')
           .attr('width', width + margin.right + margin.left)
           .attr('height', height + margin.top + margin.bottom)
           .attr('class', 'chart')

            var main = chart.append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
           .attr('width', width)
           .attr('height', height)
           .attr('class', 'main')

            // draw the x axis
           //  var xAxis = d3.axisBottom(x)
           //
           //   // svg.append("path")
           //   //    .attr("class", "line")
           //   //    .attr("d", valueline(data));
           //
           //  main.append('g')
           // .attr('transform', 'translate(0,' + height + ')')
           // .attr('class', 'main axis date')
           // .call(xAxis);

        ////We are going to append paths one at a time and create an animation to view the transition
        //viewSpec.getView()=="Normal"
          index=0


     function drawArteries(index){
            data=[[arteries[index].x1,arteries[index].y1],[arteries[index].x2,arteries[index].y2]]
            path=main.append("path")
            .datum(data)
              .attr("fill", "none")
                .attr("class","C_"+arteries[index].nodeid)
                .attr("id","pathBM")
              //  .attr("stroke","steelblue")
              .attr("stroke", function(){
                  if(bloodFlow) {return colorEncodingForBloodFlow(arteries[index].bloodFlow , arteries[index].depth)
                      // if (arteries[index].bloodFlow == undefined) {
                      //     return '#1b9e77'
                      // }
                      // else {
                      //     return d3.interpolateRdYlBu(arteries[index].bloodFlow / (15000 / (Math.pow(2, arteries[index].depth))))
                      // }
                  }
                  else{

                      var PC1array=leftPCA.concat(rightPCA)
                      if(PC1array.indexOf(index)!=-1){
                            return "cornflowerblue"
                        }
                           return colorSymmetry(arteries[index].type)
                       }
                      //return color(arteries[index].type)
                  })

               .attr("stroke-width", function(){return radius(arteries[index].radius)})
              //   .attr("opacity",function(){
              //       if(arteries[index].type==2 ||arteries[index].type==3||arteries[index].type==4||arteries[index].type==5||arteries[index].type==6||arteries[index].type==7){
              //           return 0
              //       }
              //       else{
              //           return 1
              //       }
              //           })
              .attr("d", line);

                var totalLength = path.node().getTotalLength();

          // Set Properties of Dash Array and Dash Offset and initiate Transition
             path
              .attr("stroke-dasharray", totalLength + " " + totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition() // Call Transition Method
              .duration(0) // Set Duration timing (ms)
              .ease(d3.easeLinear) // Set Easing option
              .attr("stroke-dashoffset", 0)
              .on("end", function(){
              index=index+1;
              if(index!=arteries.length){
              drawArteries(index)
              }
              else{
                //alert("done")
              }
            });



         basilarBranchids.forEach(function(d){
             d3.select(".C_"+d).attr("stroke","sandybrown").attr("opacity",1)
         })

     }

            drawArteries(index)

     //The first line is hardcoded




            // draw the y axis
           //  var yAxis = d3.axisLeft(y)
           //
           //
           //  main.append('g')
           // .attr('transform', 'translate(0,0)')
           // .attr('class', 'main axis date')
           // .call(yAxis);

}



function drawDendrogram(globalDataStructure,view) {


    d3.select(".chartTree").remove()


    var treeData=globalDataStructure.fetchtreeData();
    var treeData1=globalDataStructure.fetchtreeData();
    var result=globalDataStructure.fetchData()
    var arteryLabels=globalDataStructure.fetchArteryLabels()
    var bloodFlow=globalDataStructure.fetchBloodFlowSymmetry()
    var hybridTreeData=globalDataStructure.fetchHybridData()
    var arterylabelToPass=jQuery.extend(true, {}, arteryLabels);
    var treeData2=globalDataStructure.fetchBasilar()

    var globalTempStrokeWidth=-1;
    var valueofMaxRadius

    var temptree=treeData1


   // var extractRoot=treeData.children[0].children[0].children[0].children[1].children[0]
    //treeData.children[0].children[0].children[0].children[1].children[0]=[];




// set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 250, left: 90},
        width = $('#dendrogram').innerWidth() - margin.left - margin.right,
        height = (3/4)*($('#dendrogram').innerWidth()) - margin.top - margin.bottom;


// declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([width, height]);

    var treemap2=d3.tree().size([width/4,height/5])

    var nodes={}
    //This var stores the temporary data to make an independent tree, an independent tree will be used later to visualize the two branches coming out of basilar arteries
    var nodes1={}

//Code to compare symmetry
if(view =="Symmetry") {
    leftSideB1 = {
        name: "Root LPCA and LACA",
        children: [{name: "LPCA", children: arteryLabels["LPCA"].children}, {
            name: "LACA",
            children: arteryLabels["LACA"].children
        }]
    }
    leftSideB2 = {
        name: "Root LSB1 and LMCA",
        children: [leftSideB1, {name: "LMCA", children: arteryLabels["LMCA"].children}]
    }
    rightSideB1 = {
        name: "Root LPCA and LACA",
        children: [{name: "RACA", children: arteryLabels["RACA"].children}, {
            name: "RPCA",
            children: arteryLabels["RPCA"].children
        }]
    }
    rightSideB2 = {
        name: "Root RSB1 and RMCA",
        children: [{name: "RMCA", children: arteryLabels["RMCA"].children}, rightSideB1]
    }

    treeData1 = {name: "Test", children: [leftSideB2, rightSideB2]}

//  assigns the data to a hierarchy using parent-child relationships
    var nodes1 = d3.hierarchy(treeData1)

    nodes = treemap(nodes1);

}
   else if(view=="Hybrid") {

        var nodes1 = d3.hierarchy(hybridTreeData)

        // nodes = treemap(nodes1);
        // treeData = treeData.children[0].children[0].children[0]
        // temp1 = treeData.children[0]
        // temp2 = treeData.children[1]
        // treeData.children[0] = temp2
        // treeData.children[1] = temp1
        // //treeData.children.push(temptree.children[0].children[0])
        //
        // treetemp1 = treeData.children[0]
        // child1 = treetemp1.children[0].children[1].children[0]
        // child2 = treetemp1.children[0].children[1].children[1]
        // treetemp1.children[0].children[1].children[0] = child2
        // treetemp1.children[0].children[1].children[1] = child1
        // treetemp2 = treeData.children[1]
        // branch3 = temptree.children[0].children[0].children[1]
        // branch1 = temptree.children[0].children[1]
        // branch3 = temptree.children[0].children[0].children[1]
        //
        // branch2 = {
        //     name: temptree.children[0].name,
        //     bloodFlow: temptree.children[0].bloodFlow,
        //     length: temptree.children[0].length,
        //     childs: temptree.children[0].childs,
        //     children: [branch3, branch1]
        // }
        // temptree.children[0] = branch2
        // console.log(temptree)
        // console.log(treeData)
        //
        // treeData = {name: "New Tree", children: [treetemp1, treetemp2, temptree]}
        // bloodFlow = true
        // console.log(treeData)
    }
else{
    nodes = d3.hierarchy(treeData)

    //This step sorts two branches based on the height - Height based sorting is used to send the branches far away
    nodes.children[0].sort(function(a, b) { return b.height - a.height  });
    nodes.children[1].sort(function(a, b) { return b.height - a.height  });
    nodes.children[2].sort(function(a, b) { return a.height - b.height  });
    nodes.children[3].sort(function(a, b) { return a.height - b.height  });

    nodes1=d3.hierarchy(treeData2)


}

//Color scale
    var color = d3.scaleOrdinal().domain([0, 2, 3, 4, 5, 6, 7]).range(['#1b9e77', 'plum', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'])



//Width of arteries
    radi=result.map(function(result){
        return result.radius
    })

    var minRadius= d3.min(radi, function(d) {return d; }) == 0 ? 0.3 : d3.min(radi, function(d) {return d; })

    var radius= d3.scaleLog().domain([minRadius, (valueofMaxRadius = d3.max(radi, function(d) { return d; }))]).range([ 1, 11 ]);

    //Assiging max radius to the variable to give user equal ability to select each artery
    valueofMaxRadius=radius(valueofMaxRadius);


// End Width of the arteries

// Creating a toggle variable to control toggling of branches
    var toggleBranches=false;
    var toggleSegment=false;

// Toggle ends here

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#dendrogram").append("svg").attr("class","chartTree").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom)

    g1= svg.append("g")

    g = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");


    var mainNodes=nodes;
    treemapVis(nodes)
    view="Symmetry"

    function treemapVis(nodes) {

        //Clear the selected segments list
        selectedSegments=[]

        var  nodesInFn = treemap(nodes);

        if(nodesInFn.descendants().length==1)
        {
            var descendants = nodesInFn.descendants()
        }
        else
        {
            var descendants = nodesInFn.descendants().slice(1)

        }

        //Selecting the segments to highlight branches in brain
        descendants.forEach(function(d){
            findSegmentsInnTree(d)

        })


        g.append("path").attr("id","anteriorComm")

        var link = g.selectAll(".linkForeGround")
            .data(descendants, function(d) {
                return d.data.name; });

        //enter
        link
            .enter().append("path")
            .attr("class", "linkForeGround")
            .attr("id","linkFG")
            .attr("d", function (d) {
                return "M" + d.x + "," + (height - d.y)
                    + "C" + d.x + "," + ((height - d.y) + (height - d.parent.y)) / 2
                    + " " + d.parent.x + "," + ((height - d.y) + (height - d.parent.y)) / 2
                    + " " + d.parent.x + "," + (height - d.parent.y);
            })
            .attr("stroke", function (d) {

                if(d.data.name==1000){
                    return "#333"
                }


                //Color scale for blood flow
                if(bloodFlow) {
                    return colorEncodingForBloodFlow(d.data.bloodFlow,d.depth)
                    // if (d.data.bloodFlow == undefined) {
                    //     return '#1b9e77'
                    // }
                    // else {
                    //     return d3.interpolateRdYlBu(d.data.bloodFlow / (15000 / (Math.pow(2, d.depth))))
                    // }
                }
                else{
                   return colorSymmetry(d.data.type)
                   // return color(d.data.type)
                 }

            })
            .attr("opacity",function(d,i){
                if(i==0 || i==3){
                    return 0;
                }
                else{
                    return 1;
                }
            })
            .attr("stroke-width", function(d){
                if(d.data.childs == undefined){
                    var segments=[0.5]
                }
                else{
                    var segments=d.data.childs
                }

                var radiusLengths=[];
                var radiusSum=0
                segments.forEach(function(d){
                    if(result[d] == undefined){
                        radiusLengths.push(0.5)
                        radiusSum= radiusSum + 0.5
                    }
                    else{
                        radiusLengths.push(result[d].radius)
                        radiusSum= radiusSum + result[d].radius
                    }

                })
                return radius(radiusSum/radiusLengths.length)
            })
            .on("click", function (d) {
                d3.selectAll("#linkFG").style("stroke", "darkgray")
                d3.select(this).attr("id","linkFGC").style("stroke", "")
                highLightSegment(d)
            })
            .on("dblclick", function (d) {
                d3.selectAll("#linkFG").style("stroke", "")
                d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
                d3.selectAll("#pathBM").style("stroke", "")
                d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")

            })
            .on("mouseover", function (d) {
                //Store the stroke width in a global variable
                globalTempStrokeWidth = d3.select(this).attr("stroke-width");
                console.log(Math.log(globalTempStrokeWidth))
                //Magnify the stroke width
                d3.select(this).attr("stroke-width", valueofMaxRadius-2);

            })
            .on("mouseout", function (d) {

                 //bring the stroke width to normal
                d3.select(this).attr("stroke-width", globalTempStrokeWidth);
                //unset the value in global value
                globalTempStrokeWidth=-1

            });

        // update
        link
            .attr('d', function (d) {
                return "M" + d.x + "," + (height - d.y)
                    + "C" + d.x + "," + ((height - d.y) + (height - d.parent.y)) / 2
                    + " " + d.parent.x + "," + ((height - d.y) + (height - d.parent.y)) / 2
                    + " " + d.parent.x + "," + (height - d.parent.y);
            })
        // exit
        link.exit().remove();

        //This function creates the base template
        templateDrawing(g,globalDataStructure)

    }

//Todo: The template layout needs to be fixed!
    function templateDrawing(g,globalDataStructure)
    {

        var leftICChildNodes=globalDataStructure.fetchLeftICChildNodes()
        var rightICChildNodes=globalDataStructure.fetchRightICChildNodes()
        var leftPCA=globalDataStructure.fetchLeftPCA()
        var rightPCA=globalDataStructure.fetchRightPCA()

        //Template drawing
        var withMxycordsofLeftCart1
        var secondxycordsofLeftCart1
        var withMxycordsofRightCart2
        var secondxycordsofLeftCart2
        var basilarCoordinates
        var connectingArtery1x
        var connectingaretry1terminal
        var connectingArtery2x
        var startCoordsX
        var startCoordsY
        var startCoordsXC2
        var startCoordsYC2

        //Connecting arteries coordinates
        var connecting1terminalx
        var connecting1terminaly
        var connecting2terminalx
        var connecting2terminaly

        d3.selectAll(".linkForeGround").each( function(d, i){
            if(i==0){
                path=d3.select(this).attr("d")
                withMxycordsofLeftCart1=path.split(",")[0]
                connectingArtery1x=withMxycordsofLeftCart1.split("M")[1]
                secondxycordsofLeftCart1=parseFloat(path.split(",")[1].split("C")[0])
            }
            if(i==2){
                path=d3.select(this).attr("d")
                terminatingCoords=path.split(",")[3]
                reverseCoordinates = terminatingCoords.split(" ")[1]+","+(parseFloat(terminatingCoords.split(" ")[0])+20)
                connectingaretry1terminal=[terminatingCoords.split(" ")[1],(parseFloat(terminatingCoords.split(" ")[0])+20)]
                basilarCoordinates=reverseCoordinates

                //Finding the coordinates for connecting artery2 terminal
                startCoords=path.split(",")[0]
                connecting2terminalx=startCoords.split("M")[1]
                startCoords=path.split(",")[1]
                connecting2terminaly=startCoords.split("C")[0]

            }
            if(i==3){
                path=d3.select(this).attr("d")
                withMxycordsofRightCart2=path.split(",")[0]
                connectingArtery2x=withMxycordsofRightCart2.split("M")[1]
                secondxycordsofLeftCart2=parseFloat(path.split(",")[1].split("C")[0])
            }
            if(i==1){
                path=d3.select(this).attr("d")
                startCoords=path.split(",")[0]
                connecting1terminalx=startCoords.split("M")[1]
                startCoords=path.split(",")[1]
                connecting1terminaly=startCoords.split("C")[0]

            }
            if(i==5){
                path=d3.select(this).attr("d")
                startCoords=path.split(",")[0]
                startCoordsX=startCoords.split("M")[1]
                startCoords=path.split(",")[1]
                startCoordsY=startCoords.split("C")[0]
            }
            if(i==10){
                path=d3.select(this).attr("d")
                startCoords=path.split(",")[0]
                startCoordsXC2=startCoords.split("M")[1]
                startCoords=path.split(",")[1]
                startCoordsYC2=startCoords.split("C")[0]
            }
        })

        var leftCarotid=withMxycordsofLeftCart1+","+secondxycordsofLeftCart1+"c11.495818421500019,15.117791044599983,11.495818421500019,60.8507758499,0,75.96856689449999s-83.22354855109998,-18.58939262529998,-99.9038848877,0s-17.279047696799978,69.47990214379999,-1.040664672799977,88.45657348630004"
        var rightCarotid=withMxycordsofRightCart2+","+secondxycordsofLeftCart2+"c-13.17512037710003,15.149351535500017,-12.521224094900163,65.49921218819998,1.042877197199914,80.30130004879999s74.78071809649998,-18.222273784199956,90.7300415039,-2.085754394499986s17.22943143340001,68.62079861579996,2.0857543946000305,85.5156860352"
        var basilar="M"+basilarCoordinates+"a267.3130186639,267.3130186639,0,0,1,-1.0406654344000117,112.39186691309996"
        //var c1artery=withMxycordsofLeftCart1+","+secondxycordsofLeftCart1+"c283.8059692792,554.8059692792 533,597 533,497"

        var c1artery="M"+connectingArtery1x+","+secondxycordsofLeftCart1+"C"+connectingArtery1x+","+(secondxycordsofLeftCart1+50)+" "+connecting1terminalx+","+(parseFloat(connecting1terminaly)+30) +" "+connecting1terminalx+","+(connecting1terminaly)
        var c2artery="M"+connectingArtery2x+","+secondxycordsofLeftCart2+"C"+connectingArtery2x+","+(secondxycordsofLeftCart2+50)+" "+connecting2terminalx+","+(parseFloat(connecting2terminaly)+30) +" "+connecting2terminalx+","+(connecting2terminaly)
        var anteriorCommunicatingArtery

        var anteriorCommunicatingArtery="M"+startCoordsX+","+startCoordsY+"C"+startCoordsX+","+(startCoordsY-20)+" "+startCoordsXC2+","+(startCoordsYC2-20)+" "+startCoordsXC2+","+startCoordsYC2



        g.append("path").attr("class", "linkForeGround")
            .attr("id","linkFG").attr("d",basilar).attr("stroke","sandybrown").attr("stroke-width", 10).attr("fill", "none")


        g.append("path").attr("class", "linkForeGround")
            .attr("id","linkFG")
            .attr("d",c1artery).attr("stroke","cornflowerblue").attr("stroke-width", 5).attr("fill", "none").on("click",function(){
            console.log("left PCA")
            var d={}
            d.data={}
            d.data.childs=leftPCA
            //d.data.childs=[148, 149, 150, 151, 152, 153, 154, 155, 156]
            d3.selectAll("#linkFG").style("stroke", "darkgray")
            d3.select(this).attr("id","linkFGC").style("stroke", "")
            highLightSegment(d)
        }).on("dblclick", function (d) {
            d3.selectAll("#linkFG").style("stroke", "")
            d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
            d3.selectAll("#pathBM").style("stroke", "")
            d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")

        });;

        g.append("path").attr("class", "linkForeGround")
            .attr("id","linkFG").attr("d",c2artery).attr("stroke","cornflowerblue").attr("stroke-width", 5).attr("fill", "none").on("click",function(){
                console.log("Right PCA")
            var d={}
            d.data={}
            d.data.childs=rightPCA
            // d.data.childs=[  38, 39, 40, 41, 42, 43, 44]
            d3.selectAll("#linkFG").style("stroke", "darkgray")
            d3.select(this).attr("id","linkFGC").style("stroke", "")
            console.log()
            highLightSegment(d)
        }).on("dblclick", function (d) {
            d3.selectAll("#linkFG").style("stroke", "")
            d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
            d3.selectAll("#pathBM").style("stroke", "")
            d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")

        });

        d3.select("#anteriorComm").attr("d",anteriorCommunicatingArtery).attr("stroke","silver").attr("stroke-width", 5).attr("fill", "none").style("opacity","0.7").style("stroke-dasharray","2px")


        //Left IC data should go here
        g.append("path").attr("class", "linkForeGround")
            .attr("id","linkFG").attr("d", leftCarotid)
            .attr("stroke", "lightcoral").attr("stroke-width", 10).attr("fill", "none").on("click",function(){
            var d={}
            d.data={}
            d.data.childs=leftICChildNodes
            // d.data.childs=[157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,194,195]

            d3.selectAll("#linkFG").style("stroke", "darkgray")
            d3.select(this).attr("id","linkFGC").style("stroke", "")
            highLightSegment(d)
        }).on("dblclick", function (d) {
            d3.selectAll("#linkFG").style("stroke", "")
            d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
            d3.selectAll("#pathBM").style("stroke", "")
            d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")

        });

        //Right IC data should go here
        g.append("path").attr("d",rightCarotid).attr("class", "linkForeGround").attr("id","linkFG")
            .attr("stroke", "lightcoral").attr("stroke-width", 10).attr("fill", "none").on("click",function(){
                console.log("rightCarotid")
                var d={}
                d.data={}
                d.data.childs=rightICChildNodes

                 d3.selectAll("#linkFG").style("stroke", "darkgray")
                 d3.select(this).attr("id","linkFGC").style("stroke", "")
                highLightSegment(d)
            }).on("dblclick", function (d) {
            d3.selectAll("#linkFG").style("stroke", "")
            d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
            d3.selectAll("#pathBM").style("stroke", "")
            d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")

        });

    }

    function selectAllChild(d){
        if(!toggleBranches)
        {
            treemapVis(d)
            //drawBrainMap(globalDataStructure)
            toggleBranches=true
        }
         else
        {
            treemapVis(nodes)
            //drawBrainMap(globalDataStructure)

            toggleBranches=false
        }
    }

    function highLightSegment(d)
    {
        d3.selectAll("#pathBM").style("stroke", "darkgray")

        segmentComponents=d.data.childs;
        segmentComponents.forEach(function (d) {
            d3.select(".C_"+d).attr("id","pathBMC").style("stroke", "")

        })
    }
    function unHighLightSegment(d) {
        segmentComponents=d.data.childs;
        segmentComponents.forEach(function (d) {
            d3.select(".C_"+d).style("stroke", "")

        })
    }
    function selectBrainBranchesByType(type1,type2){

        var  tempNodes = treemap(mainNodes);
        desc=tempNodes.descendants();
        var allchilds=[]
         desc.forEach(function(d){
           if(d.data.type != undefined){
               if(d.data.type==type1 || d.data.type==type2){
                   childs=d.data.childs
                   childs.forEach(function(d){
                       allchilds.push(d)
                   })
               }
           }
         })


        d3.selectAll("#pathBM").style("stroke", "darkgray")
        allchilds.forEach(function (d) {
            d3.select(".C_"+d).attr("id","pathBMC").style("stroke", "")

        })
    }

    function unselectBrainBranchesbyType()
    {
        d3.selectAll("#pathBM").style("stroke", "")
        d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")
    }

    function createTree(type,arteryLabels)
    {
        var selectedBranches=[]

        if(type==3 || type ==4)
        {
            selectedBranches.push('LPCA')
            selectedBranches.push('RPCA')
            selectBrainBranchesByType(3,4)
        }
        else if(type==7 || type==6){
            selectedBranches.push('LMCA')
            selectedBranches.push('RMCA')
            selectBrainBranchesByType(7,6)

        }
        else{
            selectedBranches.push('LACA')
            selectedBranches.push('RACA')
            selectBrainBranchesByType(2,5)

        }

        if(!toggleBranches)
        {
            var treeData1 = {name: "Test", children: [arteryLabels[selectedBranches[0]], arteryLabels[selectedBranches[1]]]}
            var nodes1 = d3.hierarchy(treeData1)
            var nodes = treemap(nodes1);
            toggleBranches=true
            return nodes
        }
        else
        {
            toggleBranches=false
            unselectBrainBranchesbyType()


            return mainNodes
        }

    }

}



function drawphlyogram(globalDataStructure,view){

    d3.select(".chartTree").remove()

   // var treeData1={}
    var branchdata=globalDataStructure.fetchBranchData()
    var arteryLabels=globalDataStructure.fetchArteryLabelsRectangular()

    //console.log(branchdata)
    //Test Code
    var tData=globalDataStructure.fetchCopyBranchData()

   // console.log(tData)
   // console.log(globalDataStructure.fetchCopyBranchData())
    //branchdata=globalDataStructure.fetchCopyBranchData();
    //

    var testVar=globalDataStructure.fetchtreeData()

    if(view =="Symmetry") {

        leftSideB1 = {
            name: "Root LPCA and LACA",
            branchset: [{name: "LPCA", branchset: arteryLabels["LPCA"].branchset}, {
                name: "LACA",
                branchset: arteryLabels["LACA"].branchset
            }]
        }
        leftSideB2 = {
            name: "Root LSB1 and LMCA",
            branchset: [leftSideB1, {name: "LMCA", branchset: arteryLabels["LMCA"].branchset}]
        }
        rightSideB1 = {
            name: "Root LPCA and LACA",
            branchset: [{name: "RACA", branchset: arteryLabels["RACA"].branchset}, {
                name: "RPCA",
                branchset: arteryLabels["RPCA"].branchset
            }]
        }
        rightSideB2 = {
            name: "Root RSB1 and RMCA",
            branchset: [{name: "RMCA", branchset: arteryLabels["RMCA"].branchset}, rightSideB1]
        }
        treeData1 = {name: "Test", branchset: [leftSideB2, rightSideB2]}
    }
    else{
        treeData1=branchdata
    }


    //When data goes to phyllogram function that does something wrong with the dataset
     data=d3.phylogram.build('#dendrogram', globalDataStructure.treeData1, globalDataStructure,view,{
        width: $('#dendrogram').innerWidth(),
        height: 800,
        skipLabels: true,
        skipTicks: true

    });




}




// adds each node as a group
/*var node = g.selectAll(".node")
 .data(descendants)
 .enter().append("g")
 .attr("class", function (d) {
 return "node" +
 (d.children ? " node--internal" : " node--leaf");
 })
 .attr("transform", function (d) {
 return "translate(" + d.x + "," + (height - d.y) + ")";
 })*/


// adds the circle to the node
/*node.append("circle")
 .attr("r", 0)
 .attr("stroke", "steelblue")
 //Adding on click event on the node to highlight the corresponding parts in the brain
 .on("click", function (d) {
 d3.select(this).attr("stroke", "red")
 highLightSegment(d)
 })
 .on("dblclick", function (d) {
 d3.select(this).attr("stroke", "steelblue")
 unHighLightSegment(d)
 });*/


// adds the text to the node
// node.append("text")
//   .attr("dy", ".35em")
//   .attr("y", function(d) { return d.children ? -20 : 20; })
//   .style("text-anchor", "middle")
//   .text(function(d) { return d.data.type; });

function findSegmentsInnTree(nodes)
{

    if(nodes.data.childs != undefined){
    var segments=nodes.data.childs
        segments.forEach(function(d){
            selectedSegments.push(d)
        })
    }


}

function colorEncodingForBloodFlow(flow,depth)
{
        if (flow == undefined) {
            return '#1b9e77'
        }
        else {
            if(flow==0){return "darkgrey"}
            else{
                return d3.interpolateOrRd(flow/1000)
            }

          //  return d3.interpolateRdYlBu(flow / (15000 / (Math.pow(2,depth))))
        }

}

// marking of the arteries
// 0=Basilar
// 2=RACA
// 3=RMCA
// 4=LMCA
// 5=LACA
// 6=RPCA
// 7=LPCA

function colorSymmetry(type)
{
    var color = d3.scaleOrdinal().domain([0, 2, 3, 4, 5, 6, 7]).range(['lightcoral', 'darkblue', '#B22222', 'lightseagreen', 'slateblue', 'gold', 'forestgreen'])
    return color(type)

    //'#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'
    //'lightcoral', 'darkblue', 'firebrickred', 'lightseagreen', 'slateblue', 'gold', 'forestgreen'
}

