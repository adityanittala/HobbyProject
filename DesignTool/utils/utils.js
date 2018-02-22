/*This function renders a grid onto the webpage.
    Input : 
        numRows - Number of Rows in the Grid
        numColumns - Number of Columns in the Grid
        startX - x co-ordinate of the starting point
        startY - x co-ordinate of the starting point
        unit   - size of the each grid element
        gridElements - 2D array containing each of the grid elements


*/
function displayGrid(numRows, numColumns, startX, startY, unit, gridElements, draw) {

    var rowElements = new Array();

    for (var j = 0 ; j < numRows; j++) {
        for (var i = 0 ; i < numColumns; i++) {
            var rect1 = draw.rect(unit, unit).x(startX + (unit * i)).y(startY + (unit * j)).attr({
                stroke: '#bbb',
                //opacity: 0.1
                fill: 'none'
                //opacity: 0.2
            });
            rect1.x = startX + (unit * i);
            rect1.y = startY + (unit * j);
            rect1.name = "tile" + j + i;
            rect1.isWall = "false";
            rowElements.push(rect1);


        }
        //   for (var k = 0 ; k < rowElements.length; k++)

        gridElements.push(rowElements);
        rowElements = [];
        // gridElements[i] = rowElements;

    }

    return gridElements;
}

function generateEmptyGraph(numRows, numColumns, graph) {
    var rowElements = new Array();
    for (var i = 0 ; i < numRows; i++) {
        rowElements = [];
        for (var j = 0 ; j < numColumns; j++) {
            rowElements[j] = 1;
        }
        graph.push(rowElements);   
    }
    return graph;
}

function closeConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw) {
    var startX = connectorBlock[connectorNumber].x();
    var startY = connectorBlock[connectorNumber].y();

    for (var x = startX; x <= startX + connectorBlock[connectorNumber].width(); x++) {
        for (var y = startY; y <= startY + connectorBlock[connectorNumber].height(); y++) {
            /*var rect1 = draw.rect(1, 1).x(x).y(y).attr({
                stroke: '#800',
                fill: '#800',
                opacity: 0.2
            });*/
            astarGraph[Math.floor(x)][Math.floor(y)] = 1;
        }
    }
    return astarGraph;
}

function openConnectorBlock(astarGraph, connectorBlock, connectorNumber, draw) {

    var startX = connectorBlock[connectorNumber].x();
    var startY = connectorBlock[connectorNumber].y();

    for (var x = startX; x <= startX + connectorBlock[connectorNumber].width(); x++) {
        for (var y = startY; y <= startY + (connectorBlock[connectorNumber].height() ); y++) {
           /* var rect1 = draw.rect(1, 1).x(x).y(y).attr({
                stroke: '#800',
                fill: '#800',
                opacity: 0.2
            });*/
            astarGraph[Math.floor(x)][Math.floor(y)] = 0;
        }
    }
    return astarGraph;

}

function generateConnector(astarGraph, pinNumber, startX, startY, width, height, draw) {
    var connectorBlock = new Array();

    for (var i = 0; i < pinNumber; i++) {
        connectorBlock[i] = draw.rect(width, height).move(startX, startY).addClass('connector').attr({
            fill: '#000',
            stroke: '#000',
            opacity: 1
        });
        startX += width;
        astarGraph = closeConnectorBlock(astarGraph, connectorBlock, i, draw);
    }

    /*connectorBlock[0] = draw.rect(20, 20).move(300, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });
    connectorBlock[1] = draw.rect(20, 20).move(320, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });

    connectorBlock[2] = draw.rect(20, 20).move(340, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });

    connectorBlock[3] = draw.rect(20, 20).move(360, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });
    connectorBlock[4] = draw.rect(20, 20).move(380, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });

    connectorBlock[5] = draw.rect(20, 20).move(400, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });
    connectorBlock[6] = draw.rect(20, 20).move(420, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });
    connectorBlock[7] = draw.rect(20, 20).move(440, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });
    connectorBlock[8] = draw.rect(20, 20).move(460, 500).addClass('connector').attr({
        fill: '#000',
        stroke: '#000',
        opacity: 1
    });*/
    return [astarGraph, connectorBlock];
}

function generateVerticalConnector(astarGraph, pinNumber, startX, startY, width, height, draw) {
    var connectorBlock = new Array();

    for (var i = 0; i < pinNumber; i++) {
        connectorBlock[i] = draw.rect(width, height).move(startX, startY).addClass('connector').attr({
            fill: '#000',
            stroke: '#000',
            opacity: 1
        });
        startY += height;
        astarGraph = closeConnectorBlock(astarGraph, connectorBlock, i, draw);
    }

    return [astarGraph, connectorBlock];
}

function blockBottomHalfOfConnector(astarGraph, connectorBlock, draw) {

    for (var i = 0; i < connectorBlock.length; i++) {
        var startX = connectorBlock[i].x() + (connectorBlock[i].width() / 2);
       // var startY = connectorBlock[i].y() + (connectorBlock[i].height() / 2);

        var startY = connectorBlock[i].cy();

        for (var b = startX + 1; b < startX + connectorBlock[i].width(); b++) {
            for (var c = startY + 1; c < startY + connectorBlock[i].height(); c++) {

                /*var rect1 = draw.rect(1, 1).x(b).y(c).attr({
                    stroke: '#fff',
                    fill: '#fff',
                    opacity: 0.9
                });*/
                astarGraph[Math.floor(b)][Math.floor(c)] = 1;
            }
        }

       
    }
    return astarGraph;
}

function getActiveRowNumbers(filteredRowElectrodes) {
    var startIndex, endIndex;

  /*  var count = 0;
    for (var f = 0; f < filteredRowElectrodes.length; f++) {
        var numElecs = filteredRowElectrodes[f].length;
        if (numElecs > 0) {

            if ((count == 0) && (f == 0)) {
                startIndex = count;
                continue;
            }

            if (count == 0) {
                count++;
                startIndex = count;
                continue;
            }
            count++;
            endIndex = count;
        }
    }*/
    for (var i = 0; i < filteredRowElectrodes.length; i++) {
        var numElecs = filteredRowElectrodes[i].length;
        if (numElecs > 0) {
            startIndex = i;
            break;
        }
    }

    for (var j = filteredRowElectrodes.length; j > 0; j--) {
        var numElecs = filteredRowElectrodes[j - 1].length;
        if (numElecs > 0) {
            endIndex = j - 1;
            break;
        }
    }
    return [startIndex, endIndex];
}

function renderAstarGrid(astarGraph, draw) {
    console.log("Rendering A* grid");
    for (var x = 0; x < astarGraphWidth; x++) {
        for (var y = 0; y < astarGraphHeight; y++) {
            if (astarGraph[x][y] == 0) {
                var rect1 = draw.rect(1, 1).x(x).y(y).attr({
                    stroke: '#000',
                    fill: 'none',
                    opacity: 0.2
                });
            }
        }
    }
}
