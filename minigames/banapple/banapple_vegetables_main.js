"use strict"

requirejs.config({
	"baseUrl": '../js',
	"paths": {
		"banapple": '../banapple'
	}
});

function fillWindow() {
	game.canvas.width = window.innerWidth;
	game.canvas.height = window.innerHeight;
	console.log(game.canvas.width, game.canvas.height);
}

var game = {};
game.canvas = document.getElementById("myCanvas");
game.context = game.canvas.getContext("2d");
fillWindow();

window.addEventListener("resize", function () {
	console.log("resize");
	fillWindow();
});

require(["banapple/parts_vegetables", "fitImage", "Loader", "fitMontage", "state-machine3", "fitText"], function (parts, fitImage, Loader, fitMontage, Statemachine, fitText) {
	console.log(state);
	function onload() {
		if (loader.assetsLoaded) {
			state = new Statemachine({
				"init": "choosing1",
				"transitions": [
					{"name": "chose1", "from": "choosing1", "to": "choosing2"},
					{"name": "chose2", "from": "choosing2", "to": "result"},
					{"name": "back", "from": "result", "to": "choosing1"},
				],
				"methods": {
					"onEnterState": function () {
						game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
					},
					"onChoosing1": function () {
						window.removeEventListener("keydown", this.resultKeyListener);
						var images = choices1.map(function (o) {
							return o.img;
						});
						fitMontage(game.context, images);
						window.addEventListener("keypress", this.choosing1keyListener);
					},
					"onChoosing2": function () {
						window.removeEventListener("keypress", this.choosing1keyListener);
						var images = choices2.map(function (o) {
							return o.img;
						});
						fitMontage(game.context, images);
						window.addEventListener("keypress", this.choosing2keyListener);
					},
					"onResult": function () {
						window.removeEventListener("keypress", this.choosing2keyListener);
						combine(choice1, choice2);
						window.addEventListener("keydown", this.resultKeyListener);
					}
				},
				"data": {
					"choosing1keyListener": function (e) {
						if (isFinite(e.key) && e.key <= choices1.length) {
							var index = parseInt(e.key) - 1;
							choice1 = choices1.splice(index, 1)[0];
							state.chose1();
						}
						if (e.key === "r") {
							game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
							//combine(choices1[Math.floor(Math.random()*choices1.length)], choices1[Math.floor(Math.random()*choices1.length)]);
							combine(choices1[choices1.length-1], choices1[Math.floor(Math.random()*choices1.length)]);
						}
						if (e.key === "t") {
							game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
							combine(choices1[Math.floor(Math.random()*choices1.length)], choices1[choices1.length-1]);
						}
					},
					"choosing2keyListener": function (e) {
						if (isFinite(e.key) && e.key <= choices2.length) {
							var index = parseInt(e.key) - 1;
							choice2 = choices2.splice(index, 1)[0];
							state.chose2();
						}
					},
					"resultKeyListener": function (e) {
						console.log(e.key);
						if (e.key === "Escape") {
							state.back();
						}
					}
	}
			});
		}
	}

	function combine(fTop, fBot) {
		var tmpCanvas = document.createElement("canvas");
		var tmpContext = tmpCanvas.getContext("2d");
		var fTopBeltW = fTop.x2 - fTop.x1;
		var fBotBeltW = fBot.x2 - fBot.x1;
		var beltWidth = (fTopBeltW + fBotBeltW)/2;
		var topScale = beltWidth/fTopBeltW;
		var botScale = beltWidth/fBotBeltW;
		var xOrigin = Math.max(fTop.x1*topScale, fBot.x1*botScale);
		var yOrigin = Math.max(fTop.y*topScale, fBot.y*botScale);
		tmpCanvas.width = xOrigin + Math.max((fTop.imgTop.width - fTop.x1)*topScale, (fBot.imgBot.width - fBot.x1)*botScale);
		tmpCanvas.height = yOrigin + (fBot.imgBot.height - fBot.y)*botScale;
		//console.log(tmpCanvas.width);
		//console.log(tmpCanvas.height);
		tmpContext.save();
			tmpContext.translate(xOrigin, yOrigin);
			tmpContext.save()
				tmpContext.scale(topScale, topScale);
				tmpContext.drawImage(fTop.imgTop, -fTop.x1, -fTop.y);
			tmpContext.restore()
			tmpContext.save()
				tmpContext.scale(botScale, botScale);
				tmpContext.drawImage(fBot.imgBot, -fBot.x1, -fBot.y);
			tmpContext.restore()
		tmpContext.restore();
		fitImage(game.context, tmpCanvas);
		fitText(game.context, fTop.japanese_beginning, 0, 0, game.canvas.width*.4, game.canvas.height*.2);
		fitText(game.context, fBot.japanese_end, game.canvas.width*.6, game.canvas.height*.8, game.canvas.width*.4, game.canvas.height*.2);
	}

	var state;
	var loader = new Loader("./img_vegetables/");
	var choices1 = [];
	var choices2 = [];
	var choice1;
	var choice2;
	for (const [key, value] of Object.entries(parts)) {
		value.img = loader.newImageAsset(value.src, onload);
		choices1.push(value);
		choices2.push(value);
		value.imgTop = loader.newImageAsset(value.srcTop, onload);
		value.imgBot = loader.newImageAsset(value.srcBottom, onload);
	}
});
