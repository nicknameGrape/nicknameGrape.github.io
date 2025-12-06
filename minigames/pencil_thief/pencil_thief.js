"use strict"

var game = {};
game.canvas = document.getElementById("myCanvas");
game.canvas.width = 800;
game.canvas.height = 450;
game.context = game.canvas.getContext("2d");

import Loader from "../js_modules/Loader.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import fitText from "../js_modules/fitText.mjs"

//mousetrap.min
var desk;
var size = 4;
var waitingForHand = false;
function onload() {
	if (game.loader.assetsLoaded) {
		desk = new Desk();
		fitImage(game.context, desk.beforeCanvas);
	}
}
var Supply = function (o, x, y) {
	this.img = o.img;
	this.text = o.text;
	this.x = x;
	this.y = y;
}
var Desk = function () {
	var xroot = Math.round(Math.sqrt(size));
	var yroot = Math.ceil(Math.sqrt(size));
	var stationary = [];
	var beforeCanvas = document.createElement("canvas");
	var beforeContext = beforeCanvas.getContext("2d");
	var afterCanvas = document.createElement("canvas");
	var afterContext = afterCanvas.getContext("2d");
	beforeCanvas.width = game.canvas.width;
	beforeCanvas.height = game.canvas.height;
	afterCanvas.width = game.canvas.width;
	afterCanvas.height = game.canvas.height;
	var tileW = game.canvas.width/xroot;
	var tileH = game.canvas.height/yroot;
	var tiles = [
	]
	for (var i=0; i<size; i++) {
		tiles.push({"x": i%xroot, "y": Math.floor(i/xroot)});
	}
	var btiles = tiles.slice();
	for (var i=0; i<size; i++) {
		var b = btiles.splice(Math.floor(Math.random()*btiles.length), 1)[0];
		stationary.push(new Supply(hd.drawOne(), b.x, b.y));
	}
	console.log(stationary);
	var missingIndex = Math.floor(Math.random()*stationary.length);
	fitImage(beforeContext, emptyDesk);
	fitImage(afterContext, emptyDesk);
	beforeContext.save();
	beforeContext.translate(260, 60);
	beforeContext.rotate(40/180*Math.PI);
	beforeContext.transform(1, -.5, 0, 1, 0, 0);
	beforeContext.scale(260/500, 260/500);
	afterContext.save();
	afterContext.translate(260, 60);
	afterContext.rotate(40/180*Math.PI);
	afterContext.transform(1, -.5, 0, 1, 0, 0);
	afterContext.scale(260/500, 260/500);
	//beforeContext.fillRect(0, 0, beforeCanvas.width, beforeCanvas.height);
	stationary.forEach(function (b, i) {
		fitImage(beforeContext, b.img, b.x * tileW, b.y * tileH, tileW, tileH);
		if (i !== missingIndex) {
			fitImage(afterContext, b.img, b.x * tileW, b.y * tileH, tileW, tileH);
		}
	});
	beforeContext.restore();
	afterContext.restore();

	this.stationary = stationary;
	this.missingIndex = missingIndex;
	this.beforeCanvas = beforeCanvas;
	this.afterCanvas = afterCanvas;
}
var sources = [
{"src": "eraser_zf6oloie.png", "text": "eraser"},
{"src": "notebook_4q00y5uy.png", "text": "notebook"},
{"src": "pen_riy0tgg6.png", "text": "pen"},
{"src": "pencil_case_b8klnd18.png", "text": "pencil case"},
{"src": "pencil_fr2vzf58.png", "text": "pencil"},
{"src": "ruler_u0awfjpt.png", "text": "ruler"},
{"src": "marker_mvwktpp7.png", "text": "marker"},
{"src": "crayon_avmnlvti.png", "text": "crayon"},
{"src": "colorpencil.png", "text": "red pencil"},
{"src": "pencil_sharpener_u5n_qife.png", "text": "pencil sharpener"}
];
game.loader = new Loader("images/");
var images = sources.map(function (o) {
	return {
		"img": game.loader.newImageAsset(o.src, onload),
		"text": o.text
	};
});
var emptyDesk = game.loader.newImageAsset("desk.png", onload);
var thief = game.loader.newImageAsset("thief.png", onload);
var busted = game.loader.newImageAsset("busted.jpg", onload);
var hd = new HatDraw(images);
var lastTime;
var disaster;
function Disaster() {
	this.x = -game.canvas.width;
	this.y = 0;
	this.a = 0;
	this.start = function () {
		this.request = requestAnimationFrame(this.loop);
	};
	this.loop = function () {
		var dt = performance.now() - lastTime;
		lastTime = performance.now();
		this.x += game.canvas.width/2000 * dt;
		//this.y -= game.canvas.height/3000 * dt;
		//this.a -= Math.PI*2/1000 * dt;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		if (this.x < game.canvas.width) {
			fitImage(game.context, desk.beforeCanvas);
		} else {
			fitImage(game.context, desk.afterCanvas);
		}
		game.context.save();
			game.context.translate(this.x, this.y);
			game.context.rotate(this.a);
			fitImage(game.context, thief, -game.canvas.width, 0, game.canvas.width, game.canvas.height);
		game.context.restore();
		//fitImage(game.context, thief, this.x, this.y, game.canvas.width, game.canvas.height);
		console.log(this.x, this.y);
		if (this.x < game.canvas.width*2) {
			this.request = requestAnimationFrame(this.loop);
		}
	}.bind(this);
}

function keypressHandler(ev) {
	if (ev.key == " ") {
		if (waitingForHand) {
			cancelAnimationFrame(disaster.request);
			game.context.fillStyle = "white";
			game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
			fitImage(game.context, busted);
			fitText(game.context, "Do you have a ...?", 0, 0, game.canvas.width3, game.canvas.height*.3);
		} else {
			lastTime = performance.now();
			disaster = new Disaster();
			disaster.start();
			waitingForHand = true;
		}
	}
	if (ev.key == "Enter") {
		desk = new Desk();
		waitingForHand = false;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		fitImage(game.context, desk.beforeCanvas);
	}
	if (ev.key == "a") {
		var b = desk.stationary[desk.missingIndex].img;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		var tmpCanvas = document.createElement("canvas");
		tmpCanvas.width = b.width;
		tmpCanvas.height = b.height;
		var tmpContext = tmpCanvas.getContext("2d");
		fitImage(tmpContext, b);
		tmpContext.globalCompositeOperation = "source-atop";
		fitImage(game.context, busted);
		//fitImage(game.context, witch_legs);
		fitImage(game.context, tmpCanvas, game.canvas.width*.7, game.canvas.height*.6, game.canvas.width*.3, game.canvas.height*.3);
	}
	if (Number.isInteger(parseInt(ev.key))) {
		if (ev.key == "0") {
			size = 10;
		} else {
			size = parseInt(ev.key);
		}
	}
	if (ev.key == "q") {
		size = 11;
	}
	if (ev.key == "w") {
		size = 12;
	}
}

window.addEventListener("keypress", keypressHandler);
