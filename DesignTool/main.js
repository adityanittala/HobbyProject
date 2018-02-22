// Your code here!
var svgContent;
function generateSampleSensor() {
    console.log("Generating Sensor");
    var ellipseWidth = 10;
    var ellipseHeight = 10;


    var draw = SVG('drawing').size(500, 500);
    var rect = draw.ellipse(ellipseWidth, ellipseHeight).fill('#f06').x(40).y(50);

   /* for (var i = 0; i < 5; i++) {
        var ellipse1 = draw.ellipse(ellipseWidth, ellipseHeight).fill('#f06');
    }*/

    svgContent = draw.svg();
}
function generateSensor() {
    console.log("Generating Electrodes!!");
    document.getElementById('result').style.display = "block";
    /*var images = new Array();
    document.getElementById('result').style.display = "block";
    images[0] = "s2.png";
    images[1] = "img1.gif";
    images[2] = "s6.png";*/


    draw.viewbox(0, 0, 300, 520);


    var svg = document.getElementsByTagName('svg')[0];
    var inputPolygon = document.getElementById("inputShape");
    var boundaryPolygon = document.getElementById("boundaryShape");
    var connector = document.getElementById("connector");

    var inputPointString = inputPolygon.getAttribute("points");
    //  document.getElementById("inputPointList").innerHTML = inputPointString;
    console.log(inputPointString);

    var boundaryPointString = boundaryPolygon.getAttribute("points");
    ///  document.getElementById("boundaryPointList").innerHTML = boundaryPointString;
    console.log(boundaryPointString);

    var connectorPointString = connector.getAttribute("points");
    //  document.getElementById("connectorPointList").innerHTML = connectorPointString;
    console.log(connectorPointString);



    var inputShapePointList = convertpointStringToPointList(inputPointString);
    var boundaryShapePointList = convertpointStringToPointList(boundaryPointString);
    var connectorPointList = convertpointStringToPointList(connectorPointString);

    var gridElementSize = 1;
    var astarGraph = [[]];
    astarGraph = init_AStar(astarGraph, 600, 1040, 1, 1);
    createAstarGraphWithBoundary(astarGraph, boundaryShapePointList);




    var inputPolygonShape = draw.polygon(inputPointString).fill('none').stroke({ width: 1 })
    inputPolygonShape.fill('none');
    inputPolygonShape.stroke({ color: '#080', width: 1, linecap: 'round', linejoin: 'round' });

    var bBox = generateBoundingBox(inputShapePointList, draw, false);
    console.log(bBox.x());

    var numRows = Math.floor(bBox.height() / (electrodeSize * 1.5));
    var numColumns = Math.floor(bBox.width() / (electrodeSize * 1.5));
    console.log("Rows : " + numRows + ", Columns : " + numColumns);

    if (numRows < 3 && numColumns < 3) {
        alert("Input shape too small!!!! Please provide a larger polygon");
        //return;
    }

    rowElectrodes = generateRows(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, bBox.x(), bBox.y(), rowElectrodes, draw);
    columnElectrodes = generateColumns(numRows, numColumns, electrodeSize, electrodeSpacing, rowSpacing, bBox.x() + (electrodeSpacing * 0.5), bBox.y() - (electrodeSpacing * 0.5), columnElectrodes, draw);

    rowElectrodes = filterRows(rowElectrodes, columnElectrodes, inputShapePointList, numRows, numColumns, draw, );
    columnElectrodes = filterColumns(rowElectrodes, columnElectrodes, inputShapePointList, numRows, numColumns, draw);

    rowElectrodes = checkForDanglingRowElectrodes(rowElectrodes, columnElectrodes, inputShapePointList, draw);
    columnElectrodes = checkForDanglingColumnElectrodes(rowElectrodes, columnElectrodes, inputShapePointList, draw);

    filteredRowElectrodes = getActiveElectrodes(rowElectrodes);
    filteredColumnElectrodes = getActiveElectrodes(columnElectrodes);

    console.log("X : " + bBox.x() + "Y: " + bBox.y() + "Width: " + bBox.width() + "Height: " + bBox.height());
    astarGraph = blockRegionOutSidePolygon(bBox, inputShapePointList, draw);



    astarGraph = seriesConnectColumns(numRows, numColumns, filteredRowElectrodes, filteredColumnElectrodes, astarGraph, draw, txLayer);

    astarGraph = seriesConnectRows(numRows, numColumns, filteredRowElectrodes, filteredColumnElectrodes, astarGraph, draw, rxLayer);

    astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);

    var connectorBlock = new Array();

    var connectorDimensions = getPathDimensions(connectorPointList);
    if (connectorDimensions[2] > connectorDimensions[3]) {
        console.log("Horizontal Connector");
        if ((connectorDimensions[2] / 10) < (numRows + numColumns)) {
            alert("Size of the connector short for the Sensor!! Generating appropriate Connector!!");
            connectorBlock = generateConnector(astarGraph, numRows + numColumns, connectorDimensions[0], connectorDimensions[1], 10, connectorDimensions[3], draw);
        } else {
            connectorBlock = generateConnector(astarGraph, connectorDimensions[2] / 10, connectorDimensions[0], connectorDimensions[1], 10, connectorDimensions[3], draw);
        }
    } else {
        console.log("Vertical Connector");
        if ((connectorDimensions[3] / 10) <= (numRows + numColumns)) {
            alert("Size of the connector short for the Sensor!!");
            connectorBlock = generateVerticalConnector(astarGraph, numRows + numColumns, connectorDimensions[0], connectorDimensions[1], connectorDimensions[2], 10, draw);
        } else {
            connectorBlock = generateVerticalConnector(astarGraph, connectorDimensions[3] / 10, connectorDimensions[0], connectorDimensions[1], connectorDimensions[2], 10, draw);
        }
    }

    astarGraph = connectorBlock[0];
    connectorBlock = connectorBlock[1];

    astarGraph = blockAllElectrodes(astarGraph, filteredRowElectrodes, filteredColumnElectrodes, draw);


    astarGraph = routeColumnsToConnector(astarGraph, filteredColumnElectrodes, bBox, inputShapePointList, connectorBlock, 0, draw, txLayer);
    astarGraph = freeWallOutsideInputShape(astarGraph, bBox, inputShapePointList, draw);
    astarGraph = blockAllElectrodes(astarGraph, filteredRowElectrodes, filteredColumnElectrodes, draw);
    astarGraph = routeRowsToConnector(astarGraph, filteredRowElectrodes, bBox, inputShapePointList, connectorBlock, numColumns, draw, rxLayer);

    //   renderTXLayer();
    show_save();
    svgContent = draw.svg();


}

function saveSVG() {
    console.log("Saving Svg");

    var uriContent = "data:application/octet-stream," + encodeURIComponent(svgContent);
    newWindow = window.open(uriContent, 'svgDocument');
}

function handleFileSelection() {
    var uploadDiv = document.getElementById('uploadDiv');
    var selectSVG = document.getElementById('selectSVG');
    uploadDiv.removeChild(selectSVG);
    var file = filePhoto.files[0],
        reader = new FileReader();

    waitForTextReadComplete(reader);
    reader.readAsText(file);
}

function parseTextAsXml(text) {
    var parser = new DOMParser(),
        xmlDom = parser.parseFromString(text, "text/xml");
    var svg = document.getElementsByTagName('svg')[0]; //Get svg element

    parseSVG(xmlDom, svg);
    convertPathsToPolygons(document, svg);
}

function waitForTextReadComplete(reader) {
    reader.onloadend = function (event) {
        var text = event.target.result;

        parseTextAsXml(text);
    }
}