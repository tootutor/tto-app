ttoApp.directive('jsxEdit', ['$mdDialog', function ($mdDialog) {
  return {
    restrict: 'E',
    scope: {dumpCode: '='},
    templateUrl: 'view/jsx-edit.html',
    controller: jsxEditCtrl,
    link: jsxEditLink
  };

	function jsxEditCtrl($scope) {
		$scope.board   = {};
		$scope.id      = '';

		$scope.option = {
			style : {
				width: '320px', 
				height: '320px'
			},
			jsxgraph : {
				axis: true,
				keepaspectratio: true, 
				showCopyright: false,
				showNavigation: true,
				boundingbox: [-10, 10, 10, -10]
			}
		};
		
		$scope.initVal = {
			x     : 0,
			y     : 0,
			n     : 3,
			text  : 'Init Text',
			image : '',
			jessie : ''
		};
		$scope.selectedObj = {};
		$scope.editAttr = {};
		$scope.isShowOption = false;
		$scope.isActionMode = false;
		$scope.isEditMode = false;
		
		$scope.dumpCode = "";

		$scope.allAction = [
			{name: 'addJessie'       },
			{name: 'addPoint'        },
			{name: 'addLine'         },
			{name: 'addSegment'      },
			{name: 'addArrow'        },
			{name: 'addCircle'       },
			{name: 'addEllipse'      },
			{name: 'addRectangle'    },
			{name: 'addPolygon'      },
			{name: 'addPolygonAng'   },
			{name: 'addRegPolygon'   },
			{name: 'addRegPolygonAng'},
			{name: 'addText'         },
			{name: 'addImage'        },
			{name: 'addAngle'        },
			{name: 'addTapeMeasure'  },
			{name: 'addHatch'        },
			{name: 'addCircumCircleArc'},
			{name: 'addCircumCircleSector'},
			{name: 'addCircumCircle' },
			{name: 'addCircumCenter' },
			{name: 'hidePoints'      },
			{name: 'showPoints'      },
			{name: 'snapToGrid'      },
			{name: 'unsnapToGrid'    },
			{name: 'fixObjs'         },
			{name: 'unfixObjs'       }
		];
		$scope.selectedAction = 'addPoint';

		$scope.allImageSource = [
			{source: 'ExtDataURI' , name: 'Extract DataURI' },
			{source: 'DataURI2SVG', name: 'SVG to DataURI'  },
			{source: 'DataURI'    , name: 'DataURI'         },
			{source: 'Img2DataURI', name: 'Image to DataURI'}
		];
		$scope.selectedImageSource = 'ttoCopyPaste';

		$scope.initJSX    = initJSX;
		$scope.refreshJSX = refreshJSX;
		$scope.undoJSX    = undoJSX;
		$scope.loadJSX    = loadJSX;
		$scope.dumpJSX    = dumpJSX;
		$scope.actionJSX  = actionJSX;
		$scope.updateJSX  = updateJSX;
		$scope.loadDataURI = loadDataURI;

		function actionJSX() {
			switch ($scope.selectedAction) {
				case 'addJessie': 
					addJessie($scope.board, $scope.initVal); 
					break;
				case 'addPoint': 
					addPoint($scope.board, $scope.initVal); 
					break;
				case 'addLine':	
					addLine($scope.board, $scope.initVal); 
					break;
				case 'addSegment':	
					addSegment($scope.board, $scope.initVal); 
					break;
				case 'addArrow': 
					addArrow($scope.board, $scope.initVal); 
					break;
				case 'addCircle': 
					addCircle($scope.board, $scope.initVal); 
					break;
				case 'addEllipse': 
					addEllipse($scope.board, $scope.initVal); 
					break;
				case 'addRectangle': 
					addRectangle($scope.board, $scope.initVal); 
					break;
				case 'addPolygon': 
					addPolygon($scope.board, $scope.initVal); 
					break;
				case 'addPolygonAng':
					addPolygonAng($scope.board, $scope.initVal); 
					break;
				case 'addRegPolygon': 
					addRegPolygon($scope.board, $scope.initVal); 
					break;
				case 'addRegPolygonAng': 
					addRegPolygonAng($scope.board, $scope.initVal); 
					break;
				case 'addText': 
					addText($scope.board, $scope.initVal); 
					break;
				case 'addImage': 
					addImage($scope.board, $scope.initVal); 
					break;
				case 'addAngle': 
					addAngle($scope.board, $scope.initVal); 
					break;
				case 'addTapeMeasure': 
					addTapeMeasure($scope.board, $scope.initVal); 
					break;
				case 'addHatch': 
					addHatch($scope.board, $scope.initVal); 
					break;
				case 'addCircumCircleArc': 
					addCircumCircleArc($scope.board, $scope.initVal); 
					break;
				case 'addCircumCircleSector': 
					addCircumCircleSector($scope.board, $scope.initVal); 
					break;
				case 'addCircumCircle': 
					addCircumCircle($scope.board, $scope.initVal); 
					break;
				case 'addCircumCenter': 
					addCircumCenter($scope.board, $scope.initVal); 
					break;
				case 'hidePoints': 
					hidePoints($scope.board, $scope.initVal); 
					break;
				case 'showPoints': 
					showPoints($scope.board, $scope.initVal); 
					break;
				case 'snapToGrid': 
					snapToGrid($scope.board, $scope.initVal); 
					break;
				case 'unsnapToGrid': 
					unsnapToGrid($scope.board, $scope.initVal); 
					break;
				case 'fixObjs': 
					fixObjs($scope.board); 
					break;
				case 'unfixObjs': 
					unfixObjs($scope.board); 
					break;
			}
			
			addEventsToNewObjs($scope.board, $scope);
		}

		function initJSX() {
			$scope.selectedObj = {};
			$scope.editAttr = {};
			$scope.dummyElem[0].style.width = $scope.option.style.width;
			$scope.dummyElem[0].style.height = $scope.option.style.height;
			$scope.board = initBoard($scope.id, $scope.option.jsxgraph);
			$scope.board.jc = new JXG.JessieCode();
			$scope.board.jc.use($scope.board);
		}

		function refreshJSX() {
			JXG.JSXGraph.freeBoard($scope.board);
			$scope.initJSX();
		}

		function undoJSX() {
			removeLastObj($scope.board);
		}

		function loadJSX() {
			$scope.selectedObj = {};
			$scope.editAttr = {};
			var content = localStorage.getItem('ttoJSXEdit');
			var alert = $mdDialog.alert({title: 'Loaded from ttoJSXEdit', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
			var sources = content.split('=====');
			var option = JSON.parse(sources[0]);

			JXG.JSXGraph.freeBoard($scope.board);
			$scope.board = initBoard($scope.id, $scope.option.jsxgraph);

			$scope.board.jc = new JXG.JessieCode();
			$scope.board.jc.use($scope.board);
			$scope.board.jc.parse(sources[1]);

			addEventsToNewObjs($scope.board, $scope);
		}

		function dumpJSX() {
			console.log($scope.board);
			var initDump = "";
			initDump = JSON.stringify($scope.option);
			initDump = initDump + '\n=====\n';
			$scope.dumpCode = initDump + toJessie($scope.board);
			localStorage.setItem('ttoContent6', $scope.dumpCode);
			var alert = $mdDialog.alert({title: 'Saved to ttoContent6', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}

		function updateJSX() {
			$scope.selectedObj.setAttribute($scope.editAttr);
			$scope.board.update();
		}
		
		function loadDataURI() {
			var image = "";
			var alert = {};
			switch($scope.selectedImageSource) {
				case 'ExtDataURI':
					image = localStorage.getItem('ttoContent5');
					$scope.initVal.image = extractDataURI(image);
					alert = $mdDialog.alert({title: 'Extracted DataURI !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
					break;
				case 'DataURI2SVG':
					image = localStorage.getItem('ttoContent5');
					$scope.initVal.image = svg2DataURI(image);
					alert = $mdDialog.alert({title: 'SVG to DataURI !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
					break;
				case 'DataURI':
					image = localStorage.getItem('ttoContent9');
					$scope.initVal.image = image;
					alert = $mdDialog.alert({title: 'Pasted DataURI !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
					break;
				case 'Img2DataURI':
					image = localStorage.getItem('ttoCopyPaste');
					$scope.initVal.image = image;
					alert = $mdDialog.alert({title: 'Image to DataURI !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
					break;
			}
			
		}

	}
	
	function jsxEditLink($scope, $elem, $attr) {
		try {
			$scope.id = 'jsx-edit-' + Date.now(); //random a DIV's id for JSX
			$scope.dummyElem = $elem[0].getElementsByClassName('dummy');
			$scope.dummyElem[0].setAttribute("id", $scope.id); //Assign ID to dummy-id in template 
			$scope.initJSX();
		} catch (err) {
			console.log('Error in jsxEditLink');
		}
	}

}
]);