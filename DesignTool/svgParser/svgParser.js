function parseSVG(xmlDom, svg) {

    var svgInfo = xmlDom.getElementsByTagName("svg");
    svg.setAttribute("viewbox", svgInfo[0].getAttribute("viewBox"));

        var boundaryPathStroke = "#808080";
        var inputPathStroke = "#008000";
        var pathsInfo = xmlDom.getElementsByTagName("path");
        var styleInfo = (pathsInfo[0].getAttribute("style")).toString();

        if (styleInfo.indexOf(boundaryPathStroke) != -1) {
            var boundaryShape = pathsInfo[0];
            boundaryShape.setAttribute("id", "boundaryShape");
            boundaryShape.setAttribute("style", styleInfo);
            boundaryShape.setAttribute("d", pathsInfo[0].getAttribute('d'));
            svg.appendChild(boundaryShape);
        }
        else if (styleInfo.indexOf(inputPathStroke) != -1) {
            var inputShape = pathsInfo[0];
            inputShape.setAttribute("id", "inputShape");
            inputShape.setAttribute("style", styleInfo);
            inputShape.setAttribute("d", pathsInfo[0].getAttribute('d'));
            svg.appendChild(inputShape);
        }

        pathsInfo = xmlDom.getElementsByTagName("path");
        styleInfo = (pathsInfo[0].getAttribute("style")).toString();

        if (styleInfo.indexOf(boundaryPathStroke) != -1) {
            
            var boundaryShape = pathsInfo[0];
            boundaryShape.setAttribute("id", "boundaryShape");
            boundaryShape.setAttribute("style", styleInfo);
            boundaryShape.setAttribute("d", pathsInfo[0].getAttribute('d'));
            svg.appendChild(boundaryShape);
            console.log("Boundary Width: " + boundaryShape.getBoundingClientRect().width +
                ", Height: " + boundaryShape.getBoundingClientRect().height);
        }
        else if (styleInfo.indexOf(inputPathStroke) != -1) {
            var inputShape = pathsInfo[0];
            inputShape.setAttribute("id", "inputShape");
            inputShape.setAttribute("style", styleInfo);
            inputShape.setAttribute("d", pathsInfo[0].getAttribute('d'));
            svg.appendChild(inputShape);
        }

        pathsInfo = xmlDom.getElementsByTagName("rect");
        styleInfo = pathsInfo[0].getAttribute("style");
        var connector = pathsInfo[0];
        connector.setAttribute("id", "connector");
        connector.setAttribute("style", styleInfo);
        connector.setAttribute("x", pathsInfo[0].getAttribute("x"));
        connector.setAttribute("y", pathsInfo[0].getAttribute("y"));
        connector.setAttribute("width", pathsInfo[0].getAttribute("width"));
        connector.setAttribute("height", pathsInfo[0].getAttribute("height"));

        svg.appendChild(connector);
   
}
function convertPathsToPolygons(document, svg) {
    var svg = document.getElementsByTagName('svg')[0];
    var inputPolygon = document.getElementById("inputShape");
  //  console.log(inputPolygon.getBoundingClientRect());
    var boundaryPolygon = document.getElementById("boundaryShape");
  //  console.log(boundaryPolygon.getBoundingClientRect());
    var connector = document.getElementById("connector");
   // console.log(connector.getBoundingClientRect());

    var point = new Array();
    var inputShapePointList = new Array();
    var boundaryShapePointList = new Array();

    var inputPointString = "";
    var boundaryPointString = "";
    for (var i = 0; i < inputPolygon.getTotalLength(); i += 3) {
        // inputPolygon.getPointAtLength(i);
        point = [];
        point[0] = inputPolygon.getPointAtLength(i).x;
        point[1] = inputPolygon.getPointAtLength(i).y;
        //console.log(point);
        inputShapePointList.push(point);
        inputPointString = inputPointString + point.toString();
        inputPointString = inputPointString + " ";
    }
  //  inputShapePointList = scalePoints(3.77, inputShapePointList);
  //  inputPointString = convertPointListToString(inputShapePointList);
    for (var i = 0; i < boundaryPolygon.getTotalLength(); i += 3) {
        // inputPolygon.getPointAtLength(i);
        point = [];
        point[0] = boundaryPolygon.getPointAtLength(i).x;
        point[1] = boundaryPolygon.getPointAtLength(i).y;
        //console.log(point);
        boundaryShapePointList.push(point);
        boundaryPointString = boundaryPointString + point.toString();
        boundaryPointString = boundaryPointString + " ";
    }
  //  boundaryShapePointList = scalePoints(3.77, boundaryShapePointList);
  //  boundaryPointString = convertPointListToString(boundaryShapePointList);

    var inputGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    inputGroup.setAttribute("id", "inputGroup");

    var boundaryShape = document.getElementById("boundaryShape");
    svg.removeChild(boundaryShape);
    var inputShape = document.getElementById("inputShape");
    svg.removeChild(inputShape);

    var input = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    input.setAttribute("id", "inputShape");
    // boundary.setAttribute("style", styleInfo);
    input.style.stroke = "#008000";
    input.style.strokeWidth = "1px";
    input.style.linecap = "round";
    input.style.linejoin = "round";
    input.style.fill = "none";
    input.setAttribute("points", inputPointString);
    inputGroup.appendChild(input);
    svg.appendChild(input);

    var boundary = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    boundary.setAttribute("id", "boundaryShape");
    // boundary.setAttribute("style", styleInfo);
    boundary.style.stroke = "#808080";
    boundary.style.strokeWidth = "1px"
    boundary.style.fill = "none";
    boundary.style.linecap = "round";
    boundary.style.linejoin = "round";
    boundary.setAttribute("points", boundaryPointString);
    inputGroup.appendChild(boundary);
    svg.appendChild(boundary);

    var conn = document.getElementById("connector");
    var connectorPoints = new Array();
    connectorPoints = getPointListForRectangle(conn.getAttribute("x"), conn.getAttribute("y"), conn.getAttribute("width"), conn.getAttribute("height"));
   // connectorPoints = scalePoints(3.77, connectorPoints);
    var connectorPointString = convertPointListToString(connectorPoints);

    var connectorBlock = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    //connectorBlock = document.getElementById("connector");
    connectorBlock.setAttribute("id", "connector");
    connectorBlock.style.fill = "#000000";
    connectorBlock.style.stroke = "#000000";
    connectorBlock.style.strokeWidth = "1px"
    connectorBlock.style.linecap = "round";
    connectorBlock.setAttribute("points", connectorPointString);
    
    svg.removeChild(conn);
    inputGroup.appendChild(connectorBlock);
    svg.appendChild(connectorBlock);

}

