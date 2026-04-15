"use strict"

import il from "../image_library/image_library.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"

function handler(ev) {
	console.log(ev.target.innerHTML, treasureIndices);
	if (treasureIndices.includes(parseInt(ev.target.innerHTML))) {
		this.innerHTML = "";
		this.replaceWith(imgTreasure.cloneNode());
	} else {
		var img = new Image();
		var rSrc = categoryHD.drawOne().hd.drawOne().src;
		console.log(rSrc);
		img.src = PATH2IMAGES + rSrc;
		this.innerHTML = "";
		this.replaceWith(img);
	}
}

var PATH2IMAGES = "../image_library/images/";
var CATEGORIES = [
	{"tag": "fruit", "english": "Ready?"},
	//{"tag": "animal", "english": "Ready?"},
	{"tag": "color", "english": "Ready?"},
	//{"tag": "number", "english": "Ready?"},
	//{"tag": "feeling", "english": "Ready?"},
	{"tag": "pet", "english": "Ready?"},
	{"tag": "drink", "english": "Ready?"},
	//{"tag": "big", "english": "Ready?"},
	//{"tag": "small", "english": "Ready?"},
	//{"tag": "shape", "english": "Ready?"},
	{"tag": "food", "english": "Ready?"},
	{"tag": "sport", "english": "Ready?"}//,
	//{"tag": "round", "english": "Ready?"},
];
const imgTreasure = document.createElement("img");
imgTreasure.src = "../image_library/images/treasure_zf19w0so.png";
const treasureIndices = [...Array(20).keys()].map(n => n+1);
while (treasureIndices.length > 3) {
	treasureIndices.splice(Math.floor(Math.random()*treasureIndices.length), 1);
}


var items = document.getElementsByClassName("item");
var categoryHD;

Array.from(items).forEach(function (i) {
	i.addEventListener("click", handler);
	i.addEventListener("touchstart", handler);
});

CATEGORIES.forEach(function (category) {
	var targets = il.filter(function (o) {
		return o.tags.includes(category.tag);
	});
	console.log(category.tag, targets);
	var targetsHD = new HatDraw(targets);
	category.hd = targetsHD;
});
categoryHD = new HatDraw(CATEGORIES);

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('touchstart', event => {event.preventDefault();}, {passive: false});
