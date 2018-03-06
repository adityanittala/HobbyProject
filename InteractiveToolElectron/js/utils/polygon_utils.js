
/*
    Point Inside Polygon Algorithm. Checks if a given point is inside a polygon. Inputs are the point and the vertex set(vs) which maked the polygon
*/

function pointInsidePolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function isElectrodeInsidePolygon(pointList, vs) {
    if ((pointInsidePolygon(pointList[0], vs)) && (pointInsidePolygon(pointList[1]), vs) && (pointInsidePolygon(pointList[2], vs)) && (pointInsidePolygon(pointList[3], vs)) && (pointInsidePolygon(pointList[4], vs)))  {
        return true;
    }
    return false;

}

function pipForCircle(radius, cx, cy, inputX, inputY) {

  //  console.log("Radius: " + radius + " " + "Center X : " + cx + " " + "Center Y : " + cy);

    var val = Math.pow((inputX - cx), 2) + Math.pow((inputY - cy), 2) - Math.pow(radius, 2);
    if (val < 0)
        return 0;
    else if (val > 0)
        return 1;
    else
        return 0;

}
function generateShieldingBox(pointList, draw, isRender) {
    var xVals = new Array();
    var yVals = new Array();



    for (var i = 0; i < pointList.length; i++) {
        xVals.push(pointList[i][0]);
    }

    for (var i = 0; i < pointList.length; i++) {
        yVals.push(pointList[i][1]);
    }

    xVals.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
        return a - b
    });
    yVals.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
        return a - b
    });
    /*   console.log("Lowest X Val : " + xVals[0]);
       console.log("Highest X Val : " + xVals[xVals.length - 1]);
   
       console.log("Lowest Y Val : " + yVals[1]);
       console.log("Highest Y Val : " + yVals[yVals.length - 1]);*/

    var bboxWidth = Math.abs(xVals[xVals.length - 1] - xVals[0]);
    var bboxHeight = Math.abs(yVals[yVals.length - 1] - yVals[0]);

    console.log(xVals[0]);
    console.log(yVals[0]);

    if (isRender) {
        var BBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
            fill: '#888',
            stroke: '#888',
            opacity: 1
        });
    } else {
        var BBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
            fill: '#888',
            stroke: '#888',
            opacity: 0
        });
    }


    // console.log(BBox.width());
    return BBox;

}


function generateBoundingBox(pointList, draw, isRender) {
    var xVals = new Array();
    var yVals = new Array();



    for (var i = 0; i < pointList.length; i++) {
        xVals.push(pointList[i][0]);
    }

    for (var i = 0; i < pointList.length; i++) {
        yVals.push(pointList[i][1]);
    }

    xVals.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
        return a - b
    });
    yVals.sort(function (a, b) { //Array now becomes [7, 8, 25, 41]
        return a - b
    });
 /*   console.log("Lowest X Val : " + xVals[0]);
    console.log("Highest X Val : " + xVals[xVals.length - 1]);

    console.log("Lowest Y Val : " + yVals[1]);
    console.log("Highest Y Val : " + yVals[yVals.length - 1]);*/

    var bboxWidth = Math.abs(xVals[xVals.length - 1] - xVals[0]);
    var bboxHeight = Math.abs(yVals[yVals.length - 1] - yVals[0]);

    console.log(xVals[0]);
    console.log(yVals[0]);

    if (isRender) {
        var BBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
            fill: 'none',
            stroke: '#f84',
            opacity: 1
        });
    } else {
        var BBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
            fill: 'none',
            stroke: '#f84',
            opacity: 0
        });
    }
   

   // console.log(BBox.width());
    return BBox;

}

function isEntireElectrodeInCircle(points, radius, cx, cy) {

    var val1 = Math.pow((points[0] - cx), 2) + Math.pow((points[1] - cy), 2) - Math.pow(radius, 2);
    var val2 = Math.pow((points[2] - cx), 2) + Math.pow((points[3] - cy), 2) - Math.pow(radius, 2);
    var val3 = Math.pow((points[4] - cx), 2) + Math.pow((points[5] - cy), 2) - Math.pow(radius, 2);
    var val4 = Math.pow((points[6] - cx), 2) + Math.pow((points[7] - cy), 2) - Math.pow(radius, 2);

    if ((val1 < 0) && (val2 < 0) && (val3 < 0) && (val4 < 0))
        return 0
    else
        return 1;

}

