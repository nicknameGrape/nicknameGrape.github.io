"use strict"

import fitImage from "../js_modules/fitImage.mjs";
import fitText from "../js_modules/fitText.mjs";
import il from "../image_library/image_library.mjs";


	function drawCount() {
		var rows = Math.floor(Math.sqrt(count));
		var cols = Math.floor(Math.sqrt(2)*rows);
		console.log(rows, cols, rows*cols);
		var w = canvas.width/cols;
		var h = canvas.height/rows;
		var points = [];
		for (var c=0; c<cols; c++) {
			for (var r=0; r<rows; r++) {
				points.push({"r": r, "c": c});
			}
		}
		while (points.length > count) {
			points.splice(Math.floor(points.length*Math.random()), 1);
		}
		points.forEach(function (p) {
			fitImage(countContext, img, w*p.c, h*p.r, w, h);
		});
		draw();
	}

	function draw() {
		console.log(img, count);
		context.clearRect(0, 0, canvas.width, canvas.height);
		fitImage(context, countCanvas);
		context.fillStyle = "red";
		fitText(context, high, 0, 0, canvas.height*.2, canvas.height*.2);
		context.fillStyle = "blue";
		fitText(context, low, 0, canvas.height*.2, canvas.height*.2, canvas.height*.2);
		//if (parseInt(guess) === count) {
		//	context.fillStyle = "green";
		//	fitText(context, guess, 0, 0, canvas.width, canvas.height);
		//} else {
			context.fillStyle = "yellow";
			fitText(context, guess, .3*canvas.width, 0, .7*canvas.width, canvas.height);
		//}
		//fitImage(context, img);
		//fitText(context, (current + 1) + "/" + images.length, 0, 0, 100, 50);
	}

	function keyHandler(e) {
		var guessInt = parseInt(e.key);
		if (Number.isInteger(guessInt)) {
			if (guess.length < 2) {
				guess += e.key;
			}
			if (guess.length === 2) {
				guess += "0";
			}
			console.log(guess);
		}
		if (e.key === "Enter") {
			if (parseInt(guess) > count && parseInt(guess) < high) {
				high = guess;
			} else if (parseInt(guess) < count && parseInt(guess) > low) {
				low = guess;
			} else if (parseInt(guess) === count) {
				context.fillStyle = "green";
				fitText(context, guess, .3*canvas.width, 0, .7*canvas.width, canvas.height);
				return;
			}
			if (parseInt(guess) !== count) {
				guess = "";
			} else {
				console.log("right!");
				window.removeEventListener("keydown", keyHandler);
			}
		}
		if (e.key === "Backspace") {
			guess = guess.slice(0, guess.length - 1);
		}
		draw()
	}

	function setup() {
		var src = plurals.splice(Math.floor(plurals.length*Math.random()), 1)[0].src;
		img = document.createElement("img");
		img.onload = drawCount;
		//count = Math.floor((UPPER_BOUND - LOWER_BOUND)*Math.random()) + LOWER_BOUND;
		count = Math.round((UPPER_BOUND - LOWER_BOUND)/10*Math.random())*10 + LOWER_BOUND; //LIMITED TO MULTIPLES OF 10
		console.log(count);
		img.src = PATH_TO_IMAGES + src;
	}

	//var UPPER_BOUND = 1000;
	var UPPER_BOUND = 990;
	var LOWER_BOUND = 100;
	var PATH_TO_IMAGES = "../image_library/images/";

	var canvas = document.getElementById("myCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");
	var countCanvas = document.createElement("canvas");
	var countContext = countCanvas.getContext("2d");
	countCanvas.width = window.innerWidth;
	countCanvas.height = window.innerHeight;
	var img = null;
	var count = null;
	var plurals = il.filter(function (o) {
		return o.tags.includes("fruit") && o.plural !== "None";
	});
	var guess = "";
	var high = UPPER_BOUND;
	var low = LOWER_BOUND;

	window.addEventListener("resize", function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		draw();
	});

	window.addEventListener("keydown", keyHandler);

	setup();
