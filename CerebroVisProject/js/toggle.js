// if projection  == arcsD show this
// else show checkbox_changed1

// function symmetryToggleR()  {
//     var toggleR = document.getElementById("switchtab1")
//     var toggleD = document.getElementById("switchtab")
//
//     if (changeView(projection,view,"arcsD")) {
//         toggleR.style.display === "none";
//     } else if (changeView(projection,view,"arcsR")) {
//         toggleD.style.display === "none";
//     }
//     else {(toggleR.style.display === "none" && toggleD.style.display === "block")
//
// }}
var currentView='arcsD'
function checkbox_changed() {

    var checkbox = document.getElementById("chbx");
    var data=globalDataStructures.fetchData()
    if (checkbox.checked == true)   {
        changeView(projection,'Symmetry',"arcsD")
    } else {
        changeView('Normal',"arcsD")
    }
}



function checkbox_changed1() {
    var checkbox1 = document.getElementById("chbx1");
    var data=globalDataStructures.fetchData()
    if (checkbox1.checked == true)  {
        changeView(projection,'Symmetry',"arcsR")
    } else {
        changeView(projection,'Normal',"arcsR")
    }
}

function toggleView(para){
    if(para=="normal"){
        $("#normal").css('background', '#337ab7')
        $("#symmetry").css('background', 'darkgrey')
        $("#hybrid").css('background', 'darkgrey')
        changeView('Normal')
    }
    if(para=="symmetry"){
        $("#symmetry").css('background', '#337ab7')
        $("#normal").css('background', 'darkgrey')
        $("#hybrid").css('background', 'darkgrey')
        changeView('Symmetry')
    }
    if(para=="hybrid"){
        $("#hybrid").css('background', '#337ab7')
        $("#normal").css('background', 'darkgrey')
        $("#symmetry").css('background', 'darkgrey')
        changeView('Hybrid')
    }
}

function toggleBrainView(para){
if(para=="top"){
    changeProjection(para)
    $("#top").css('background', '#337ab7')
    $("#back").css('background', 'darkgrey')
    $("#lateral").css('background', 'darkgrey')
}
    if(para=="back"){
        changeProjection(para)

        $("#top").css('background', 'darkgrey')
        $("#back").css('background', '#337ab7')
        $("#lateral").css('background', 'darkgrey')
    }
    if(para=="lateral"){
        changeProjection(para)
        $("#top").css('background', 'darkgrey')
        $("#back").css('background', 'darkgrey')
        $("#lateral").css('background', '#337ab7')
    }
}
function toggleTree(para){
    if(para=="arcsD"){
        changeTree(para)
        $("#arcsD").css('background', '#337ab7')
        $("#arcsR").css('background', 'darkgrey')
    }
    if(para=="arcsR"){
        changeTree(para)
        $("#arcsD").css('background', 'darkgrey')
        $("#arcsR").css('background', '#337ab7')

    }
}

var checkBox=false
function checkBoxChange(para){
    if(!checkBox){
        checkBox=true
        addBloodFlowInSymmetry(checkBox)
        $(".bloodFlowLegend").css('display', '')
        $("#dendrogramviewlegend").css('display','none')
    }
    else{
        checkBox=false
        addBloodFlowInSymmetry(checkBox)
        $(".bloodFlowLegend").css('display', 'none')
        $("#dendrogramviewlegend").css('display','')
    }

}