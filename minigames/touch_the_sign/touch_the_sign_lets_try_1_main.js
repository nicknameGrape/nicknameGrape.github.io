"use strict"

requirejs.config({
baseUrl: '../js',
paths: {
	"touch_the_sign": "../touch_the_sign"
}
});

require(["fitText", "fitTextArray", "HatDraw", "touch_the_sign/signs_lets_try_1", "Loader"], function (fitText, fitTextArray, HatDraw, hdSigns, Loader) {
	function start() {
		sign = hdSigns.drawOne();
		mistakes = 0;
		startTime = performance.now();
		REFS.map.canvas.addEventListener("pointerdown", mapPointerdownHander);
		request = window.requestAnimationFrame(loop);
	}

	function onload() {
		if (loader.assetsLoaded) {
			render();
		}
	}

	function loop() {
		console.log("looping");
		progress = Math.min((performance.now() - startTime)/TIME_LIMIT, .97);
		tween = Math.pow(progress, 2);
		if (mistakes < 3) {
			toAdd = parseInt(Math.max((1 - progress)*TOP_SCORE, 0)*Math.pow(.75, mistakes));
			
		} else {
			toAdd = 0;
		}
		if (toAdd > 0) {
			render();
			request = window.requestAnimationFrame(loop);
		} else {
			attempts += 1;
			avg = Math.floor(total/attempts);
			render();
			REFS.map.canvas.removeEventListener("pointerdown", mapPointerdownHander);
			sign = null;
		}
	}

	function mapPointerdownHander(e) {
		//console.log("SIGN", sign, "PIXEL", e.offsetX/scale, e.offsetY/scale);
		//var x = e.offsetX/scale, y = e.offsetY/scale;
		var zoomX = sign.x1*tween;
		var zoomY = sign.y1*tween;
		var zoomW = (sign.x2 - sign.x1)*tween + img.width*(1-tween);
		var zoomH =  (sign.y2 - sign.y1)*tween + img.height*(1-tween);
		//var mh = REFS.map.canvas.height;
		//var mw = mh*zoomW/zoomH;
		var mw = REFS.map.canvas.width;
		var mh = mw*zoomH/zoomW;
		var x = zoomX + e.offsetX/mw*zoomW;
		var y = zoomY + e.offsetY/mh*zoomH;
		console.log(x, y, sign.x1, sign.y1);
		if (x >= sign.x1 && x <= sign.x2 && y >= sign.y1 && y <= sign.y2) {
			wrong.pause();
			right.pause();
			right.currentTime = .3;
			right.play();
			console.log("right!");
			total += toAdd;
			REFS.map.canvas.removeEventListener("pointerdown", mapPointerdownHander);
			window.cancelAnimationFrame(request);
			attempts += 1;
			avg = Math.floor(total/attempts);
			progress = .9;
			render();
			sign = null;
		} else {
			console.log("wrong!");
			wrong.pause();
			wrong.currentTime = .7;
			wrong.play();
			mistakes += 1;
		}
	}

	function hintPointerdownHander(e) {
		if (sign === null) {
			start();
		}
	}

	function render() {
		Object.values(REFS).forEach(function (o) {
			o.canvas.width = o.div.clientWidth;
			o.canvas.height = o.div.clientHeight;
		});
		var cMap = REFS.map.canvas;
		var xMap = REFS.map.context;
		var ar_img = img.width/img.height;
		var ar_canvas = cMap.width/cMap.height;
		if (sign !== null) {
			var zoomX = sign.x1*tween;
			var zoomY = sign.y1*tween;
			var zoomW = (sign.x2 - sign.x1)*tween + img.width*(1-tween);
			var zoomH =  (sign.y2 - sign.y1)*tween + img.height*(1-tween);
		} else {
			var zoomX = 0;
			var zoomY = 0;
			var zoomW = img.width;
			var zoomH = img.height;
		}
		if (ar_img > ar_canvas) {
			scale = cMap.width/img.width;
			//xMap.drawImage(img, 0, 0, cMap.width, cMap.width*img.height/img.width);
			xMap.drawImage(img, zoomX, zoomY, zoomW, zoomH, 0, 0, cMap.width, cMap.width*img.height/img.width);
		} else {
			scale = cMap.height/img.height;
			//xMap.drawImage(img, 0, 0, cMap.height*img.width/img.height, cMap.height);
			xMap.drawImage(img, zoomX, zoomY, zoomW, zoomH, 0, 0, cMap.height*img.width/img.height, cMap.height);
		}
		console.log("SCALE", scale);
		//context.strokeStyle = "yellow";
		//context.lineWidth = 5;
		//hdSigns.choices.forEach(function (o) {
		//	context.strokeRect(o.x1*scale, o.y1*scale, (o.x2 - o.x1)*scale, (o.y2 - o.y1)*scale);
		//});
		REFS.hint.context.fillStyle = "pink";
		if (sign !== null) {
			fitText(REFS.hint.context, sign.sign);
		}
		REFS.avg.context.fillStyle = "white";
		fitTextArray(REFS.avg.context, ["ATTEMPTS: " + attempts, "AVG: " + avg]);
		REFS.total.context.fillStyle = "white";
		fitText(REFS.total.context, total);
		REFS.toAdd.context.fillStyle = "white";
		if (toAdd !== null) {
			fitText(REFS.toAdd.context, toAdd);
		}
	}
	var AREAS = ["avg", "total", "toAdd", "map", "hint"];
	var REFS = {};
	AREAS.forEach(function (string) {
		var div = document.getElementById(string);
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		div.appendChild(canvas);
		REFS[string] = {
			"div": div,
			"canvas": canvas,
			"context": context
		}
	});
	console.log(REFS);
	var loader = new Loader("./");
	var img = loader.newImageAsset("lets_try_1_ABC_town_cropped.png", onload);
	var attempts = 0, avg = 0, total = 0, toAdd = null;
	var sign = null, scale;
	var progress, tween, startTime, request, TIME_LIMIT = 10000, TOP_SCORE = 1000, mistakes;
	var right = loader.newAudioAsset("correct.mp3", onload);
	var wrong = loader.newAudioAsset("wrong.mp3", onload);
	//img.src = "./lets_try_2_abc_hunt.jpg";
	window.addEventListener("resize", function () {render();});
	REFS.hint.canvas.addEventListener("pointerdown", hintPointerdownHander);
})
