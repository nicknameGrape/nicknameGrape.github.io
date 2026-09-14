"use strict"

requirejs.config({
baseUrl: '../js',
paths: {
	whats_this: '../bw_quiz',
}
});

require(["fitText", "fitImage", "Loader", "mousetrap.min"], function (fitText, fitImage, Loader, Mousetrap) {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var kumi;
	var obj, img;
	var tmpCanvas = document.createElement("canvas");
	var tmpContext = tmpCanvas.getContext("2d");
	var w, h, x, y, a, finalW, finalH, finalX, finalY, startA, finalA;
	var startTime, progress;
	var loader = new Loader("./img/");
	var state = new StateMachine({
		"init": "choosingClass",
		"transitions": [
			{"name": "choseClass", "from": "choosingClass", "to": "hint"},
			{"name": "revealed", "from": "hint", "to": "answer"},
			{"name": "back", "from": "answer", "to": "hint"},
			{"name": "back", "from": "hint", "to": "choosingClass"}
		],
		"methods": {
			"onEnterState": function () {
				resizeHandler();
				Mousetrap.reset();
				context.clearRect(0, 0, canvas.width, canvas.height);
				console.log(this.state);
			},
			"onChoosingClass": function () {
				kumi = null;
				var classes = this.classes;
				for (var i=0; i<classes.length; i++) {
					(function (i) {
						fitText(context, classes[i].name, 0, i * canvas.height / classes.length, canvas.width, canvas.height / classes.length);
						Mousetrap.bind((i+1).toString(), function () {
							kumi = i;
							console.log("kumi", kumi);
							state.choseClass()
						});
					}(i));
				}
			},
			"onHint": function () {
				var thisClass = this.classes[kumi];
				//TESTING PURPOSES:
				//thisClass.quizzes = thisClass.quizzes.filter(function (o) {
				//	return o.misdirection !== "";
				//});
				//obj = thisClass.quizzes[progress];
				obj = thisClass.quizzes.splice(Math.floor(Math.random()*thisClass.quizzes.length),1)[0];
				console.log(obj);
				var hintW = this.hint_square.w, hintH = this.hint_square.h, hintX = this.hint_square.x, hintY = this.hint_square.y;
				var x1 = parseInt(obj.crop.split(" ")[0].split(",")[0])
				var x2 = parseInt(obj.crop.split(" ")[1].split(",")[0])
				var y1 = parseInt(obj.crop.split(" ")[0].split(",")[1])
				var y2 = parseInt(obj.crop.split(" ")[1].split(",")[1])
				finalW = x2 - x1; finalH = y2 - y1; finalX = x1; finalY = y1;
				console.log(x1, x2, y1, y2);
				console.log(finalX, finalY, finalW, finalH);
				if (obj.up === "t") {
					finalA = 0;
				} else if (obj.up === "l") {
					finalA = Math.PI/2;
				} else if (obj.up === "r") {
					finalA = Math.PI*3/2;
				} else if (obj.up === "b") {
					finalA = Math.PI;
				}
				if (obj.misdirection === "") {
					startA = finalA;
				} else if (obj.misdirection === "t") {
					startA = 0
				} else if (obj.misdirection === "l") {
					startA = Math.PI/2;
				} else if (obj.misdirection === "r") {
					startA = Math.PI*3/2;
				} else if (obj.misdirection === "b") {
					startA = Math.PI;
				}
				img = loader.newImageAsset(thisClass.path + "/" +obj.filename, function () {
					startTime = null;
					putImage(0);
					Mousetrap.bind("space", function () {
						startTime = performance.now();
						window.requestAnimationFrame(animate);
					});
					Mousetrap.bind("esc", function () {
						state.back();
					});
				});
			},
			"onRevealed": function () {
				putImage(1);
				Mousetrap.bind("space", function () {
					state.back();
				});
			},
		},
		"data": {
			"hint_square": {"x": 375, "y": 582, "w": 250, "h": 250},
			"classes": [
					//"name": "Best",
					//"W": 196, "H": 272, "X": 307, "Y": 448, //n31 2019
					//"imgs": [
					{
						"name": "Kitashigeyasu 3-1", //
						"path": "2023_kitashigeyasu_31",
						"quizzes": [
{
	"filename": "deskewed_20230213_184630.jpg",
	"up": "t",
	"crop": "226,593 706,964",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184641.jpg",
	"up": "r",
	"crop": "170,65 905,1252",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184648.jpg",
	"up": "l",
	"crop": "331,126 678,1309",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184657.jpg",
	"up": "l",
	"crop": "272,220 792,1115",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184705.jpg",
	"up": "b",
	"crop": "279,536 735,1154",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184719.jpg",
	"up": "t",
	"crop": "10,91 986,1365",
	"misdirection": "l"
},
{
	"filename": "deskewed_20230213_184730.jpg",
	"up": "t",
	"crop": "30,4 988,1405",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184739.jpg",
	"up": "t",
	"crop": "56,475 702,964",
	"misdirection": "r"
},
{
	"filename": "deskewed_20230213_184750.jpg",
	"up": "b",
	"crop": "248,488 728,986",
	"misdirection": "t"
},
{
	"filename": "deskewed_20230213_184758.jpg",
	"up": "t",
	"crop": "320,510 700,896",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184806.jpg",
	"up": "r",
	"crop": "8,392 656,868",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184814.jpg",
	"up": "b",
	"crop": "80,301 835,1088",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184821.jpg",
	"up": "r",
	"crop": "85,536 525,877",
	"misdirection": "l"
},
{
	"filename": "deskewed_20230213_184831.jpg",
	"up": "l",
	"crop": "331,456 988,1095",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184840.jpg",
	"up": "r",
	"crop": "266,432 711,975",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184851.jpg",
	"up": "r",
	"crop": "111,270 899,885",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184900.jpg",
	"up": "r",
	"crop": "259,13 992,1374",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184908.jpg",
	"up": "l",
	"crop": "338,512 992,907",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184917.jpg",
	"up": "r",
	"crop": "122,373 776,1043",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184926.jpg",
	"up": "t",
	"crop": "19,200 984,1171",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184934.jpg",
	"up": "t",
	"crop": "69,322 944,1091",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184942.jpg",
	"up": "l",
	"crop": "336,464 813,927",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184954.jpg",
	"up": "b",
	"crop": "342,693 658,1012",
	"misdirection": "t"
},
{
	"filename": "deskewed_20230213_185001.jpg",
	"up": "t",
	"crop": "209,493 586,955",
	"misdirection": "r"
},
{
	"filename": "deskewed_20230213_185009.jpg",
	"up": "t",
	"crop": "80,2 901,866",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185016.jpg",
	"up": "b",
	"crop": "106,340 960,1370",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185023.jpg",
	"up": "b",
	"crop": "274,471 752,1001",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185030.jpg",
	"up": "t",
	"crop": "189,353 872,1047",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185037.jpg",
	"up": "r",
	"crop": "235,115 936,960",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185044.jpg",
	"up": "t",
	"crop": "246,292 669,879",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185054.jpg",
	"up": "t",
	"crop": "399,102 992,940",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185101.jpg",
	"up": "r",
	"crop": "8,10 990,1396",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185107.jpg",
	"up": "b",
	"crop": "517,480 765,779",
	"misdirection": ""
}
						]
					},
					{
						"name": "Kitashigeyasu 3-2", //
						"path": "2023_kitashigeyasu_32",
						"quizzes": [
{
	"filename": "deskewed_20230213_184057.jpg",
	"up": "l",
	"crop": "517,473 905,822",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184110.jpg",
	"up": "l",
	"crop": "89,447 875,883",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184117.jpg",
	"up": "b",
	"crop": "80,305 890,1237",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184131.jpg",
	"up": "r",
	"crop": "21,17 975,1387",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184139.jpg",
	"up": "t",
	"crop": "438,316 868,768",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184149.jpg",
	"up": "t",
	"crop": "207,530 831,933",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184204.jpg",
	"up": "l",
	"crop": "344,423 663,984",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184212.jpg",
	"up": "r",
	"crop": "8,571 473,1093",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184221.jpg",
	"up": "b",
	"crop": "652,855 26,211",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184229.jpg",
	"up": "b",
	"crop": "10,76 936,728",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184238.jpg",
	"up": "r",
	"crop": "10,50 992,1300",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184246.jpg",
	"up": "r",
	"crop": "423,329 820,685",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184255.jpg",
	"up": "t",
	"crop": "148,451 820,1045",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184302.jpg",
	"up": "r",
	"crop": "124,231 977,1287",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184310.jpg",
	"up": "r",
	"crop": "30,534 955,1056",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184329.jpg",
	"up": "b",
	"crop": "248,604 855,1108",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184336.jpg",
	"up": "t",
	"crop": "17,30 979,1385",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184354.jpg",
	"up": "l",
	"crop": "172,488 914,1261",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184409.jpg",
	"up": "r",
	"crop": "157,331 918,1106",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184417.jpg",
	"up": "t",
	"crop": "106,102 990,940",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184430.jpg",
	"up": "r",
	"crop": "15,231 953,1025",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184438.jpg",
	"up": "l",
	"crop": "10,608 624,1115",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184446.jpg",
	"up": "r",
	"crop": "72,375 986,925",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184454.jpg",
	"up": "l",
	"crop": "141,187 938,1224",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184503.jpg",
	"up": "b",
	"crop": "211,294 953,848",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184511.jpg",
	"up": "t",
	"crop": "17,189 988,1224",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184519.jpg",
	"up": "t",
	"crop": "222,453 787,1025",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184528.jpg",
	"up": "b",
	"crop": "120,312 975,1128",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184537.jpg",
	"up": "t",
	"crop": "159,229 757,1060",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184545.jpg",
	"up": "l",
	"crop": "8,482 737,1069",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_184553.jpg",
	"up": "t",
	"crop": "6,6 990,1394",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_191919.jpg",
	"up": "t",
	"crop": "120,298 822,1197",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_191930.jpg",
	"up": "r",
	"crop": "10,447 517,951",
	"misdirection": ""
}
						]
					},
					{
						"name": "Kitashigeyasu 3-3", //
						"path": "2023_kitashigeyasu_33",
						"quizzes": [
{
	"filename": "deskewed_20230213_185153.jpg",
	"up": "t",
	"crop": "137,192 929,1152",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185201.jpg",
	"up": "b",
	"crop": "283,475 728,1178",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185207.jpg",
	"up": "r",
	"crop": "312,519 831,868",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185215.jpg",
	"up": "r",
	"crop": "8,434 990,1389",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185223.jpg",
	"up": "l",
	"crop": "72,438 556,953",
	"misdirection": "r"
},
{
	"filename": "deskewed_20230213_185233.jpg",
	"up": "b",
	"crop": "368,608 628,894",
	"misdirection": "t"
},
{
	"filename": "deskewed_20230213_185240.jpg",
	"up": "b",
	"crop": "170,281 813,1324",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185248.jpg",
	"up": "r",
	"crop": "76,499 986,1245",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185255.jpg",
	"up": "b",
	"crop": "56,253 781,1077",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185302.jpg",
	"up": "l",
	"crop": "327,606 700,1139",
	"misdirection": "t"
},
{
	"filename": "deskewed_20230213_185310.jpg",
	"up": "t",
	"crop": "106,39 938,1110",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185317.jpg",
	"up": "l",
	"crop": "416,331 988,975",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185324.jpg",
	"up": "r",
	"crop": "541,432 776,957",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185331.jpg",
	"up": "r",
	"crop": "128,414 674,947",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185339.jpg",
	"up": "b",
	"crop": "336,639 661,968",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185346.jpg",
	"up": "b",
	"crop": "170,6 739,944",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185354.jpg",
	"up": "r",
	"crop": "316,410 702,1034",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185400.jpg",
	"up": "l",
	"crop": "52,13 953,728",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185407.jpg",
	"up": "r",
	"crop": "242,427 759,960",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185413.jpg",
	"up": "r",
	"crop": "10,17 977,1352",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185420.jpg",
	"up": "r",
	"crop": "13,466 990,942",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185428.jpg",
	"up": "l",
	"crop": "69,104 920,1191",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185437.jpg",
	"up": "l",
	"crop": "170,272 787,1208",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185444.jpg",
	"up": "b",
	"crop": "10,486 990,1396",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185451.jpg",
	"up": "t",
	"crop": "85,111 785,870",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185458.jpg",
	"up": "r",
	"crop": "397,604 606,807",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185505.jpg",
	"up": "t",
	"crop": "213,514 835,1182",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185512.jpg",
	"up": "l",
	"crop": "124,115 914,914",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185519.jpg",
	"up": "r",
	"crop": "344,351 979,1208",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185526.jpg",
	"up": "l",
	"crop": "13,405 914,1147",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185533.jpg",
	"up": "b",
	"crop": "17,78 986,1348",
	"misdirection": ""
},
{
	"filename": "deskewed_20230213_185550.jpg",
	"up": "r",
	"crop": "65,288 990,1104",
	"misdirection": ""
}
						]
					}
			]
		}
	});

	function putImage(progress) {
		x = finalX*progress + state.hint_square.x*(1-progress);
		y = finalY*progress + state.hint_square.y*(1-progress);
		w = finalW*progress + state.hint_square.w*(1-progress);
		h = finalH*progress + state.hint_square.h*(1-progress);
		a = finalA*progress + startA*(1-progress);
		//var apparentW = 2*(Math.abs(Math.cos(a)*w/2) + Math.abs(Math.sin(a)*h/2));
		//var apparentH = 2*(Math.abs(Math.sin(a)*w/2) + Math.abs(Math.cos(a)*h/2));
		//console.log(progress, obj, x, y, w, h, a, apparentW, apparentH);
		//tmpCanvas.width = apparentW;
		//tmpCanvas.height = apparentH;
		//console.log(progress, obj, x, y, w, h, a);
		//tmpContext.save();
		//tmpContext.translate(tmpCanvas.width/2, tmpCanvas.height/2);
		//tmpContext.rotate(a);
		//tmpContext.drawImage(img, x, y, w, h, -w/2, -h/2, w, h);
		//tmpContext.restore();
		tmpCanvas.width = w;
		tmpCanvas.height = h;
		tmpContext.drawImage(img, x, y, w, h, 0, 0, w, h);
		context.clearRect(0, 0, canvas.width, canvas.height);
		var mult;
		var apparentW = 2*(Math.abs(Math.cos(finalA)*w/2) + Math.abs(Math.sin(finalA)*h/2));
		var apparentH = 2*(Math.abs(Math.sin(finalA)*w/2) + Math.abs(Math.cos(finalA)*h/2));
		if (apparentW/apparentH > canvas.width/canvas.height) {
			mult = canvas.width/apparentW;
		} else {
			mult = canvas.height/apparentH;
		}
		context.save();
		context.translate(canvas.width/2, canvas.height/2);
		context.rotate(a);
		context.drawImage(img, x, y, w, h, -w/2*mult, -h/2*mult, w*mult, h*mult);
		context.restore();
	}

	function animate(time) {
		if (startTime === null) {
			progress = 0;
		} else {
			progress = (performance.now() - startTime)/1000;
		}
		putImage(progress);
		if (progress > 1) {
			progress = 1;
			putImage(progress);
			window.cancelAnimationFrame(animate);
			state.revealed();
		} else {
			window.requestAnimationFrame(animate);
		}
	}

	function resizeHandler () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	window.addEventListener("resize", resizeHandler);
});
