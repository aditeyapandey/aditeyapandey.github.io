/**
 * Created by aditeyapandey on 11/14/17.
 */
var arteryLabelsArcs=arteryParts();
var arteryLabels=arteryParts();


function getDataforArteries(result,viewspecs)
{
    pointsList=getKeys(result)
    var arteries=[]
    for (var i=0;i<pointsList.length;i++){
        if(result[parseInt(pointsList[i])]['parent']==-1){
            parent=result[parseInt(pointsList[i])]['parent']
            //When parent is -1 then we have no parent, so skip this node
        }
        else{
            //Draw a line from parent to child
            parent=result[parseInt(pointsList[i])]['parent']
            x1=result[parent][viewspecs.x]
            y1=result[parent][viewspecs.y]
            x2=result[parseInt(pointsList[i])][viewspecs.x]
            y2=result[parseInt(pointsList[i])][viewspecs.y]
            width=result[parseInt(pointsList[i])]['radius']
            nodeid=parseInt(pointsList[i])
            type = result[parseInt(pointsList[i])]['type']
            artery={"nodeid":nodeid,"parent":parent,"x1":x1,"y1":y1,"x2":x2,"y2":y2,"radius":width,'type':type}
            arteries.push(artery)
        }
    }
    return arteries
}

function getDataForScatterPlot(result,viewspecs)
{
    pointsList=getKeys(result)
    var dataForScatterPlot=[]
    for (var i=0;i<pointsList.length;i++){
        twoDpoint=getTwoDCoordinates(result[parseInt(pointsList[i])][viewspecs.x],result[parseInt(pointsList[i])][viewspecs.y])
        dataForScatterPlot.push(twoDpoint)
    }
    //console.log(dataForScatterPlot)
    return dataForScatterPlot
}

function getParentChildJson(result)
{
    pointsList=getKeys(result)
    node={}
    //Creating an array of children for all nodes
    for (var i=0;i<pointsList.length;i++){
        //Key does not exists
        if(node[result[parseInt(pointsList[i])]['parent']] == undefined)
        {
            node[result[parseInt(pointsList[i])]['parent']] = new Array();
            node[result[parseInt(pointsList[i])]['parent']].push(parseInt(pointsList[i]))
        }
        //Key exists
        else{
            node[result[parseInt(pointsList[i])]['parent']].push(parseInt(pointsList[i]))
        }
    }
    //This piece of code uses a depth first search to find all the parts of an artery and then creates a dictionary with root of the artery as the key
    segments=findSegments(node,-1,1)
    var treeData={}
    treeDataStructure=getHierarchy(segments,treeData,1,result)
    branchDataStructure=getHierarchyBranchSet(segments,treeData,1,result)

    //console.log(branchDataStructure)

    //Extracting the subtree for symmetry comparison
    extractSubtree(treeDataStructure)

    //Extracting the subtree for symmetry comparison
    extractSubtreeRectangular(branchDataStructure)

    return [treeDataStructure,branchDataStructure,segments]
}

function findSegments(node,Root,Child)
{
    if(Segments[Root]==undefined){
        Segments[Root]= new Array()
        Segments[Root].push(Child)
    }
    else{
        Segments[Root].push(Child)
    }

    if(node[Child]==undefined){
        childNodesLength=0
    }
    else{
        childNodesLength=node[Child].length
    }

    if(childNodesLength>=2){
        //Use local variables for Recursion
        var cnl=childNodesLength
        var childCurrent=Child
        var rootCurrent=Root
        for (var i=0;i<cnl;i++){
            findSegments(node,childCurrent,node[childCurrent][i])
            if(i!=cnl-1)
            {Segments[childCurrent].push(-999)}
        }

    }
    else if(childNodesLength==1){
        findSegments(node,Root,node[Child][0])
    }
    else{
        return
    }

    return Segments

}
function getHierarchy(segments,treeData,root,result)
{

    if(treeData.name== undefined){
        treeData={name:root}
    }

    //find children of all the root nodes
    childrenofRoot=segments[root]
    if(childrenofRoot.indexOf(-999)==-1)
    {
        //Assiging type here to avoid checking in the loop
        treeData['children']= new Array()
        treeData['children'].push({
            name:root,
            size:childrenofRoot.length,
            childs:childrenofRoot,
            type:0
        })

        for (var i=0;i<childrenofRoot.length;i++){
            if(segments[childrenofRoot[i]] != undefined){
                getHierarchy(segments,treeData.children[0],childrenofRoot[i],result)
            }
        }
    }

    else{
        var parts=childrenofRoot.indexOf(-999)
        var children=childrenofRoot
        var countofBreaks=childrenofRoot.reduce(function(a, e, i) {
            if (e === -999)
                a.push(i);
            return a;
        }, []);
        treeData['children']= new Array()

        for(var i=0;i<countofBreaks.length+1;i++)
        {
            var subchildren=[]
            if(i==0){
                subchildren=children.slice(0,parts)
            }
            else{
                subchildren=children.slice(parts+1,children.length)
            }

            treeData['children'].push({
                name:root,
                size:subchildren.length,
                childs:subchildren,
                type : result[subchildren[0]].type
            })

            for (var j=0;j<subchildren.length;j++){
                if(segments[subchildren[j]] != undefined){

                    getHierarchy(segments,treeData.children[i],subchildren[j],result)
                }
            }
        }

    }
    return treeData
}

function getHierarchyBranchSet(segments,treeData,root,result)
{

    if(treeData.name== undefined){
        treeData={name:root}
    }

    //find children of all the root nodes
    childrenofRoot=segments[root]
    if(childrenofRoot.indexOf(-999)==-1)
    {
        //Assiging type here to avoid checking in the loop
        treeData['branchset']= new Array()
        treeData['branchset'].push({
            name:root,
            length:childrenofRoot.length,
            childs:childrenofRoot,
            type:0
        })

        for (var i=0;i<childrenofRoot.length;i++){
            if(segments[childrenofRoot[i]] != undefined){
                getHierarchyBranchSet(segments,treeData.branchset[0],childrenofRoot[i],result)
            }
        }
    }

    else{
        var parts=childrenofRoot.indexOf(-999)
        var children=childrenofRoot
        var countofBreaks=childrenofRoot.reduce(function(a, e, i) {
            if (e === -999)
                a.push(i);
            return a;
        }, []);
        treeData['branchset']= new Array()

        for(var i=0;i<countofBreaks.length+1;i++)
        {
            var subchildren=[]
            if(i==0){
                subchildren=children.slice(0,parts)
            }
            else{
                subchildren=children.slice(parts+1,children.length)
            }

            treeData['branchset'].push({
                name:"C"+i+" of "+root,
                length:subchildren.length,
                childs:subchildren,
                type : result[subchildren[0]].type
            })

            for (var j=0;j<subchildren.length;j++){
                if(segments[subchildren[j]] != undefined){

                    getHierarchyBranchSet(segments,treeData.branchset[i],subchildren[j],result)
                }
            }
        }

    }
    return treeData
}

function getKeys(dataobj)
{
    return Object.keys(dataobj)
}


function getTwoDCoordinates(x,y){
    u=x
    v=y

    return [u,v]

}



function extractSubtree(treeDataStructure) {

    var tree=treeDataStructure

    if(tree.children != undefined ){

        if (arteryLabelsArcs['RACA'].condition) {
            if (tree.type == arteryLabelsArcs['RACA'].part) {
                arteryLabelsArcs['RACA']['children'] = treeDataStructure.children
                arteryLabelsArcs['RACA'].condition = false
            }
        }
        if (arteryLabelsArcs['LACA'].condition) {
            if (tree.type == arteryLabelsArcs['LACA'].part) {
                arteryLabelsArcs['LACA']['children'] = treeDataStructure.children
                arteryLabelsArcs['LACA'].condition = false
            }
        }
        if (arteryLabelsArcs['LMCA'].condition) {
            if (tree.type == arteryLabelsArcs['LMCA'].part) {
                arteryLabelsArcs['LMCA']['children'] = treeDataStructure.children
                arteryLabelsArcs['LMCA'].condition = false
            }
        }
        if (arteryLabelsArcs['LPCA'].condition) {
            if (tree.type == arteryLabelsArcs['LPCA'].part) {
                arteryLabelsArcs['LPCA']['children'] = treeDataStructure.children
                arteryLabelsArcs['LPCA'].condition = false
            }
        }
        if (arteryLabelsArcs['RMCA'].condition) {
            if (tree.type == arteryLabelsArcs['RMCA'].part) {
                arteryLabelsArcs['RMCA']['children'] = treeDataStructure.children
                arteryLabelsArcs['RMCA'].condition = false
            }
        }
        if (arteryLabelsArcs['RPCA'].condition) {
            if (tree.type == arteryLabelsArcs['RPCA'].part) {
                arteryLabelsArcs['RPCA']['children'] = treeDataStructure.children
                arteryLabelsArcs['RPCA'].condition = false
            }
        }

            extractSubtree(tree.children[0])
            extractSubtree(tree.children[1])

    }
    else{return}


}

function extractSubtreeRectangular(treeDataStructure) {
    var tree=treeDataStructure

    if(tree.branchset != undefined ){

        if (arteryLabels['RACA'].condition) {
            if (tree.type == arteryLabels['RACA'].part) {
                arteryLabels['RACA']['branchset'] = treeDataStructure.branchset
                arteryLabels['RACA'].condition = false
            }
        }
        if (arteryLabels['LACA'].condition) {
            if (tree.type == arteryLabels['LACA'].part) {
                arteryLabels['LACA']['branchset'] = treeDataStructure.branchset
                arteryLabels['LACA'].condition = false
            }
        }
        if (arteryLabels['LMCA'].condition) {
            if (tree.type == arteryLabels['LMCA'].part) {
                arteryLabels['LMCA']['branchset'] = treeDataStructure.branchset
                arteryLabels['LMCA'].condition = false
            }
        }
        if (arteryLabels['LPCA'].condition) {
            if (tree.type == arteryLabels['LPCA'].part) {
                arteryLabels['LPCA']['branchset'] = treeDataStructure.branchset
                arteryLabels['LPCA'].condition = false
            }
        }
        if (arteryLabels['RMCA'].condition) {
            if (tree.type == arteryLabels['RMCA'].part) {
                arteryLabels['RMCA']['branchset'] = treeDataStructure.branchset
                arteryLabels['RMCA'].condition = false
            }
        }
        if (arteryLabels['RPCA'].condition) {
            if (tree.type == arteryLabels['RPCA'].part) {
                arteryLabels['RPCA']['branchset'] = treeDataStructure.branchset
                arteryLabels['RPCA'].condition = false
            }
        }

        extractSubtreeRectangular(tree.branchset[0])
        extractSubtreeRectangular(tree.branchset[1])

    }
    else{return}



    //console.log(arteryLabels)

}