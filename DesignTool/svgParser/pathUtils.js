function getPathDimensions(inputPointList) {
    var xCoords = new Array();
    var yCoords = new Array();

    for (var i = 0; i < inputPointList.length; i++) {
        xCoords[i] = inputPointList[i][0];
        yCoords[i] = inputPointList[i][1];
    }
    xCoords.sort(function (a, b) { return a - b });
    yCoords.sort(function (a, b) { return a - b });

    var width = xCoords[xCoords.length - 1] - xCoords[0];
    var height = yCoords[yCoords.length - 1] - yCoords[0];

    return [xCoords[0], yCoords[0], width, height];

}

function scalePoints(scalingValue, pointList) {
    var scaledPoints = new Array();
    var point = new Array();
    for (var i = 0; i < pointList.length; i++) {
        point[0] = pointList[i][0] * scalingValue;
        point[1] = pointList[i][1] * scalingValue;
        scaledPoints.push(point);
        point = [];
    }
    return scaledPoints;
}
function convertPointListToString(pointList) {
    var pointString = "";
    for (var i = 0; i < pointList.length; i++) {
        pointString = pointString + pointList[i].toString();
        pointString = pointString + " ";
    }
    return pointString;
}
function convertpointStringToPointList(pointString) {
    var res = pointString.split(" ");
    var pointList = new Array();
    var point = new Array();
    for (var i = 0; i < res.length - 1; i++) {
        var temp = res[i].split(',');
        point[0] = parseFloat(temp[0]);
        point[1] = parseFloat(temp[1]);
        pointList.push(point);
        point = [];
    }
    return pointList;
}
function getPointListForRectangle(x, y, width, height) {
    x = parseFloat(x);
    y = parseFloat(y);
    width = parseFloat(width);
    height = parseFloat(height);
    var pointList = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
    return pointList;
    
}