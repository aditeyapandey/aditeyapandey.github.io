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


function drawBrainMap(globalData,viewSpec)
 {
      d3.select(".chart").remove()
      var data= globalData.fetchDataForScatterPlot();
      var arteries=globalData.fetchDataForArteries();
      var treeData=globalData.fetchtreeData();
      var nodes = d3.hierarchy(treeData).descendants();
      var bloodFlow=globalData.fetchBloodFlowSymmetry()

      console.log(arteries)

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
        console.log(radi)
        console.log(d3.min(radi, function(d) { return d;}))

        var radius= d3.scaleLinear()
                  .domain([d3.min(radi, function(d) { return d; }), d3.max(radi, function(d) { return d; })])
                  .range([ 1, 10 ]);

        var color=d3.scaleOrdinal().domain([0,2,3,4,5,6,7]).range(['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d'])

 

         // Define the line
        var line = d3.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); });


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

        //We are going to append paths one at a time and create an animation to view the transition
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
                  if(bloodFlow) {
                      return colorEncodingForBloodFlow(arteries[index].bloodFlow , arteries[index].depth)
                      // if (arteries[index].bloodFlow == undefined) {
                      //     return '#1b9e77'
                      // }
                      // else {
                      //     return d3.interpolateRdYlBu(arteries[index].bloodFlow / (15000 / (Math.pow(2, arteries[index].depth))))
                      // }
                  }
                  else{
                      return colorSymmetry(arteries[index].type)
                      //return color(arteries[index].type)
                  }

                  })
              .attr("stroke-width", function(){return radius(arteries[index].radius)})
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
          }

            drawArteries(index)

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


    var temptree=treeData1


   // var extractRoot=treeData.children[0].children[0].children[0].children[1].children[0]
    //treeData.children[0].children[0].children[0].children[1].children[0]=[];




// set the dimensions and margins of the diagram
    var margin = {top: 40, right: 90, bottom: 50, left: 90},
        width = $('#dendrogram').innerWidth() - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([width, height]);

    var nodes={}

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

        nodes = treemap(nodes1);
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
        //bloodFlow = true
        // console.log(treeData)
    }
else{
    nodes = d3.hierarchy(treeData);

    //nodes = treemap(nodes);
}

//Color scale
    var color = d3.scaleOrdinal().domain([0, 2, 3, 4, 5, 6, 7]).range(['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'])



//Radius scale
    radi=result.map(function(result){
        return result.radius
    })
    var radius= d3.scaleLog()
        .domain([d3.min(radi, function(d) { return d; }), d3.max(radi, function(d) { return d; })])
        .range([ 1, 8 ]);

// Creating a toggle variable to control toggling of branches
    var toggleBranches=false;
    var toggleSegment=false;


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#dendrogram").append("svg").attr("class","chartTree")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

// adds the links between the nodes
// var linkBackGround = g.selectAll(".linkBackGround")
//         .data( nodes.descendants().slice(1))
//         .enter().append("path")
//         .attr("class", "linkBackGround")
//         .attr("d", function(d) {
//             return "M" + d.x + "," + d.y
//                 + "C" + d.x + "," + (d.y + d.parent.y) / 2
//                 + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
//                 + " " + d.parent.x + "," + d.parent.y;
//         })
//         .on("click", function(d){
//             highLightSegment(d)
//         });

    var mainNodes=nodes;
    treemapVis(nodes)
    view="Symmetry"
    // setTimeout(function() {
    //     treemapVis(nodes1.descendants())
    // }, 1500);
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

        console.log(descendants)


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
                //Color Scale for brain parts

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
            // .on("click", function(d){
            //     treemapVis(createTree(d.data.type,arterylabelToPass))
            //     //selectAllChild(d);
            //
            // })
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

            });

            // .on("mouseover", function (d) {
            //     d3.selectAll("#linkFG").style("stroke", "darkgray")
            //     d3.select(this).attr("id","linkFGC").style("stroke", "")
            //     highLightSegment(d)
            // })
            // .on("mouseout", function (d) {
            //     d3.selectAll("#linkFG").style("stroke", "")
            //     d3.selectAll("#linkFGC").attr("id","linkFG").style("stroke", "")
            //     d3.selectAll("#pathBM").style("stroke", "")
            //     d3.selectAll("#pathBMC").attr("id","pathBM").style("stroke", "")
            //
            // });

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

    }



    function selectAllChild(d){
        if(!toggleBranches)
        {
            treemapVis(d)
            console.log(selectedSegments)
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

        console.log(allchilds)

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

    var treeData1={}
    var branchdata=globalDataStructure.fetchBranchData()
    var arteryLabels=globalDataStructure.fetchArteryLabelsRectangular()

    console.log(branchdata)
    console.log(arteryLabels)
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



     data=d3.phylogram.build('#dendrogram', treeData1, globalDataStructure,view,{
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
function colorSymmetry(type)
{
    var color = d3.scaleOrdinal().domain([0, 2, 3, 4, 5, 6, 7]).range(['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'])
    return color(type)

}

