function generateBoundingBox(pointList, draw) {
    var xVals = new Array();
    var yVals = new Array();

   

    for (var i = 0; i < pointList.length; i++) {
        xVals.push(pointList[i][0]);
    }

    for (var i = 0; i < pointList.length; i++) {
        yVals.push(pointList[i][1]);
    }

    xVals.sort();
    yVals.sort();
    console.log("Lowest X Val : " + xVals[0]);
    console.log("Highest X Val : " + xVals[xVals.length - 1]);

    console.log("Lowest Y Val : " + yVals[1]);
    console.log("Highest Y Val : " + yVals[yVals.length - 1]);

    var bboxWidth = xVals[xVals.length - 1] - xVals[0];
    var bboxHeight = yVals[yVals.length - 1] - yVals[0];

    console.log(bboxWidth);
    console.log(bboxHeight);

    var BBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
        fill: 'none',
        stroke: '#f84',
        opacity: 1
    });
   
    console.log(BBox.width());
    return BBox;
    
}



function pipForCircle(radius, cx, cy, inputX, inputY) {

    console.log("Radius: " + radius + " " + "Center X : " + cx + " " + "Center Y : " + cy);

    var val = Math.pow((inputX - cx), 2) + Math.pow((inputY - cy), 2) - Math.pow(radius, 2);
    if (val < 0)
        return 0;
    else if (val > 0)
        return 1;
    else
        return 0;

}
function inside(point, vs) {
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



/*function generateBoundingBox(pointList, draw, scaleFactor) {

    var xVals = new Array();
    var yVals = new Array();



    for (var i = 0; i < pointList.length; i++) {
        xVals.push(pointList[i][0]);
    }

    for (var i = 0; i < pointList.length; i++) {
        yVals.push(pointList[i][1]);
    }

    xVals.sort();
    yVals.sort();
    console.log("Lowest X Val : " + xVals[0]);
    console.log("Highest X Val : " + xVals[xVals.length - 1]);

    console.log("Lowest Y Val : " + yVals[1]);
    console.log("Highest Y Val : " + yVals[yVals.length - 1]);

    var bboxWidth = xVals[xVals.length - 1] - xVals[0];
    var bboxHeight = yVals[yVals.length - 1] - yVals[0];

    console.log(bboxWidth);
    console.log(bboxHeight);

    
    var boundingBox = draw.rect(bboxWidth, bboxHeight).addClass('pathBox').move(xVals[0], yVals[0]).attr({
        fill: 'none',
        stroke: '#f84',
        opacity: 1
    });
    boundingBox.scale(scaleFactor, scaleFactor);

}*/