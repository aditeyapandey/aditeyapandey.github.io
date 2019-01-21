
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
    promise=readdata(fileName);
    promise.then(function(data) {

    //console.log(data)

    //Define projection and view, view options are Normal,Symmetry and projection options are : back,top
     viewspecs=new viewSpec("back","Normal","arcsD")
     view=viewspecs.getView();
     projection=viewspecs.getProjection();


    //  //Define the global data access structures at one place and access them whererever they are required
     globalDataStructures=new defineGlobalAccessDataStructures(data,projection)

     drawBrainMap(globalDataStructures,viewspecs, 'brainmap', globalDataStructures.fetchDataForArteries(), globalDataStructures.fetchArteryWidth(),1, globalDataStructures.fetchArteryStorageByIndex())
     drawLabelsBrainMap("back","brainmap","#252525")

    //Drawing dendrograms
    drawDendrogram(globalDataStructures,view)

    //Testing the arcs in the main visualization area

    //drawBrainMap(globalDataStructures,viewspecs, 'dendrogram', globalDataStructures.fetchDataForCOW(), globalDataStructures.fetchArteryWidth(),3)

    });
}




//This function should be called for changing the brain projection, just pass the projection as brainview variable and it will work, den
//Brain projection needs to be overloaded to persist the resistance

function changeProjection(brainView){

    var data=globalDataStructures.fetchData();

    viewspecs.setProjection(brainView)

    globalDataStructures.changeProjection(data,viewspecs.getProjection())

    drawBrainMap(globalDataStructures,viewspecs, 'brainmap', globalDataStructures.fetchDataForArteries(), globalDataStructures.fetchArteryWidth(),1,globalDataStructures.fetchArteryStorageByIndex())
    drawLabelsBrainMap(brainView,"brainmap","#252525")

}



function addBloodFlowInSymmetry(val){

    globalDataStructures.setBloodBlowSymmetry(val);

    if(viewspecs.getTreeView()=="arcsD"){
        drawDendrogram(globalDataStructures,viewspecs.getView());
        drawBrainMap(globalDataStructures,viewspecs);

    }
    else{
        drawphlyogram(globalDataStructures,viewspecs.getView());
        drawBrainMap(globalDataStructures,viewspecs);
    }

}


initializeView()

//This function will console the inner width of the dengrogram
//Placing a hook on the resize event, this function will listen for all onresize event

//Input Null
//Description: Draws the BrainVisualization and Dendrogram Visualization
function resizeVis(){
    // Haven't resized in 100ms!
    drawBrainMap(globalDataStructures,viewspecs, 'brainmap', globalDataStructures.fetchDataForArteries(), globalDataStructures.fetchArteryWidth(),1, globalDataStructures.fetchArteryStorageByIndex())
    drawLabelsBrainMap(viewspecs.getProjectionType(),"brainmap","#252525")
    drawDendrogram(globalDataStructures,view)
}

//Description Waits for the user to stop resizing the screen and then calls a method
let createTimeout;
window.onresize = function(){
    clearTimeout(createTimeout);
    createTimeout = setTimeout(resizeVis, 100);
};

