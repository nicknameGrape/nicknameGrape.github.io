"use strict"

import Loader from "../js_modules/Loader.mjs"
import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import flags from "../image_library/flags/flags.mjs"

function render() {
	context.fillStyle = "gray";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "purple";
	context.fillRect(0, 0, canvas.width/2, canvas.height);
	context.fillStyle = "white";
	fitText(context, "?", 0, 0, canvas.width/2, canvas.height);
	countries.forEach(function (c, index, array) {
		context.fillStyle = "darkGray";
		var offsetx = canvas.width/2 + box_width*(index%3);
		var offsety = Math.floor(index/3)*box_height;
		fitImage(context, c.flag,
			offsetx,
			offsety,
			box_width*3/4,
			box_height*3/4
		);
		fitText(context, c.name,
			offsetx,
			offsety + box_height*5/8,
			box_width*3/4,
			box_height/4
		);
		c.attractions.forEach(function (att, i) {
			fitImage(context, att.img,
				offsetx+box_width/2 + box_item_height*(i%2),
				offsety+box_item_height*i/2,
				box_item_width,
				box_item_height
			);
		});
	});
	if (mystery !== null) {
		fitImage(context, mystery.img, 0, 0, canvas.width/2, canvas.height);
	}
}

function onload() {
	//if (loaderFlags.assetsLoaded && loaderAttractions.assetsLoaded) {
	if (loaderFlags.assetsLoaded) {
		render();
	}
}

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
var box_width = canvas.width/2/3;
var box_height = canvas.height/5;
var box_item_width = box_width/3;
var box_item_height = box_height/3;
var loaderFlags = new Loader("../image_library/flags/img/");
var loaderAttractions = new Loader("./attractions/");
var COUNTRIES = ["au", "br", "cn", "eg", "fr", "de", "in", "it", "jp", "ke", "kr", "ch", "gb", "us"];
var ATTRACTIONS = {
	"us": [
		{"text": "The Grand Canyon", "src": "the_grand_canyon.jpg"},
		{"text": "Mt. Rushmore", "src": "mt_rushmore.jpg"},
		{"text": "giant sequoia trees", "src": "giant_sequoia.jpg"}
	],
	"jp": [
		{"text": "the red-crowned crane", "src": "red_crowned_crane.jpg"},
		{"text": "Mt. Fuji", "src": "mt_fuji.jpg"},
		{"text": "ninja", "src": "ninja.jpg"}
	],
	"fr": [
		{"text": "baguette", "src": "baguette.jpg"},
		//{"text": "the Millau Viaduct", "src": "millau_viaduct.jpg"},
		{"text": "French bulldog", "src": "french_bulldog.jpg"},
		{"text": "Mont Saint Michel", "src": "mont_saint_michel.jpg"}
	],
	"kr": [
		{"text": "kimchi", "src": "kimchi.jpg"},
		{"text": "K-pop", "src": "kpop.webp"},
		//{"text": "taekwondo", "src": "taekwondo.jpg"}
		{"text": "Squid Game", "src": "squid_game.jpg"}
	],
	"cn": [
		{"text": "panda", "src": "panda.jpg"},
		{"text": "the Great Wall", "src": "great_wall_china.jpg"},
		{"text": "tai chi", "src": "tai_chi.webp"}
	],
	"de": [
		{"text": "Neuschwanstein Castle", "src": "neuschwanstein.jpg"},
		{"text": "Albert Einstein", "src": "einstein.jpg"},
		{"text": "Oktoberfest", "src": "oktoberfest.webp"}
	],
	"it": [
		{"text": "pizza", "src": "pizza.jpg"},
		{"text": "Leonardo Da Vinci", "src": "da_vinci.jpg"},
		{"text": "the Leaning Tower", "src": "leaning_tower.jpg"}
	],
	"in": [
		{"text": "curry", "src": "curry.jpg"},
		{"text": "Ghandi", "src": "ghandi.webp"},
		{"text": "the Taj Mahal", "src": "taj_mahal.jpg"}
	],
	"au": [
		{"text": "kangaroos", "src": "kangaroos.jpg"},
		{"text": "the Sydney Opera House", "src": "sydney_opera_house.jpg"},
		{"text": "Uluru/Ayer's Rock", "src": "uluru.jpg"}
	],
	"ke": [
		{"text": "the Maasai people", "src": "maasai_jump.jpg"},
		{"text": "runners", "src": "kenyan_runners.jpg"},
		{"text": "wildebeest", "src": "wildebeest_migration.jpg"}
	],
	"ch": [
		{"text": "fondue", "src": "fondue.jpg"},
		{"text": "Swiss Army Knife", "src": "swiss_army_knife.jpg"},
		//{"text": "alpenhorn", "src": "alpenhorn.jpg"}
		{"text": "swiss cheese", "src": "swiss_cheese.jpg"}
	],
	"br": [
		{"text": "Rio Carnival", "src": "rio_carnival.webp"},
		{"text": "Cristo Redentor", "src": "cristo_redentor.jpg"},
		{"text": "the Amazon", "src": "amazon.jpg"}
	],
	"eg": [
		{"text": "the Pyramids", "src": "pyramids.jpg"},
		{"text": "dung beetle", "src": "dung_beetle.jpg"},
		//{"text": "the Suez Canal", "src": "suez_canal.jpg"}
		{"text": "King Tut", "src": "king_tut.jpg"}
	],
	"gb": [
		{"text": "the Beatles", "src": "the_beatles.jpg"},
		{"text": "Stonehenge", "src": "stonehenge.jpg"},
		{"text": "Big Ben", "src": "big_ben.jpg"}
	]
};
var countries = [];
var famous = [];
COUNTRIES.forEach(function (code) {
	var imgFlag = loaderFlags.newImageAsset(code + ".png", onload);
	var attractions = ATTRACTIONS[code];
	attractions.map(function (a) {
		var imgA = loaderAttractions.newImageAsset(a.src, onload);
		a["img"] = imgA;
		a["code"] = code;
		return a;
	});
	famous = famous.concat(attractions);
	if (COUNTRIES.includes(code)) {countries.push({
		"code": code,
		"name": flags[code],
		"flag": imgFlag,
		"attractions": []
	});}
});
console.log(countries, famous);
var mystery = null;
var correct = document.createElement("audio");
correct.src = "correct.mp3";
var wrong = document.createElement("audio");
wrong.src = "wrong.mp3";

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	box_width = canvas.width/2/3;
	box_height = canvas.height/5;
	box_item_width = box_width/3;
	box_item_height = box_height/3;
	render();
});

window.addEventListener("pointerdown", function (e) {
	console.log(e);
	var offsetX = canvas.width/2;
	var column, row;
	var columnIndex;
	if (e.pointerType === "mouse") {
		column = Math.floor((e.clientX - offsetX)/box_width);
		row = Math.floor(e.clientY/box_height);
		columnIndex = row*3+column;
	} else {
		column = Math.floor((e.clientX - offsetX)/box_width);
		row = Math.floor(e.clientY/box_height);
		columnIndex = row*3+column;
	}
	console.log(columnIndex);
	if (Math.sign(column) === -1 && mystery === null) {
		mystery = famous.splice(Math.floor(famous.length*Math.random()), 1)[0];
		correct.pause();
		correct.currentTime = 0;
	}
	if (Math.sign(column) >= 0 && mystery !== null) {
		var country = countries[columnIndex];
		if (mystery.code === country.code) {
			country.attractions.push(mystery);
			mystery = null;
			wrong.pause();
			correct.play();
		} else {
			wrong.pause();
			wrong.currentTime = .7;
			wrong.play();
		}
	}
	render();
});
