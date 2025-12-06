"use strict"

import fitImage from "../js_modules/fitImage.mjs"
import fitText from "../js_modules/fitText.mjs"
import Loader from "../js_modules/Loader.mjs"
import FLAGS from "../image_library/flags/flags.mjs"

function Princess() {
	var index = Math.floor(Math.random()*unmatchedFemales.length);
	var princess = unmatchedFemales.splice(index, 1)[0];
	var suitors = [];
	var match = unmatchedMales.splice(index, 1)[0];
	var pool = unmatchedMales.slice();
	match.kissed = false;
	if (unmatchedMales.length > 1) {
		var mismatch = pool.splice(Math.floor(Math.random()*pool.length), 1)[0];
		mismatch.kissed = false;
		suitors.push(mismatch);
	}
	if (unmatchedMales.length > 1) {
		var mismatch = pool.splice(Math.floor(Math.random()*pool.length), 1)[0];
		mismatch.kissed = false;
		suitors.push(mismatch);
	}
	suitors.push(match)
	var tmp = [];
	while (suitors.length > 0) {
		tmp.push(suitors.splice(Math.floor(Math.random()*suitors.length), 1)[0]);
	}
	this.princess = princess;
	this.flag = princess;
	this.match = match;
	this.suitors = tmp;
	this.render = function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		vcanvas.width = window.innerWidth;
		vcanvas.height = window.innerHeight;
		context.fillStyle = "gray";
		context.fillRect(0, 0, canvas.width/5, canvas.height*.2);
		context.fillStyle = "purple";
		fitImage(context, this.princess.flag, 0, 0, canvas.width/5, canvas.height*.2);
		fitText(context, COUNTRIES[this.princess.cc], canvas.width/10, 0, canvas.width*.4, canvas.height*.2);
		context.save();
		context.scale(-1,1);
		fitImage(context, this.princess.img, -canvas.width/5, 0, canvas.width/5, canvas.height*.9, "s");
		context.restore();
		this.suitors.forEach(function (s, i) {
			console.log(s);
			if (s.kissed) {
				if (s.cc == this.princess.cc) {
					context.fillStyle = "pink";
					context.fillRect(canvas.width/5*(i+2), 0, canvas.width/5, canvas.height);
					fitImage(context, s.img, canvas.width/5*(i+2), 0, canvas.width/5, canvas.height, "s");
				} else {
					fitImage(context, frog, canvas.width/5*(i+2), canvas.height*.6, canvas.width/5, canvas.height*.4, "s");
				}
			} else {
				fitImage(context, s.img, canvas.width/5*(i+2), 0, canvas.width/5, canvas.height, "s");
			}
		}.bind(this));
	};
	this.renderLove = function () {
		var progress = performance.now() - startTime;
		context.fillStyle = "pink";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.save();
		context.translate(canvas.width/2, 0);
		context.scale(-1,1);
		fitImage(context, this.princess.img, -canvas.width*.01, 0, canvas.width/5, canvas.height*.9, "s");
		context.restore();
		fitImage(context, this.match.img, canvas.width*.49, 0, canvas.width/5, canvas.height*.9, "s");
	}
}

function onload() {
	if (loader.assetsLoaded) {
		princess = new Princess();
		princess.render();
	}
}

function pdHandler(e) {
	var kissTarget = Math.floor(e.clientX/window.innerWidth*5 - 2);
	if (kissTarget >= 0) {
		var target = princess.suitors[kissTarget];
		console.log("kissed", kissTarget, target.cc, princess.princess.cc);
		target.kissed = true;
		if (target.cc === princess.princess.cc) {
			love.play();
			startTime = performance.now();
			//princess.render();
			princess.renderLove();
		} else {
			croak.currentTime = 0;
			croak.play();
			princess.render();
		}
		
	}
}

function kdHandler(e) {
	if (e.key === "Enter") {
		love.pause();
		love.currentTime = 0;
		princess = new Princess();
		princess.render();
	}
}

var KEWPIE = [
	"au",
	"ch",
	"cn",
	"de",
	"eg",
	"fr",
	"gb",
	"in",
	"it",
	"jp",
	"ke",
	"kr",
	"us"
];

var COUNTRIES = {
	"au": "Australia", "ch": "Switzerland", "cn": "China", "de": "Germany", "eg": "Egypt", "fr": "France", "gb": "The U.K. (Scotland)", "in": "India", "it": "Italy", "jp": "Japan", "ke": "Kenya", "kr": "Korea", "us": "the U.S.A."
}

var loader = new Loader("./img/");
var loaderFlags = new Loader("../image_library/flags/img/");
var unmatchedMales = [];
var unmatchedFemales = [];
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var vcanvas = document.createElement("canvas");
var vcontext = vcanvas.getContext("2d");
var frog = loader.newImageAsset("frog_prince2.png", onload);
var croak = loader.newAudioAsset("croak.mp3", onload);
var love = loader.newAudioAsset("love.mp3", onload);
var princess;
var animationRequest, startTime;
KEWPIE.forEach(function (cc) {
	unmatchedMales.push({
		"cc": cc,
		"img": loader.newImageAsset(cc + "_m.png", onload),
		"flag": loaderFlags.newImageAsset(cc+".png", onload)
	});
	unmatchedFemales.push({
		"cc": cc,
		"img": loader.newImageAsset(cc + "_f.png", onload),
		"flag": loaderFlags.newImageAsset(cc+".png", onload)
	});
});
console.log(unmatchedMales, unmatchedFemales);

document.body.appendChild(canvas);
window.addEventListener("pointerdown", pdHandler);
window.addEventListener("keydown", kdHandler);
