console.log("test");
$(document).ready(function(){
    $.getJSON("./static/data/websitedata.json", function(data){
        console.log(data); 
    }).fail(function(e){
        console.log(e);
    });
});