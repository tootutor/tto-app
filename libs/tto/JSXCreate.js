// JSXGraph Construction library for TTO with AngularJS scope
/*
-- Structure --
1. JSX Board
	board = JSXBoard;
2. Initial value
	initVal = {
		x     : 0,
		y     : 0,
		n     : 3,
		text  : 'Init Text',
		image : ''
	};
3. AngularJS $scope for front-end
	$scope.selectedObj = {};
	$scope.editAttr = {};
	$scope.isShowOption = false;
	$scope.isActionMode = false;
	$scope.isEditMode = false;
*/

function initBoard(id, option) {
	var board = JXG.JSXGraph.initBoard(id, option);
	board.ttoInitLength = board.objectsList.length;
	board.ttoLastLength = board.ttoInitLength;
	for (var i=0; i<board.ttoInitLength; i++) {
		board.objectsList[i].dump = false;
	}
	console.log(board);
	return board;
}

// Loop objectsList from the last time in board and add event to the dumpable object.
function addEventsToNewObjs(board, $scope) {

	// Call from addEventsToNewObjs only.
	function onEventDown() {
		if ($scope.isEditMode) {
			$scope.selectedObj = this;
			$scope.editAttr = $scope.selectedObj.getAttributes();
			$scope.$apply();
			console.log($scope.editAttr);
		} else {
			console.log('not in edit mode');
		}
	}
	
	for (var i=board.ttoLastLength; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			board.objectsList[i].on('down', onEventDown);
		}
	}
	board.ttoLastLength = board.objectsList.length;
}

function removeLastObj(board) {
	if (board.objectsList.length > board.ttoInitLength) {
		var idx = board.objectsList.length - 1;
		var obj = board.objectsList[idx];
		board.removeObject(obj);
		console.log(board);
	}
}

// Create object via Jessie Code
function addJessie(board, initVal) {
	board.jc.parse(initVal.jessie);
}

// Create a point
function addPoint(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt = board.create('point', [x,y]);
}

// Create 2 points and 1 line
function addLine(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y+1]); 
	var obj = board.create('line', [pt1,pt2]); 
}

// Create 2 points and 1 segment
function addSegment(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y+1]); 
	var obj = board.create('segment', [pt1,pt2]); 
}

// Create 2 points and 1 arrow
function addArrow(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y+1]); 
	var obj = board.create('arrow', [pt1,pt2]); 
}

// Create 2 points and 1 circle
function addCircle(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y+1]); 
	var obj = board.create('circle', [pt1,pt2]); 
}

// Create 3 points and 1 ellipse
function addEllipse(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x-1,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var pt3 = board.create('point', [x,y+1]); 
	var obj = board.create('ellipse', [pt1,pt2,pt3]); 
}

// Create a text
function addText(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var tx = ASCIIMathKaTeXHTML(marked(initVal.text));

	var obj = board.create('text', [x,y,tx]);
}

// Create a rectangle with 2 dragable points and 2 fixed points
function addRectangle(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+3,y+2]); 
	var pt3 = board.create('point', [function(){return pt1.X();},function(){return pt2.Y();}], {color:'blue'});
	var pt4 = board.create('point', [function(){return pt2.X();},function(){return pt1.Y();}], {color:'blue'});
	
	var rect = board.create('polygon',[pt1,pt3,pt2,pt4], {hasInnerPoints:true});
	pt3.isDraggable = true;
	pt4.isDraggable = true;	
}

// Creaet n points and 1 polygon
function addPolygon(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var n = initVal.n;
	var allPt = [];
	
	for (var i=0; i<n; i++) {
		allPt.push(board.create('point', [x+i/2,y+i/2])); 
	}
	
	var obj  = board.create('polygon', allPt); 
}

// Create n points, 1 polygon and n angles
function addPolygonAng(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var n = initVal.n;
	var allPt = [];
	var pt = {};
	var a = {};
	var b = {};
	var c = {};
	
	for (i=0; i<n; i++) {
		pt = board.create('point', [x+i/2,y+i/2]);
		allPt.push(pt); 
	}
	
	var obj  = board.create('polygon', allPt); 

	for (i=0; i<obj.vertices.length; i++) {
		if (i+1 >= obj.vertices.length) {
			j = 0; 
		} else {
			j = i+1; 
		}
		if (i-1 < 0) { 
			k = obj.vertices.length-2; 
		} else {
			k = i-1; 
		}
		c = obj.vertices[i];
		b = obj.vertices[j];
		a = obj.vertices[k];
		board.create('angle', [b,c,a]); 
	}
}

// Create 2 points, 1 polygon and n-2 points
function addRegPolygon(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var n = initVal.n;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var obj = board.create('regularpolygon', [pt1,pt2,n]); 
}

// Create 2 points, 1 polygon, n-2 points and n angles
function addRegPolygonAng(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var n = initVal.n;
	var a = {};
	var b = {};
	var c = {};

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var obj = board.create('regularpolygon', [pt1,pt2,n]); 
	
	for (i=0; i<obj.vertices.length; i++) {
		if (i+1 >= obj.vertices.length) { 
			j = 0; 
		} else { 
			j = i+1; 
		}
		if (i-1 < 0) { 
			k = obj.vertices.length-2; 
		} else { 
			k = i-1; 
		}
		c = obj.vertices[i];
		b = obj.vertices[j];
		a = obj.vertices[k];
		board.create('angle', [b,c,a]); 
	}
	
}

// Create 3 points, and 1 angle
function addAngle(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x,y-1]); 
	var pt3 = board.create('point', [x-1,y-1]); 
	var obj = board.create('angle', [pt1,pt2,pt3]); 
}

// Create 2 points and 1 image from url/base64
function addImage(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var img = initVal.image;

	var pt1 = board.create('point', [x,y]);
	pt1.dump = false;
	var pt2 = board.create('point', [x+3,y+3]); 
	pt2.dump = false;

	var obj = board.create('image', 
		[
			img, 
			[function(){return pt1.X();}, function(){return pt1.Y();}],
			[function(){return pt2.X()-pt1.X();}, function(){return pt2.Y()-pt1.Y();}]
		]
	); 
}

// Create tapemeasure
function addTapeMeasure(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var obj = board.create('tapemeasure', [[x,y], [x+1,y+1]]);
}

// Create Hatch with 2 points and 1 line
function addHatch(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;
	var n = initVal.n;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var line1 = board.create('line', [pt1,pt2]);
	var obj = board.create('hatch', [line1, n]);
}

// Create CircumcircleArc with 3 points
function addCircumCircleArc(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var pt3 = board.create('point', [x+2,y]); 
	var obj = board.create('circumcirclearc', [pt1, pt2, pt3]);
}

// Create CircumCircleSector with 3 points
function addCircumCircleSector(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var pt3 = board.create('point', [x+2,y]); 
	var obj = board.create('circumcirclesector', [pt1, pt2, pt3]);
}

// Create CircumCircle with 3 points
function addCircumCircle(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var pt3 = board.create('point', [x+2,y]); 
	var obj = board.create('circumcircle', [pt1, pt2, pt3]);
}

// Create CircumCenter with 3 points
function addCircumCenter(board, initVal) {
	var x = initVal.x;
	var y = initVal.y;

	var pt1 = board.create('point', [x,y]); 
	var pt2 = board.create('point', [x+1,y]); 
	var pt3 = board.create('point', [x+2,y]); 
	var obj = board.create('circumcenter', [pt1, pt2, pt3]);
}

// Hide all dumpable points.
function hidePoints(board) {
	for (var i=board.ttoInitLength; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			if (board.objectsList[i].getType() == 'point') {
				board.objectsList[i].setAttribute({visible : false});
			}
		}
	}
}

// Show all dumpable points.
function showPoints(board) {
	for (var i=board.ttoInitLength; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			if (board.objectsList[i].getType() == 'point') {
				board.objectsList[i].setAttribute({visible : true});
			}
		}
	}
}

// Snap all dumpable objects to grid.
function snapToGrid(board) {
	for (var i=board.ttoInitLength; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			board.objectsList[i].setAttribute({snaptogrid : true});
		}
	}
}

// Unsnap all dumpable objects to grid.
function unsnapToGrid(board) {
	for (var i=board.ttoInitLength; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			board.objectsList[i].setAttribute({snaptogrid : false});
		}
	}
}

// Fix all dumpable objects
function fixObjs(board) {
	for (var i=0; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			board.objectsList[i].setAttribute({fixed : true});
		}
	}
}

// Unfix all dumpable objects
function unfixObjs(board) {
	for (var i=0; i<board.objectsList.length; i++) {
		if (board.objectsList[i].dump) {
			board.objectsList[i].setAttribute({fixed : false});
		}
	}
}

