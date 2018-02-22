function generateRows(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, startX, startY, electrodeArray, draw) {

    console.log("Generating Rows");
    var rowElectrodes = new Array();

    for (var i = 0; i < numRows + 1; i++) {
        rowElectrodes = [];

        for (var j = 0 ; j < numColumns + 1; j++) {
            var rect1 = draw.rect(electrodeSize, electrodeSize).x(startX + (electrodeSpacing * j)).y(startY).attr({
                fill: '#008'
            }).rotate(45);
            rect1.type = "RX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";

            
            rowElectrodes[j] = rect1;
            // console.log(i + " " + j);
        }
        startY = startY + rowSpacing;
        electrodeArray.push(rowElectrodes);
    }
    return electrodeArray;
}



function generateColumns(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, startX, startY, electrodeArray, draw) {

    console.log("Generating Columns");
    var columnElectrodes = new Array();

    for (var i = 0; i < numColumns + 1 ; i++) {
        columnElectrodes = [];

        for (var j = 0 ; j < numRows + 1; j++) {
            var rect1 = draw.rect(electrodeSize, electrodeSize).x(startX).y(startY + electrodeSpacing * j).attr({
                fill: '#800'
            }).rotate(45);
            rect1.type = "TX";
            rect1.row = i;
            rect1.column = j;
            rect1.status = "Active";


            columnElectrodes[j] = rect1;
        }
        startX = startX + rowSpacing;
        electrodeArray[i] = columnElectrodes;
    }
    return electrodeArray;
}

function filterRows(rowElectrodes, columnElectrodes, vertexSet, numRows, numColumns, draw) {

    for (var i = 0; i < numRows+1; i++) {

        for (var j = 0; j < numColumns+1; j++) {

            if (rowElectrodes[i][j] != undefined) {
                if (!pointInsidePolygon([(rowElectrodes[i][j].cx() - (rowElectrodes[i][j].width() * Math.sqrt(2)) / 2), rowElectrodes[i][j].cy()], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([(rowElectrodes[i][j].cx() + (rowElectrodes[i][j].width() * Math.sqrt(2)) / 2), rowElectrodes[i][j].cy()], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([rowElectrodes[i][j].cx(), (rowElectrodes[i][j].cy() + (rowElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([rowElectrodes[i][j].cx(), (rowElectrodes[i][j].cy() - (rowElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    rowElectrodes[i][j].status = "InActive";
                    rowElectrodes[i][j].remove();
                    continue;
                }
            }
           
        }
        

    }
    return rowElectrodes;
}



function filterColumns(rowElectrodes, columnElectrodes, vertexSet, numRows, numColumns, draw) {

    for (var i = 0; i < numColumns + 1; i++) {

        for (var j = 0; j < numRows + 1; j++) {

           // console.log("i: " + i + " j: " + j);
            if (columnElectrodes[i][j] != undefined) {
                if (!pointInsidePolygon([(columnElectrodes[i][j].cx() - (columnElectrodes[i][j].width() * Math.sqrt(2)) / 2), columnElectrodes[i][j].cy()], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([(columnElectrodes[i][j].cx() + (columnElectrodes[i][j].width() * Math.sqrt(2)) / 2), columnElectrodes[i][j].cy()], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([columnElectrodes[i][j].cx(), (columnElectrodes[i][j].cy() + (columnElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }
                else if (!pointInsidePolygon([columnElectrodes[i][j].cx(), (columnElectrodes[i][j].cy() - (columnElectrodes[i][j].height() * Math.sqrt(2) / 2))], vertexSet)) {
                    columnElectrodes[i][j].status = "InActive";
                    columnElectrodes[i][j].remove();
                    continue;
                }

            }
           
        }


    }
    return columnElectrodes;
}

function checkForDanglingRowElectrodes(rowElectrodes, columnElectrodes, vertexSet, draw) {
    var rowNumber, columnNumber;
    var neighbouringElectrodes = new Array();
    var count = 0;

    for (var i = 0; i < rowElectrodes.length; i++) {
        for (var j = 0; j < columnElectrodes.length ; j++){

            if (rowElectrodes[i][j] != undefined) {
                if (rowElectrodes[i][j].status == "InActive")
                    continue;
                else {
                    rowNumber = rowElectrodes[i][j].row;
                    columnNumber = rowElectrodes[i][j].column;

                    neighbouringElectrodes[0] = columnElectrodes[columnNumber - 1][rowNumber];
                    neighbouringElectrodes[1] = columnElectrodes[columnNumber - 1][rowNumber + 1];
                    neighbouringElectrodes[2] = columnElectrodes[columnNumber][rowNumber];
                    neighbouringElectrodes[3] = columnElectrodes[columnNumber][rowNumber + 1];
                    count = 0;
                    for (var x = 0; x < neighbouringElectrodes.length; x++) {
                        if (neighbouringElectrodes[x] != undefined) {
                            if (neighbouringElectrodes[x].status == "InActive") {
                                count++;
                            }
                        }
                        
                    }
                    // console.log(neighbouringElectrodes.length);
                    if (count == neighbouringElectrodes.length) {
                        console.log("Dangling Electrode:" + " RX: " + rowNumber + " TX:" + columnNumber);
                        rowElectrodes[rowNumber][columnNumber].status = "InActive";
                        rowElectrodes[rowNumber][columnNumber].remove();
                    }
                }
            }
           
        }
    }
    return rowElectrodes;
}

function checkForDanglingColumnElectrodes(rowElectrodes, columnElectrodes, vertexSet, draw) {
    var rowNumber, columnNumber;
    var neighbouringElectrodes = new Array();
    var count = 0;

    for (var i = 0; i < columnElectrodes.length; i++) {
        for (var j = 0; j < rowElectrodes.length; j++) {
           // console.log("i: " + i + " j: " + j);
            if (columnElectrodes[i][j] != undefined) {
                if (columnElectrodes[i][j].status == "InActive")
                    continue;
                else {
                    rowNumber = columnElectrodes[i][j].row;
                    columnNumber = columnElectrodes[i][j].column;

                    neighbouringElectrodes[0] = rowElectrodes[columnNumber - 1][rowNumber];
                    neighbouringElectrodes[1] = rowElectrodes[columnNumber - 1][rowNumber + 1];
                    neighbouringElectrodes[2] = rowElectrodes[columnNumber][rowNumber];
                    neighbouringElectrodes[3] = rowElectrodes[columnNumber][rowNumber + 1];


                    count = 0;
                    for (var x = 0; x < neighbouringElectrodes.length; x++) {
                        if (neighbouringElectrodes[x].status == "InActive") {
                            count++;
                        }
                    }
                    // console.log(neighbouringElectrodes.length);
                    if (count == neighbouringElectrodes.length) {
                        console.log("Dangling Electrode:" + " RX: " + rowNumber + " TX:" + columnNumber);
                        columnElectrodes[rowNumber][columnNumber].status = "InActive";
                        columnElectrodes[rowNumber][columnNumber].remove();
                    }
                }
            }
           
        }
    }
    return columnElectrodes;
}
function getActiveElectrodes(electrodeList) {

    var activeElectrodes = new Array();
    var tempArray = new Array();
    var numeElectrodesInRow;

    for (var i = 0; i < electrodeList.length; i++) {
        numeElectrodesInRow = electrodeList[i].length;
        for (var j = 0; j < numeElectrodesInRow; j++) {
            if (electrodeList[i][j].status != "InActive") {
                tempArray.push(electrodeList[i][j]);
            }
        }
        activeElectrodes.push(tempArray);
        tempArray = [];
    }
    return activeElectrodes;

}
function blockRegionOutSidePolygon(bBox, inputShapePointList, draw) {
    for (var i = Math.floor(bBox.x()); i < bBox.x() + bBox.width(); i++) {
        for (var j = Math.floor(bBox.y()); j < bBox.y() + bBox.height(); j++) {
            if (!pointInsidePolygon([i, j], inputShapePointList)) {
                astarGraph[Math.floor(i)][Math.floor(j)] = 1;

                /* var rect1 = draw.rect(1, 1).x(i).y(j).attr({
                     stroke: '#000',
                     fill: '#000'
                 });*/
            }
        }
    }

    return astarGraph;
}
