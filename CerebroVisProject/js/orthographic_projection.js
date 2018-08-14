
//Global Variables
var Segments={}
var globalDataStructures
var data1
var viewspecs

// Script to convert 3D projection to 2D projection ... orthographic projections.
function initializeView(){

    var fileName
    function dataFileName() {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        fileName=data.name;
    }
    dataFileName()
    promise=readdata(fileName)
    promise.then(function(data) {

    //console.log(data)

    //Define projection and view, view options are Normal,Symmetry and projection options are : back,top
     viewspecs=new viewSpec("back","Normal","arcsD")
     view=viewspecs.getView();
     projection=viewspecs.getProjection();


    //  //Define the global data access structures at one place and access them whererever they are required
     globalDataStructures=new defineGlobalAccessDataStructures(data,projection)
    //console.log(globalDataStructures)

    // //  //drawArteries(getDataForScatterPlot(result),getDataforArteries(result))
      drawBrainMap(globalDataStructures,viewspecs)
    //
    //  //  //Drawing dendrograms
     drawDendrogram(globalDataStructures,view)
   //
   // // //Rectangular Dendogram
  //drawphlyogram(globalDataStructures,view)

});
}

//This function should be called for switching between arc and rectangular dendorgrams, for arc dendogram treetype=arcsD and for rectangular dendrogram treetype=arcsR , it will always load normal view of dendograms

function changeTree(treeType){

    viewspecs.setTreeView(treeType)

    if(treeType=="arcsD"){
        drawDendrogram(globalDataStructures,viewspecs.getView())
    }
    else{
        drawphlyogram(globalDataStructures,viewspecs.getView())
    }

    // //  //drawArteries(getDataForScatterPlot(result),getDataforArteries(result))

}


//This function should be called for changing the brain projection, just pass the projection as brainview variable and it will work, den
function changeProjection(brainView){

    var data=globalDataStructures.fetchData()
    viewspecs.setProjection(brainView)

    globalDataStructures.changeProjection(data,viewspecs.getProjection())

    // //  //drawArteries(getDataForScatterPlot(result),getDataforArteries(result))
    drawBrainMap(globalDataStructures,viewspecs)
}

//This function should be called for switching between normal and symmetry view for both arc and rectangular dendorgrams, dendogramView=Symmetry and for arc dendogram treetype=arcsD and for rectangular dendrogram treetype=arcsR
function changeView(dendrogramView){
    if(dendrogramView=="Hybrid"){
        //globalDataStructures.setBloodBlowSymmetry(true)
    }

    var data=globalDataStructures.fetchData()

    viewspecs.setViewMode(dendrogramView)

    // //  //drawArteries(getDataForScatterPlot(result),getDataforArteries(result))
    if(viewspecs.getTreeView()=="arcsD"){
        drawDendrogram(globalDataStructures,viewspecs.getView())
        drawBrainMap(globalDataStructures,viewspecs)

    }
    else{
        drawphlyogram(globalDataStructures,viewspecs.getView())
        drawBrainMap(globalDataStructures,viewspecs)

    }

}

function addBloodFlowInSymmetry(val){

    globalDataStructures.setBloodBlowSymmetry(val)

    console.log("addflow")

    if(viewspecs.getTreeView()=="arcsD"){
        drawDendrogram(globalDataStructures,viewspecs.getView())
        drawBrainMap(globalDataStructures,viewspecs)

    }
    else{
        drawphlyogram(globalDataStructures,viewspecs.getView())
         drawBrainMap(globalDataStructures,viewspecs)

    }

}


initializeView()
