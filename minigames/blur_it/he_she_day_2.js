"use strict"

import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import Loader from "../js_modules/Loader.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"
import CHARACTERS from "../image_library/characters/popular.mjs"

function keypressHandlerEnter(ev) {
	if (ev.key == "Enter") {
		state.back();
	}
}
function keydownHandlerSpace(ev) {
	if (ev.key == " ") {
		if (paused) {
			paused = false;
		}
	}
}
function keyupHandlerSpace(ev) {
	if (ev.key == " ") {
		if (!paused) {
			paused = true;
		}
	}
}
function keypressHandlerA(ev) {
	if (ev.key == "a") {
		if (state.is("unblurring")) {
			paused = false;
			requestAnimationFrame(answerLoop);
		}
	}
}

var game = {
	"images": []
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var loader = new Loader("../image_library/characters/popular/");
var lloader = new Loader("./");
var lastTime;
var request;
var progress;
var paused;
var pixels;
var animal;
var silhouette, blurCanvas, blurContext;
var bg, fg;
const THIS_DAYS_CHARACTERS = [
	"Hanakappa",
	"Ronald McDonald",
	"Jaiko",
	"Kaguyahime",
	"Princess Peach",
	"Waldo"
];
var animals = CHARACTERS.filter(function (obj) {
	return THIS_DAYS_CHARACTERS.includes(obj.name);
});
var hd = new HatDraw(animals);
var onload = function () {
	if (loader.assetsLoaded && lloader.assetsLoaded) {
		var tmpCanvas = document.createElement("canvas");
		var tmpContext = tmpCanvas.getContext("2d");
		tmpCanvas.width = animal.img.width;
		tmpCanvas.height = animal.img.height;
		tmpContext.fillStyle = "black";
		tmpContext.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);
		tmpContext.globalCompositeOperation = "destination-in";
		tmpContext.drawImage(animal.img, 0, 0);
		silhouette = tmpCanvas;
		blurCanvas = document.createElement("canvas");
		blurContext = blurCanvas.getContext("2d");
		blurCanvas.width = canvas.width;
		blurCanvas.height = canvas.height;
		state.loaded();
	}
}
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (progress > 0) {
		render(context);
	}
});
var state = new StateMachine({
	"init": "loading",
	"transitions": [
		{"name": "loaded", "from": "loading", "to": "unblurring"},
		{"name": "show", "from": "unblurring", "to": "revealed"},
		{"name": "back", "from": ["unblurring", "revealed"], "to": "loading"}
	],
	"methods": {
		"onEnterState": function () {
			console.log(this.state);
		},
		"onLoading": function () {
			animal = hd.drawOne();
			animal.img = loader.newImageAsset(animal.src, onload);
			console.log(animal);
			window.removeEventListener("keypress", keypressHandlerEnter);
			window.removeEventListener("keypress", keypressHandlerA);
			window.removeEventListener("keydown", keydownHandlerSpace);
			window.removeEventListener("keyup", keyupHandlerSpace);
		},
		"onUnblurring": function () {
			paused = true;
			progress = 0;
			pixels = 100;
			window.addEventListener("keypress", keypressHandlerEnter);
			window.addEventListener("keydown", keydownHandlerSpace);
			window.addEventListener("keyup", keyupHandlerSpace);
			window.addEventListener("keypress", keypressHandlerA);
			request = requestAnimationFrame(loop);
		},
		"onRevealed": function () {
			render();
		},
		"onBack": function () {
			cancelAnimationFrame(request);
		}
	}
});

var request, lastTime;
function loop(time) {
	console.log("looping");
	if (!lastTime) {lastTime = performance.now();}
	var dt = time - lastTime;
	lastTime = time;
	if (!paused) {
		progress += dt / 8000;
	}
	if (progress > 2) {
		state.show();
	}
	render(context);
	request = requestAnimationFrame(loop);
}
function answerLoop(time) {
	console.log("answer looping");
	cancelAnimationFrame(request);
	if (!lastTime) {lastTime = performance.now();}
	var dt = time - lastTime;
	lastTime = time;
	progress += dt / 1000;
	render(context);
	if (progress < 2) {
		request = requestAnimationFrame(answerLoop);
	} else {
		state.show();
	}
}

function render() {
	var ANIMALX = canvas.width/3;
	var ANIMALY = canvas.height*.2;
	var ANIMALW = canvas.width/3;
	var ANIMALH = canvas.height*.65;
	var prevFillStyle = context.fillStyle;
	context.clearRect(0, 0, canvas.width, canvas.height);
	blurContext.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
	fitImage(context, bg);
	context.fillStyle = "black";
	context.globalAlpha = Math.max(.8*(1 - progress/2), 0);
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1;
	if (progress < 1) {
		var mult = Math.pow(progress, .6);
		blurContext.filter = "blur(" + pixels * (1 - mult) + "px)";
		if (progress < .33) {
			blurContext.globalAlpha = progress / .33;
		} else {
			blurContext.globalAlpha = 1;
		}
		//fitImage(context, silhouette);
		fitImage(blurContext, silhouette, ANIMALX, ANIMALY, ANIMALW, ANIMALH);
		fitImage(context, blurCanvas);
	} else if (progress >= 1  && progress < 2) {
		var mult = Math.pow(progress - 1, 1.2);
		context.filter = "none";
		//fitImage(context, img);
		fitImage(context, animal.img, ANIMALX, ANIMALY, ANIMALW, ANIMALH);
		if (progress < 2) {
			context.globalAlpha = 1 - mult;
		} else {
			context.globalAlpha = 0;
		}
		fitImage(context, silhouette, ANIMALX, ANIMALY, ANIMALW, ANIMALH);
		//fitImage(context, silhouette);
		context.globalAlpha = 1;
	} else {
		fitImage(context, animal.img, ANIMALX, ANIMALY, ANIMALW, ANIMALH);
		//fitImage(context, img);
	}
	context.save()
	context.translate(canvas.width/2, canvas.height/2);
	context.scale(1 + progress/2, 1 + progress/2)
	fitImage(context, fg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
	context.restore();
	//hide during pause
	//if (paused && progress > 0) { 
	//	context.filter = "none";
	//	context.fillStyle = "black";
	//	context.globalAlpha = 1;
	//	context.fillRect(0, 0, canvas.width, canvas.height);
	//	context.fillStyle = "white";
	//	fitText(context, "?", canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
	//}

	//progress bar
	context.filter = "none";
	context.fillStyle = "yellow";
	context.globalAlpha = .7;
	context.fillRect(0, 0, canvas.width * progress / 2, canvas.height * .03);
	if (progress >= 2) {
		fitText(context, animal.name, canvas.width*3/4, canvas.height*(1-.13), canvas.width/4, canvas.height*.1);
	}
	context.globalAlpha = 1;

	fitText(context, hd.drawn.length+"/"+hd.choices.length, 10, 10, canvas.width/16, canvas.height*.1);
	context.fillStyle = prevFillStyle;
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//bg = lloader.newImageAsset("jungle_background.jpg", onload);
bg = lloader.newImageAsset("bg2.png", onload);
//fg = lloader.newImageAsset("jungle_foreground.png", onload);
fg = lloader.newImageAsset("fg2.png", onload);
