import Loader from "/js_modules/Loader.mjs"
import HatDraw from "/js_modules/HatDraw.mjs"
import fitText from "/js_modules/fitText.mjs"
import fitImage from "/js_modules/fitImage.mjs"

var game = {};
game.canvas = document.getElementById("myCanvas");
game.canvas.width = 800;
game.canvas.height = 450;
game.context = game.canvas.getContext("2d");
game.context.fillStyle = "yellow";

//game.loader = new Loader("../image_library/images/");
game.loader = new Loader();
var canvas = game.canvas;
var context = game.context;
var tmpCanvas = document.createElement("canvas");
var tmpContext = tmpCanvas.getContext("2d");
var context = game.context;
var FLOORS = 4;
var COLORS = ["red", "pink", "yellow", "purple", "blue", "skyblue", "black", "white", "orange", "saddlebrown", "green"];
var DOORS = [];
var HOW_TO_PLAY = game.loader.newImageAsset("img/how_to_play5.jpg", onload);
var FREE = game.loader.newImageAsset("img/free.jpg", onload);
var ML = game.loader.newImageAsset("img/mask_left.png", onload);
var MM = game.loader.newImageAsset("img/mask_middle.png", onload);
var MR = game.loader.newImageAsset("img/mask_right.png", onload);
var render;
var castle;
var choice = null;
var fadeStart = null;
var fadeColor = "white";

function onload() {
	if (game.loader.assetsLoaded) {
		render();
	}
}

function fade() {
	var elapsed = performance.now() - fadeStart;
	render();
	if (elapsed < 1000) {
		var prevFill = context.fillStyle;

		context.fillStyle = fadeColor;
		context.globalAlpha = elapsed/800;
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.globalAlpha = 1;
		context.fillStyle = prevFill;
		requestAnimationFrame(fade);
	} else if (elapsed < 1300) {
		choice = null;
		castle.progress = 0;
		var prevFill = context.fillStyle;

		context.fillStyle = fadeColor;
		context.globalAlpha = (1300 - elapsed)/300;
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.globalAlpha = 1;
		context.fillStyle = prevFill;
		requestAnimationFrame(fade);
	} else {
		fadeStart = null;
		render();
	}
	console.log("animating");
}

tmpCanvas.width = game.canvas.width;
tmpCanvas.height = game.canvas.height;
let monster_images = [];
MONSTERS.forEach(function (src) {
	monster_images.push(game.loader.newImageAsset("img/" + src, onload));
});
["three_doors1.jpg", "three_doors2.jpg", "three_doors3.jpg", "three_doors1.jpg"].forEach(function (src) {
	DOORS.push(game.loader.newImageAsset("img/" + src, onload));
});
var hd = new HatDraw(monster_images);
//var hdColors;
var hdNumbers;
var Castle = function () {
	//hdColors = new HatDraw(COLORS);
	this.progress = 0;
	var floors = [];
	var doorNumber = 0;
	for (var i=0; i<FLOORS; i++) {
		doorNumber = i*3;
		var thisFloor = [
			{"color": doorNumber + 1, "monster": hd.drawOne()},
			{"color": doorNumber + 2, "monster": hd.drawOne()},
			{"color": doorNumber + 3, "monster": hd.drawOne()}
		]
		thisFloor[Math.floor(Math.random() * thisFloor.length)]["monster"] = null;
		floors.push(thisFloor);
	}
	this.floors = floors;
}

function clear() {
	castle.progress += 1;
	choice = null;
	if (castle.progress >= castle.floors.length) {
		setTimeout(function () {game.state.won();}, 800);
	} else {
		fadeStart = performance.now();
		setTimeout(function () {fadeStart = null; render();}, 800);
	}
}

game.state = new StateMachine({
	init: "menu",
	transitions: [
		{name: "go", from: "menu", to: "playing"},
		{name: "won", from: "playing", to: "result"},
		{name: "again", from: "result", to: "playing"}
	],
	methods: {
		onAfterTransition: function () {
			render();
		},
		onLeaveState: function () {
			Mousetrap.reset();
		},
		onMenu: function () {
			render = function () {
				context.clearRect(0, 0, canvas.width, canvas.height);
				fitImage(context, HOW_TO_PLAY);
				fitText(context, "3 Doors", 0, 0, canvas.width * .6, canvas.height * .25);
				fitText(context, game.loader.assetsLoaded?"Loaded":"Loading", canvas.width * 3/4, canvas.height * 3/4, canvas.width * .2, canvas.height/8);
			}
			Mousetrap.bind("space", function () {if (game.loader.assetsLoaded) {game.state.go();}});
		},
		onPlaying: function () {
			castle = new Castle();
			render = function () {
				var progress = castle.progress;
				context.clearRect(0, 0, canvas.width, canvas.height);
				fitImage(context, DOORS[progress]);
				//tmpContext.fillStyle = castle.floors[progress][0]["color"];
				//tmpContext.globalCompositeOperation = "source-over";
				//tmpContext.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
				//tmpContext.globalCompositeOperation = "destination-in";
				//tmpContext.drawImage(ML, 0, 0);
				//context.drawImage(tmpCanvas, 0, 0);
				//tmpContext.fillStyle = castle.floors[progress][1]["color"];
				//tmpContext.globalCompositeOperation = "source-over";
				//tmpContext.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
				//tmpContext.globalCompositeOperation = "destination-in";
				//tmpContext.drawImage(MM, 0, 0);
				//context.drawImage(tmpCanvas, 0, 0);
				//tmpContext.fillStyle = castle.floors[progress][2]["color"];
				//tmpContext.globalCompositeOperation = "source-over";
				//tmpContext.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
				//tmpContext.globalCompositeOperation = "destination-in";
				//tmpContext.drawImage(MR, 0, 0);
				//context.drawImage(tmpCanvas, 0, 0);
				console.log(castle);
				fitText(context, castle.floors[progress][0].color, 0, canvas.height*.8, canvas.width/3, canvas.height*.2);
				fitText(context, castle.floors[progress][1].color, canvas.width/3, canvas.height*.8, canvas.width/3, canvas.height*.2);
				fitText(context, castle.floors[progress][2].color, canvas.width*2/3, canvas.height*.8, canvas.width/3, canvas.height*.2);
				//fitText(context, castle.floors[progress][0].color, 0, 0, 200, 100);
				fitText(context, "Level " + (progress + 1), 0, 0, 200, 100);
				if (choice === "left") {
					if (castle.floors[progress][0]["monster"] !== null) {
						fitImage(context, castle.floors[progress][0]["monster"], 0, 150, 200, 250);
						if (fadeStart === null) {
							fadeColor = "white";
							fadeStart = performance.now();
							requestAnimationFrame(fade);
						}
					} else {
						fitText(context, "CLEAR", 0, 150, 200, 250);
						clear();
					}
				}
				if (choice === "straight") {
					if (castle.floors[progress][1]["monster"] !== null) {
						fitImage(context, castle.floors[progress][1]["monster"], 300, 150, 200, 250);
						if (fadeStart === null) {
							fadeColor = "white";
							fadeStart = performance.now();
							requestAnimationFrame(fade);
						}
					} else {
						fitText(context, "CLEAR", 300, 150, 200, 250);
						clear();
					}
				}
				if (choice === "right") {
					if (castle.floors[progress][2]["monster"] !== null) {
						fitImage(context, castle.floors[progress][2]["monster"], 600, 150, 200, 250);
						if (fadeStart === null) {
							fadeColor = "white";
							fadeStart = performance.now();
							requestAnimationFrame(fade);
						}
					} else {
						fitText(context, "CLEAR", 600, 150, 200, 250);
						clear();
					}
				}
			}
			Mousetrap.bind("left", function () {
				if (choice === null && fadeStart === null) {
					choice = "left";
					render();
				}
			});
			Mousetrap.bind("up", function () {
				if (choice === null && fadeStart === null) {
					choice = "straight";
					render();
				}
			});
			Mousetrap.bind("right", function () {
				if (choice === null && fadeStart === null) {
					choice = "right";
					render();
				}
			});
		},
		onResult: function () {
			render = function () {
				context.clearRect(0, 0, canvas.width, canvas.height);
				fitImage(context, FREE);
				fitText(context, "You Made It!");
			}
			Mousetrap.bind("enter", function () {game.state.again();});
		}
		//onLeaveGoing: function () {game.modules[menuIndex].takedown();},
	}
});
