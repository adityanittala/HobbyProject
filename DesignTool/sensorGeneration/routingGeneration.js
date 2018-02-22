var openingOffset = 30;
var distanceBetweenTraces = 7;

function seriesConnectColumns(numRows, numColumns, filteredRowElectrodes, filteredColumnElectrodes, astarGraph, draw, txLayer) {

    for (var i = 0; i < numColumns; i++) {
        //  console.log(filteredRowElectrodes[i].length);
        var numElectrodesInColumn = filteredColumnElectrodes[i].length;
        if (numElectrodesInColumn > 0) {
            var startX = Math.floor(filteredColumnElectrodes[i][0].cx());
            var startY = Math.floor(filteredColumnElectrodes[i][0].cy());

            var endX = Math.floor(filteredColumnElectrodes[i][numElectrodesInColumn - 1].cx());
            var endY = Math.floor(filteredColumnElectrodes[i][numElectrodesInColumn - 1].cy());

            var pathResult = findPath(astarGraph, [startX, startY], [endX, endY]);
            //   console.log(pathResult);

            for (var j = 0; j < pathResult.length; j++) {
                var rect1 = draw.rect(2, 2).x(pathResult[j][0]).y(pathResult[j][1]).attr({
                    stroke: '#800',
                    fill: 'none'
                });
                var rect2 = txLayer.rect(2, 2).x(pathResult[j][0]).y(pathResult[j][1]).attr({
                    stroke: '#800',
                    fill: 'none'
                });
                
                /*for (var k = pathResult[j][1] - 1; k < pathResult[j][1] + 1; k++) {
                    astarGraph[Math.floor(pathResult[j][0])][k] = 1;
                }*/
            }
        }
    }
    return astarGraph;
}

function seriesConnectRows(numRows, numColumns, filteredRowElectrodes, filteredColumnElectrodes, astarGraph, draw, rxLayer) {

    for (var i = 0; i < numRows; i++) {
        //  console.log(filteredRowElectrodes[i].length);
        var numElectrodesInRow = filteredRowElectrodes[i].length;
        if (numElectrodesInRow > 0) {
            for (var j = 0; j < numElectrodesInRow; j++) {
                if (j <= numElectrodesInRow - 2) {
                    var startX = Math.floor(filteredRowElectrodes[i][j].cx());
                    var startY = Math.floor(filteredRowElectrodes[i][j].cy());

                    var endX = Math.floor(filteredRowElectrodes[i][j + 1].cx());
                    var endY = Math.floor(filteredRowElectrodes[i][j + 1].cy());

                    var pathResult = findPath(astarGraph, [startX, startY], [endX, endY]);
                    //   console.log(pathResult);

                    for (var x = 0; x < pathResult.length; x++) {
                        var rect1 = draw.rect(2, 2).x(pathResult[x][0]).y(pathResult[x][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });

                        var rect2 = rxLayer.rect(2, 2).x(pathResult[x][0]).y(pathResult[x][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        /*for (var k = pathResult[x][1] - 1; k < pathResult[x][1] + 1; k++) {
                            astarGraph[Math.floor(pathResult[x][0])][k] = 1;
                        }*/

                    }
                }
            }

            /*var startX = Math.floor(filteredRowElectrodes[i][0].cx());
            var startY = Math.floor(filteredRowElectrodes[i][0].cy());

            var endX = Math.floor(filteredRowElectrodes[i][numElectrodesInRow - 1].cx());
            var endY = Math.floor(filteredRowElectrodes[i][numElectrodesInRow - 1].cy());

            var pathResult = findPath(astarGraph, [startX, startY], [endX, endY]);
            //   console.log(pathResult);

            for (var j = 0; j < pathResult.length; j++) {
                var rect1 = draw.rect(1, 1).x(pathResult[j][0]).y(pathResult[j][1]).attr({
                    stroke: '#008',
                    fill: 'none'
                });
                for (var k = pathResult[j][1] - 5; k < pathResult[j][1] + 5; k++) {
                    astarGraph[Math.floor(pathResult[j][0])][k] = 1;
                }

            }*/
        }
        
    }
    return astarGraph;
}
function blockAllElectrodes(aStarGraph, filteredRowElectrodes, filteredColumnElectrodes, draw) {

    for (var a = 0; a < filteredColumnElectrodes.length; a++) {
        var numElectrodesInColumn = filteredColumnElectrodes[a].length;
        if (numElectrodesInColumn > 0) {
            var minX = filteredColumnElectrodes[a][0].cx() - (filteredColumnElectrodes[a][numElectrodesInColumn - 1].height() * Math.sqrt(2) / 2);
            var minY = filteredColumnElectrodes[a][0].cy() - (filteredColumnElectrodes[a][numElectrodesInColumn - 1].width() * Math.sqrt(2) / 2);

            var maxX = filteredColumnElectrodes[a][numElectrodesInColumn - 1].cx() + (filteredColumnElectrodes[a][numElectrodesInColumn - 1].height() * Math.sqrt(2) / 2);
            var maxY = filteredColumnElectrodes[a][numElectrodesInColumn - 1].cy() + (filteredColumnElectrodes[a][numElectrodesInColumn - 1].height() * Math.sqrt(2) / 2);

            for (var b = minY - 10 ; b < maxY + 10; b++) {
                for (var c = minX - 10; c < maxX + 10 ; c++) {
                   /*  var rect1 = draw.rect(1, 1).x(c).y(b).attr({
                         stroke: '#000',
                         fill: '#000',
                         opacity:0.2
                     });*/

                    astarGraph[Math.floor(c)][Math.floor(b)] = 1
                }
            }

        }
    }

    for (var a = 0; a < filteredRowElectrodes.length; a++) {
        var numElectrodesInRow = filteredRowElectrodes[a].length;
        if (numElectrodesInRow > 0) {
            var minX = filteredRowElectrodes[a][0].cx() - (filteredRowElectrodes[a][numElectrodesInRow - 1].height() * Math.sqrt(2) / 2);
            var minY = filteredRowElectrodes[a][0].cy() - (filteredRowElectrodes[a][numElectrodesInRow - 1].width() * Math.sqrt(2) / 2);

            var maxX = filteredRowElectrodes[a][numElectrodesInRow - 1].cx() + (filteredRowElectrodes[a][numElectrodesInRow - 1].height() * Math.sqrt(2) / 2);
            var maxY = filteredRowElectrodes[a][numElectrodesInRow - 1].cy() + (filteredRowElectrodes[a][numElectrodesInRow - 1].height() * Math.sqrt(2) / 2);

            for (var b = minY - 10; b < maxY + 10; b++) {
                for (var c = minX - 10; c < maxX + 10; c++) {
                    /*var rect1 = draw.rect(1, 1).x(c).y(b).attr({
                        stroke: '#000',
                        fill: '#000',
                        opacity:0.2
                    });*/

                    astarGraph[Math.floor(c)][Math.floor(b)] = 1
                }
            }

        }
    }
    return aStarGraph;
}
function openTheEndColumnElectrodes(astarGraph, filteredRowElectrodes, filteredColumnElectrodes, draw) {
    var openingOffset = 40;

    for (var d = 0; d < filteredColumnElectrodes.length; d++) {
        var numElectrodesInColumn = filteredColumnElectrodes[d].length;
        if (numElectrodesInColumn > 0) {
            var firstMinX = Math.floor(filteredColumnElectrodes[d][0].cx() - (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));
            var firstMaxX = Math.floor(filteredColumnElectrodes[d][0].cx() + (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));

            var firstMinY = Math.floor(filteredColumnElectrodes[d][0].cy() - (filteredColumnElectrodes[d][numElectrodesInColumn - 1].height() * Math.sqrt(2) / 2));
            var firstMaxY = Math.floor(filteredColumnElectrodes[d][0].cy() + (filteredColumnElectrodes[d][numElectrodesInColumn - 1].height() * Math.sqrt(2) / 2));

            var lastMinX = Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cx() - (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));
            var lastMaxX = Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cx() + (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));

            var lastMinY = Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cy() - (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));
            var lastMaxY = Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cy() + (filteredColumnElectrodes[d][0].height() * Math.sqrt(2) / 2));



            for (var b = firstMinX - openingOffset; b < firstMaxX; b++) {
                var rect1 = draw.rect(1, 1).x(b).y(filteredColumnElectrodes[d][0].cy()).attr({
                    stroke: '#080',
                    fill: '#080',
                    opacity: 0.2

                });
                astarGraph[Math.floor(b)][Math.floor(filteredColumnElectrodes[d][0].cy())] = 0;

            }

            for (var b = firstMinY - openingOffset; b < firstMaxY + openingOffset; b++) {
                var rect1 = draw.rect(1, 1).x(filteredColumnElectrodes[d][0].cx()).y(b).attr({
                    stroke: '#080',
                    fill: '#080',
                    opacity: 0.2

                });
                astarGraph[Math.floor(filteredColumnElectrodes[d][0].cx())][Math.floor(b)] = 0;

            }

            for (var b = lastMinX - openingOffset; b < lastMaxX + openingOffset; b++) {
                var rect1 = draw.rect(1, 1).x(b).y(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cy()).attr({
                    stroke: '#080',
                    fill: '#080',
                    opacity: 0.2

                });
                astarGraph[Math.floor(b)][Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cy())] = 0;

            }

            for (var b = lastMinY - openingOffset; b < lastMaxY + openingOffset; b++) {
                var rect1 = draw.rect(1, 1).x(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cx()).y(b).attr({
                    stroke: '#080',
                    fill: '#080',
                    opacity: 0.2

                });
                astarGraph[Math.floor(filteredColumnElectrodes[d][numElectrodesInColumn - 1].cx())][Math.floor(b)] = 0;

            }
        }
    }
    return astarGraph;
}

function openColumnElectrode(astarGraph, electrode, draw) {

    var minX = Math.floor(electrode.cx() - (electrode.height() * Math.sqrt(2) / 2));
    var maxX = Math.floor(electrode.cx() + (electrode.height() * Math.sqrt(2) / 2));

    var minY = Math.floor(electrode.cy() - (electrode.height() * Math.sqrt(2) / 2));
    var MaxY = Math.floor(electrode.cy() + (electrode.height() * Math.sqrt(2) / 2));

    if (minY < openingOffset) {

        for (var b = 0; b < MaxY + openingOffset; b++) {
            /*var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
                stroke: '#080',
                fill: '#080',
                opacity: 0.2
    
            });*/
            astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 0;

        }

    } else {

        for (var b = minY - openingOffset; b < MaxY + openingOffset; b++) {
            /*var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
                stroke: '#080',
                fill: '#080',
                opacity: 0.2
    
            });*/
            astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 0;

        }

    }

   
    return astarGraph;
}

function openRowElectrode(astarGraph, electrode, draw) {


    var minX = Math.floor(electrode.cx() - (electrode.height() * Math.sqrt(2) / 2));
    var maxX = Math.floor(electrode.cx() + (electrode.height() * Math.sqrt(2) / 2));

    var minY = Math.floor(electrode.cy() - (electrode.height() * Math.sqrt(2) / 2));
    var MaxY = Math.floor(electrode.cy() + (electrode.height() * Math.sqrt(2) / 2));

    if (minX < openingOffset) {

        for (var b = 0; b < maxX + openingOffset; b++) {
            /*  var rect1 = draw.rect(1, 1).x(b).y(electrode.cy()).attr({
                  stroke: '#080',
                  fill: '#080',
                  opacity: 0.2
      
              });*/
            astarGraph[Math.floor(b)][Math.floor(electrode.cy())] = 0;

        }

    } else {


        for (var b = minX - openingOffset; b < maxX + openingOffset; b++) {
             /* var rect1 = draw.rect(1, 1).x(b).y(electrode.cy()).attr({
                  stroke: '#080',
                  fill: '#080',
                  opacity: 0.2
      
              });*/
            astarGraph[Math.floor(b)][Math.floor(electrode.cy())] = 0;

        }

    }


   /* for (var b = minY - openingOffset; b < MaxY + openingOffset; b++) {
        var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
            stroke: '#080',
            fill: '#080',
            opacity: 0.2

        });
        astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 0;

    }*/
    return astarGraph;
    
}

function closeColumnElectrode(astarGraph, electrode, draw) {

    var minX = Math.floor(electrode.cx() - (electrode.height() * Math.sqrt(2) / 2));
    var maxX = Math.floor(electrode.cx() + (electrode.height() * Math.sqrt(2) / 2));

    var minY = Math.floor(electrode.cy() - (electrode.height() * Math.sqrt(2) / 2));
    var MaxY = Math.floor(electrode.cy() + (electrode.height() * Math.sqrt(2) / 2));

    if (minY < openingOffset) {
        for (var b = 0; b < MaxY + openingOffset; b++) {
            /*var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
                stroke: '#080',
                fill: '#080',
                opacity: 0.2
    
            });*/
            astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 1;

        }

    } else {
        for (var b = minY - openingOffset; b < MaxY + openingOffset; b++) {
            /*var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
                stroke: '#080',
                fill: '#080',
                opacity: 0.2
    
            });*/
            astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 1;

        }
    }

    
    return astarGraph;

}


function closeRowElectrode(astarGraph, electrode, draw) {

    var minX = Math.floor(electrode.cx() - (electrode.height() * Math.sqrt(2) / 2));
    var maxX = Math.floor(electrode.cx() + (electrode.height() * Math.sqrt(2) / 2));

    var minY = Math.floor(electrode.cy() - (electrode.height() * Math.sqrt(2) / 2));
    var MaxY = Math.floor(electrode.cy() + (electrode.height() * Math.sqrt(2) / 2));

    if (minX < openingOffset) {
        for (var b = 0; b < maxX + openingOffset; b++) {
           /*  var rect1 = draw.rect(1, 1).x(b).y(electrode.cy()).attr({
                 stroke: '#f00',
                 fill: '#f00',
                 opacity: 0.5
     
             });*/
            astarGraph[Math.floor(b)][Math.floor(electrode.cy())] = 1;

        }

    } else {
        for (var b = minX - openingOffset; b < maxX + openingOffset; b++) {
            /* var rect1 = draw.rect(1, 1).x(b).y(electrode.cy()).attr({
                 stroke: '#f00',
                 fill: '#f00',
                 opacity: 0.5
     
             });*/
            astarGraph[Math.floor(b)][Math.floor(electrode.cy())] = 1;

        }
    }

  

    /*for (var b = minY - openingOffset; b < MaxY + openingOffset; b++) {
       /* var rect1 = draw.rect(1, 1).x(electrode.cx()).y(b).attr({
            stroke: '#880',
            fill: '#880',
            opacity: 0.2

        });
        astarGraph[Math.floor(electrode.cx())][Math.floor(b)] = 1;

    }*/
    return astarGraph;

}

function findFarthestColumnToConnector(astarGraph, filteredColumnElectrodes, endIndices, connectorBlock, connectorNumber, draw) {

    var numElectrodesInFirstRow = filteredColumnElectrodes[endIndices[0]].length;
    var numElectrodesInLastRow = filteredColumnElectrodes[endIndices[1]].length;

    var firstColumnFirstElectrode = filteredColumnElectrodes[endIndices[0]][0];
    var firtColumnLastElectrode = filteredColumnElectrodes[endIndices[0]][numElectrodesInFirstRow - 1];

    var lastColumnFirstElectrode = filteredColumnElectrodes[endIndices[1]][0];
    var lastColumnLastElectrode = filteredColumnElectrodes[endIndices[1]][numElectrodesInLastRow - 1];

    astarGraph = openColumnElectrode(astarGraph, firstColumnFirstElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, firtColumnLastElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, lastColumnFirstElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, lastColumnLastElectrode, draw);

    astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    var path1 = findPath(astarGraph, [Math.floor(firstColumnFirstElectrode.cx()), Math.floor(firstColumnFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path2 = findPath(astarGraph, [Math.floor(firtColumnLastElectrode.cx()), Math.floor(firtColumnLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path3 = findPath(astarGraph, [Math.floor(lastColumnFirstElectrode.cx()), Math.floor(lastColumnFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path4 = findPath(astarGraph, [Math.floor(lastColumnLastElectrode.cx()), Math.floor(lastColumnLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);

    var shorterPath2 = Math.min(path3.length, path4.length);
    var shorterPath = Math.min(path1.length, path2.length);

    astarGraph = closeRowElectrode(astarGraph, firstColumnFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, firtColumnLastElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastColumnFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastColumnLastElectrode, draw);
    astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    if (shorterPath > shorterPath2)
        return [astarGraph, endIndices[0]];
    else
        return [astarGraph, endIndices[1]];

}

function findClosestColumnToConnector(astarGraph, filteredColumnElectrodes, endIndices, connectorBlock, connectorNumber, draw) {

    var numElectrodesInFirstRow = filteredColumnElectrodes[endIndices[0]].length;
    var numElectrodesInLastRow = filteredColumnElectrodes[endIndices[1]].length;

    var firstColumnFirstElectrode = filteredColumnElectrodes[endIndices[0]][0];
    var firtColumnLastElectrode = filteredColumnElectrodes[endIndices[0]][numElectrodesInFirstRow - 1];

    var lastColumnFirstElectrode = filteredColumnElectrodes[endIndices[1]][0];
    var lastColumnLastElectrode = filteredColumnElectrodes[endIndices[1]][numElectrodesInLastRow - 1];

    astarGraph = openColumnElectrode(astarGraph, firstColumnFirstElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, firtColumnLastElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, lastColumnFirstElectrode, draw);
    astarGraph = openColumnElectrode(astarGraph, lastColumnLastElectrode, draw);

    astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    var path1 = findPath(astarGraph, [Math.floor(firstColumnFirstElectrode.cx()), Math.floor(firstColumnFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path2 = findPath(astarGraph, [Math.floor(firtColumnLastElectrode.cx()), Math.floor(firtColumnLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path3 = findPath(astarGraph, [Math.floor(lastColumnFirstElectrode.cx()), Math.floor(lastColumnFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path4 = findPath(astarGraph, [Math.floor(lastColumnLastElectrode.cx()), Math.floor(lastColumnLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);

    var shorterPath2 = Math.min(path3.length, path4.length);
    var shorterPath = Math.min(path1.length, path2.length);

    astarGraph = closeRowElectrode(astarGraph, firstColumnFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, firtColumnLastElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastColumnFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastColumnLastElectrode, draw);
    astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    if (shorterPath < shorterPath2)
        return [astarGraph, endIndices[0]];
    else
        return [astarGraph, endIndices[1]];

}



function routeColumnsToConnector(astarGraph, filteredColumnElectrodes, bBox, inputShapePointList, connectorBlock, connectorNumber, draw, txLayer) {

    var endIndices = getActiveRowNumbers(filteredColumnElectrodes);
   // var startIndexForRouting = findClosestColumnToConnector(astarGraph, filteredColumnElectrodes, endIndices, connectorBlock, connectorNumber, draw);
    //astarGraph = startIndexForRouting[0];
    //startIndexForRouting = startIndexForRouting[1];
    var startIndexForRouting = endIndices[0];
    if (startIndexForRouting == endIndices[0]) {
        for (var f = endIndices[0]; f <= endIndices[1]; f++) {
            var numElecs = filteredColumnElectrodes[f].length;
            if (numElecs > 0) {

                astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
                astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);

                var firstElectrodeX = Math.floor(filteredColumnElectrodes[f][0].cx());
                var firstElectrodeY = Math.floor(filteredColumnElectrodes[f][0].cy());

                var lastElectrodeX = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cx());
                var lastElectrodeY = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cy());

                astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
                var destinationY = Math.floor(connectorBlock[connectorNumber].cy());

                var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
                console.log(path1);
                var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
                console.log(path2);

                if ((path1.length == 0) && (path2.length == 0)) {
                    console.log("No routing found for column: " + f);
                    var noRoutingRect = draw.rect(20, 20).cx(firstElectrodeX).cy(firstElectrodeY).attr({
                        stroke: '#888',
                        fill: 'none'
                    });
                    connectorNumber++;
                    continue;
                }
                if ((path1.length < path2.length) && (path1.length > 0)) {
                    var routeLine = draw.polyline(path1);
                    routeLine.fill('none');
                    routeLine.stroke({ color: '#800', width: 2, linecap: 'round', linejoin: 'round' })
                    for (var j = 0; j < path1.length; j++) {
                      /*  var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#800',
                            fill: 'none'
                        });*/
                        var rect2 = txLayer.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#800',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                            //  stroke: '#000',
                            //   fill: '#000',
                            //   opacity: 0.1
                            //  });
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                            astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                        }
                    }
                }
                else {
                    var routeLine = draw.polyline(path1);
                    routeLine.fill('none');
                    routeLine.stroke({ color: '#800', width: 2, linecap: 'round', linejoin: 'round' });
                    for (var j = 0; j < path2.length; j++) {
                        /*var rect1 = draw.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#800',
                            fill: 'none'
                        });*/
                        var rect2 = txLayer.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#800',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                            //  stroke: '#000',
                            //    fill: '#000',
                            //    opacity: 0.1
                            //   });
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                            astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                        }
                    }

                }
                
                //connectorNumber +=2;
                astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
                astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);
                astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);
                astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                connectorNumber++;

            }
        }
    }
    else {
        for (var f = endIndices[1]; f >= endIndices[0]; f--) {
            var numElecs = filteredColumnElectrodes[f].length;
            if (numElecs > 0) {
                astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
                astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);

                var firstElectrodeX = Math.floor(filteredColumnElectrodes[f][0].cx());
                var firstElectrodeY = Math.floor(filteredColumnElectrodes[f][0].cy());

                var lastElectrodeX = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cx());
                var lastElectrodeY = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cy());

                var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
                var destinationY = Math.floor(connectorBlock[connectorNumber].cy());

                astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

                var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
                console.log(path1);
                var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
                console.log(path2);

                if ((path1.length == 0) && (path2.length == 0)) {
                    console.log("No routing found for column: " + f);
                    var noRoutingRect = draw.rect(20, 20).cx(firstElectrodeX).cy(firstElectrodeY).attr({
                        stroke: '#888',
                        fill: 'none'
                    });
                    connectorNumber++;
                    continue;
                }
                if ((path1.length < path2.length) && (path1.length > 0)) {
                    for (var j = 0; j < path1.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect2 = txLayer.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                            //  stroke: '#000',
                            //   fill: '#000',
                            //   opacity: 0.1
                            //  });
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                            astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                        }
                    }
                }
                else {
                    for (var j = 0; j < path2.length; j++) {
                        var rect1 = draw.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect2 = txLayer.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                            //  stroke: '#000',
                            //    fill: '#000',
                            //    opacity: 0.1
                            //   });
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                            astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                        }
                    }

                }
               
                //connectorNumber +=2;
                astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
                astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);
                astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);
                astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                connectorNumber++;
            }
        }
    }


   // var connectorNumber = 0;
   /* for (var f = 0; f < filteredColumnElectrodes.length; f++) {
        var numElecs = filteredColumnElectrodes[f].length;
        if (numElecs > 0) {
            astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
            astarGraph = openColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);

            var firstElectrodeX = Math.floor(filteredColumnElectrodes[f][0].cx());
            var firstElectrodeY = Math.floor(filteredColumnElectrodes[f][0].cy());

            var lastElectrodeX = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cx());
            var lastElectrodeY = Math.floor(filteredColumnElectrodes[f][numElecs - 1].cy());

            astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
            var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
            var destinationY = Math.floor(connectorBlock[connectorNumber].cy());



            var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
            console.log(path1);
            var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
            console.log(path2);

            if ((path1.length == 0) && (path2.length == 0)) {
                console.log("No routing found for column: " + f);
                connectorNumber++;
                continue;
            }
            if ((path1.length < path2.length) && (path1.length > 0)) {
                for (var j = 0; j < path1.length; j++) {
                    var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                        stroke: '#800',
                        fill: 'none'
                    });
                    for (var z = -5; z < 5; z++) {
                       //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                      //      stroke: '#000',
                      //      fill: '#000',
                      //      opacity: 0.1
                      //  });
                        astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                        astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                        astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                    }
                }
            }
            else {
                for (var j = 0; j < path2.length; j++) {
                    var rect1 = draw.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                        stroke: '#800',
                        fill: 'none'
                    });
                    for (var z = -5; z < 5; z++) {
                        //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                          //  stroke: '#000',
                            //fill: '#000',
                            //opacity: 0.1
                        //});
                        astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                        astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                        astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                    }
                }

            }
            connectorNumber++;
            //connectorNumber += 2;
            astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][0], draw);
            astarGraph = closeColumnElectrode(astarGraph, filteredColumnElectrodes[f][numElecs - 1], draw);
            astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
        }
    }*/
    return astarGraph;
    
}


function findClosestRowToConnector(astarGraph, filteredRowElectrodes, endIndices, connectorBlock, connectorNumber, draw) {

    var numElectrodesInFirstRow = filteredRowElectrodes[endIndices[0]].length;
    var numElectrodesInLastRow = filteredRowElectrodes[endIndices[1]].length;

    var firstRowFirstElectrode = filteredRowElectrodes[endIndices[0]][0];
    var firtRowLastElectrode = filteredRowElectrodes[endIndices[0]][numElectrodesInFirstRow - 1];

    var lastRowFirstElectrode = filteredRowElectrodes[endIndices[1]][0];
    var lastRowLastElectrode = filteredRowElectrodes[endIndices[1]][numElectrodesInLastRow - 1];

    astarGraph = openRowElectrode(astarGraph, firstRowFirstElectrode, draw);
    astarGraph = openRowElectrode(astarGraph, firtRowLastElectrode, draw);
    astarGraph = openRowElectrode(astarGraph, lastRowFirstElectrode, draw);
    astarGraph = openRowElectrode(astarGraph, lastRowLastElectrode, draw);

    astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    var path1 = findPath(astarGraph, [Math.floor(firstRowFirstElectrode.cx()), Math.floor(firstRowFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path2 = findPath(astarGraph, [Math.floor(firtRowLastElectrode.cx()), Math.floor(firtRowLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path3 = findPath(astarGraph, [Math.floor(lastRowFirstElectrode.cx()), Math.floor(lastRowFirstElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);
    var path4 = findPath(astarGraph, [Math.floor(lastRowLastElectrode.cx()), Math.floor(lastRowLastElectrode.cy())], [Math.floor(connectorBlock[connectorNumber].cx()), Math.floor(connectorBlock[connectorNumber].cy())]);

    var shorterPath2 = Math.min(path3.length, path4.length);
    var shorterPath = Math.min(path1.length, path2.length);

    astarGraph = closeRowElectrode(astarGraph, firstRowFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, firtRowLastElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastRowFirstElectrode, draw);
    astarGraph = closeRowElectrode(astarGraph, lastRowLastElectrode, draw);
    astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

    if (shorterPath < shorterPath2)
        return [astarGraph, endIndices[0] ];
    else
        return [astarGraph, endIndices[1]];

}

function routeRowsToConnector(astarGraph, filteredRowsElectrodes, bBox, inputShapePointList, connectorBlock, connectorNumber, draw, rxLayer) {

    // var connectorNumber = 0;

    var endIndices = getActiveRowNumbers(filteredRowsElectrodes);
    var startIndexForRouting = findClosestRowToConnector(astarGraph, filteredRowsElectrodes, endIndices, connectorBlock, connectorNumber, draw);
    //renderAstarGrid(astarGraph, draw);
    astarGraph = startIndexForRouting[0];
    startIndexForRouting = startIndexForRouting[1];
    if (startIndexForRouting == endIndices[0]) {
        for (var f = endIndices[0]; f <= endIndices[1]; f++) {
            var numElecs = filteredRowsElectrodes[f].length;
            if (numElecs > 0) {

                astarGraph = openRowElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                astarGraph = openRowElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);

                var firstElectrodeX = Math.floor(filteredRowsElectrodes[f][0].cx());
                var firstElectrodeY = Math.floor(filteredRowsElectrodes[f][0].cy());

                var lastElectrodeX = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cx());
                var lastElectrodeY = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cy());

                astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
                var destinationY = Math.floor(connectorBlock[connectorNumber].cy());

                var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
                console.log(path1);
                var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
                console.log(path2);

                if ((path1.length == 0) && (path2.length == 0)) {
                    console.log("No routing found for row: " + f);
                    var noRoutingRect = draw.rect(20, 20).cx(firstElectrodeX).cy(firstElectrodeY).attr({
                        stroke: '#888',
                        fill: 'none'
                    });
                    connectorNumber++;
                    continue;
                }
                if ((path1.length < path2.length) && (path1.length > 0)) {
                    for (var j = 0; j < path1.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect2 = rxLayer.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                           /* var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              stroke: '#000',
                               fill: '#000',
                               opacity: 0.1
                              });*/
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                            astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                        }
                    }
                }
                else {
                    for (var j = 0; j < path2.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect2 = rxLayer.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                           /* var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              stroke: '#000',
                                fill: '#000',
                                opacity: 0.1
                               });*/
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                            astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                        }
                    }

                }
                
                //connectorNumber +=2;
                astarGraph = closeRowElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                astarGraph = closeRowElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);
               // astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);
                astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                connectorNumber++;

            }
        }
    }
    else {
        for (var f = endIndices[1]; f >= endIndices[0]; f--) {
            var numElecs = filteredRowsElectrodes[f].length;
            if (numElecs > 0) {
                astarGraph = openRowElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                astarGraph = openRowElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);

                astarGraph = openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);

                var firstElectrodeX = Math.floor(filteredRowsElectrodes[f][0].cx());
                var firstElectrodeY = Math.floor(filteredRowsElectrodes[f][0].cy());

                var lastElectrodeX = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cx());
                var lastElectrodeY = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cy());

                var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
                var destinationY = Math.floor(connectorBlock[connectorNumber].cy());

                var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
                console.log(path1);
                var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
                console.log(path2);

                if ((path1.length == 0) && (path2.length == 0)) {
                    console.log("No routing found for row: " + f);
                    var noRoutingRect = draw.rect(20, 20).cx(firstElectrodeX).cy(firstElectrodeY).attr({
                        stroke: '#888',
                        fill: 'none'
                    });
                    connectorNumber++;
                    continue;
                }
                if ((path1.length < path2.length) && (path1.length > 0)) {
                    for (var j = 0; j < path1.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect1 = rxLayer.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                          /*  var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              stroke: '#000',
                               fill: '#000',
                               opacity: 0.1
                              });*/
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                            astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                        }
                    }
                }
                else {
                    for (var j = 0; j < path2.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        var rect1 = rxLayer.rect(1, 1).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -distanceBetweenTraces; z < distanceBetweenTraces; z++) {
                           /* var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              stroke: '#000',
                                fill: '#000',
                                opacity: 0.1
                               });*/
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                            
                            astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                        }
                    }

                }
                
                //connectorNumber +=2;
                astarGraph = closeRowElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                astarGraph = closeRowElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);
               // astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);
                astarGraph = closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw);
                connectorNumber++;
            }
        }
    }

        /*for (var f = 0; f < filteredRowsElectrodes.length; f++) {
            var numElecs = filteredRowsElectrodes[f].length;
            if (numElecs > 0) {
                astarGraph = openElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                astarGraph = openElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);
    
                var firstElectrodeX = Math.floor(filteredRowsElectrodes[f][0].cx());
                var firstElectrodeY = Math.floor(filteredRowsElectrodes[f][0].cy());
    
                var lastElectrodeX = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cx());
                var lastElectrodeY = Math.floor(filteredRowsElectrodes[f][numElecs - 1].cy());
    
                var destinationX = Math.floor(connectorBlock[connectorNumber].cx());
                var destinationY = Math.floor(connectorBlock[connectorNumber].cy());
    
    
    
                var path1 = findPath(astarGraph, [firstElectrodeX, firstElectrodeY], [destinationX, destinationY]);
                console.log(path1);
                var path2 = findPath(astarGraph, [lastElectrodeX, lastElectrodeY], [destinationX, destinationY]);
                console.log(path2);
    
                if ((path1.length == 0) && (path2.length == 0)) {
                    console.log("No routing found for column: " + f);
                    connectorNumber++;
                    continue;
                }
                if ((path1.length < path2.length) && (path1.length > 0)) {
                    for (var j = 0; j < path1.length; j++) {
                        var rect1 = draw.rect(1, 1).x(path1[j][0]).y(path1[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -5; z < 5; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              //  stroke: '#000',
                             //   fill: '#000',
                             //   opacity: 0.1
                          //  });
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1] + z)] = 1;
                            astarGraph[Math.floor(path1[j][0] + z)][Math.floor(path1[j][1])] = 1;
                            astarGraph[Math.floor(path1[j][0])][Math.floor(path1[j][1] + z)] = 1;
                        }
                    }
                }
                else {
                    for (var j = 0; j < path2.length; j++) {
                        var rect1 = draw.rect(2, 2).x(path2[j][0]).y(path2[j][1]).attr({
                            stroke: '#008',
                            fill: 'none'
                        });
                        for (var z = -10; z < 10; z++) {
                            //var rect1 = draw.rect(2, 2).x(path2[j][0] + z).y(path2[j][1] + z).attr({
                              //  stroke: '#000',
                            //    fill: '#000',
                            //    opacity: 0.1
                         //   });
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1] + z)] = 1;
                            astarGraph[Math.floor(path2[j][0] + z)][Math.floor(path2[j][1])] = 1;
                            astarGraph[Math.floor(path2[j][0])][Math.floor(path2[j][1] + z)] = 1;
                        }
                    }
    
                }
                connectorNumber++;
                //connectorNumber +=2;
                closeElectrode(astarGraph, filteredRowsElectrodes[f][0], draw);
                closeElectrode(astarGraph, filteredRowsElectrodes[f][numElecs - 1], draw);
            }
        }*/
        return astarGraph;

    
}

function freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw){
    for (var i = Math.floor(bBox.x()); i < bBox.x() + bBox.width(); i++) {
        for (var j = Math.floor(bBox.y()); j < bBox.y() + bBox.height(); j++) {
            if (!pointInsidePolygon([i, j], inputShapePointList)) {
                astarGraph[Math.floor(i)][Math.floor(j)] = 0;

                /* var rect1 = draw.rect(1, 1).x(i).y(j).attr({
                     stroke: '#000',
                     fill: '#000'
                 });*/
            }
        }
    }
    return astarGraph;
}


