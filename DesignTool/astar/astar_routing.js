// the world grid: a 2d array of tiles
var astarGraph = [[]];

// size in the astarGraph in sprite tiles
var astarGraphWidth = 1000;
var astarGraphHeight = 1000;

// size of a tile in pixels
var tileWidth = 1;
var tileHeight = 1;

// start and end of path
var pathStart = [astarGraphWidth, astarGraphHeight];
var pathEnd = [0, 0];
var currentPath = [];

function init_AStar(graph, width, height, tileHeight, tileWidth) {
    astarGraph = graph;
    astarGraphWidth = width;
    astarGraphHeight = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    pathStart = [astarGraphWidth, astarGraphHeight];
    pathEnd = [0, 0];
    currentPath = [];

    return astarGraph;
}

function getAstarGraph() {
    return astarGraph;
}

function createAstarGraphWithBoundary(astargraph, pointList) {
    console.log('Creating astarGraph...');

    for (var x = 0; x < astarGraphWidth; x++) {
        astarGraph[x] = [];

        for (var y = 0; y < astarGraphHeight; y++) {

            if (pointInsidePolygon([x, y], pointList))
                astarGraph[x][y] = 0;
            else
                astarGraph[x][y] = 1;
        }
    }
    return astarGraph;

}

function createAstarGraph(astarGraph) {
    console.log('Creating astarGraph...');

    // create emptiness
    for (var x = 0; x < astarGraphWidth; x++) {
        astarGraph[x] = [];

        for (var y = 0; y < astarGraphHeight; y++) {
            astarGraph[x][y] = 0;
        }
    }
    return astarGraph;

    // scatter some walls
	/*for (var x=0; x < astarGraphWidth; x++)
	{
		for (var y=0; y < astarGraphHeight; y++)
		{
			if (Math.random() > 0.75)
			astarGraph[x][y] = 1;
		}
	}*/

    // calculate initial possible path
    // note: unlikely but possible to never find one...
    /*currentPath = [];
    while (currentPath.length == 0) {
        //pathStart = [Math.floor(Math.random()*astarGraphWidth),Math.floor(Math.random()*astarGraphHeight)];
        pathStart = [1, 1];
        console.log(pathStart);

        //pathEnd = [Math.floor(Math.random()*astarGraphWidth),Math.floor(Math.random()*astarGraphHeight)];
        pathEnd = [14, 14];
        console.log(pathEnd);
        //pathStart = []
        if (astarGraph[pathStart[0]][pathStart[1]] == 0)
            currentPath = findPath(astarGraph, pathStart, pathEnd);
        console.log(currentPath);*/
    //}
}

function findPath(world, pathStart, pathEnd) {
    // shortcuts for speed
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    // the world data are integers:
    // anything higher than this number is considered blocked
    // this is handy is you use numbered sprites, more than one
    // of which is walkable road, grass, mud, etc
    var maxWalkableTileNum = 0;

    // keep track of the world dimensions
    // Note that this A-star implementation expects the astarGraph array to be square: 
    // it must have equal height and width. If your game astarGraph is rectangular, 
    // just fill the array with dummy values to pad the empty space.
    var astarGraphWidth = astarGraph[0].length;
    var astarGraphHeight = astarGraph.length;
    var astarGraphSize = astarGraphWidth * astarGraphHeight;

    // which heuristic should we use?
    // default: no diagonals (Manhattan)
    //var distanceFunction = ManhattanDistance;
    //var findNeighbours = function(){}; // empty
    var distanceFunction = EuclideanDistance;
    var findNeighbours = DiagonalNeighbours;

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

    // distanceFunction functions
    // these return how far away a point is to another

    function ManhattanDistance(Point, Goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }

    function DiagonalDistance(Point, Goal) {	// diagonal movement - assumes diag dist is 1, same as cardinals
        return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }

    function EuclideanDistance(Point, Goal) {	// diagonals are considered a little farther than cardinal directions
        // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
        // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
        return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
    }

    // Neighbours functions, used by findNeighbours function
    // to locate adjacent available cells that aren't blocked

    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function Neighbours(x, y) {
        var N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            myN = N > -1 && canWalkHere(x, N),
            myS = S < astarGraphHeight && canWalkHere(x, S),
            myE = E < astarGraphWidth && canWalkHere(E, y),
            myW = W > -1 && canWalkHere(W, y),
            result = [];
        if (myN)
            result.push({ x: x, y: N });
        if (myE)
            result.push({ x: E, y: y });
        if (myS)
            result.push({ x: x, y: S });
        if (myW)
            result.push({ x: W, y: y });
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    // returns every available North East, South East,
    // South West or North West cell - no squeezing through
    // "cracks" between two diagonals
    function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && canWalkHere(E, N))
                result.push({ x: E, y: N });
            if (myW && canWalkHere(W, N))
                result.push({ x: W, y: N });
        }
        if (myS) {
            if (myE && canWalkHere(E, S))
                result.push({ x: E, y: S });
            if (myW && canWalkHere(W, S))
                result.push({ x: W, y: S });
        }
    }

    // returns every available North East, South East,
    // South West or North West cell including the times that
    // you would be squeezing through a "crack"
    function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1;
        myS = S < astarGraphHeight;
        myE = E < astarGraphWidth;
        myW = W > -1;
        if (myE) {
            if (myN && canWalkHere(E, N))
                result.push({ x: E, y: N });
            if (myS && canWalkHere(E, S))
                result.push({ x: E, y: S });
        }
        if (myW) {
            if (myN && canWalkHere(W, N))
                result.push({ x: W, y: N });
            if (myS && canWalkHere(W, S))
                result.push({ x: W, y: S });
        }
    }

    // returns boolean value (astarGraph cell is available and open)
    function canWalkHere(x, y) {
        return ((astarGraph[x] != null) &&
            (astarGraph[x][y] != null) &&
            (astarGraph[x][y] <= maxWalkableTileNum));
    };

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent: Parent,
            // array index of this Node in the astarGraph linear array
            value: Point.x + (Point.y * astarGraphWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the heuristic estimated cost
            // of an entire path using this node
            f: 0,
            // the distanceFunction cost to get
            // from the starting point to this node
            g: 0
        };

        return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
        var mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });
        // create an array that will contain all astarGraph cells
        var AStar = new Array(astarGraphSize);
        // list of currently open Nodes
        var Open = [mypathStart];
        // list of closed Nodes
        var Closed = [];
        // list of the final output array
        var result = [];
        // reference to a Node (that is nearby)
        var myNeighbours;
        // reference to a Node (that we are considering now)
        var myNode;
        // reference to a Node (that starts a path in question)
        var myPath;
        // temp integer variables used in the calculations
        var length, max, min, i, j;
        // iterate through the open list until none are left
        while (length = Open.length) {
            max = astarGraphSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                myNeighbours = Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the astarGraph graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until the Open list is empty
        return result;
    }

    // actually calculate the a-star path!
    // this returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();

} 
