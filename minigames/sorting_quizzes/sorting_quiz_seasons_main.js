"use strict"

import fitImage from "../js_modules/fitImage.mjs"
import fitText from "../js_modules/fitText.mjs"

function render() {
	var column_width = canvas.width/5;
	var text_height = canvas.height*.2;
	var BOX_COLUMNS = 4;
	var box_item_width = column_width/BOX_COLUMNS;
	var box_item_height = (canvas.height-text_height)/6;
	for (var i=0;i<BG_TEXT.length;i++) {
		context.fillStyle = BG_COLORS[i];
		context.fillRect(column_width*i, 0, column_width, canvas.height);
		context.fillStyle = TEXT_COLORS[i];
		fitText(context, BG_TEXT[i], column_width*i, 0, column_width, text_height);
	}
	boxes.forEach(function (box, i) {
		context.save();
			context.translate(column_width*(i+1), text_height);
			box.forEach(function (item, i) {
				var row = Math.floor(i/BOX_COLUMNS);
				var col = i%BOX_COLUMNS;
				fitImage(context, item.img, item.x, item.y, item.w, item.h, col*box_item_width, row*box_item_height, box_item_width, box_item_height);
			});
		context.restore();
	});
	if (mystery !== null) {
		fitImage(context, mystery.img, mystery.x, mystery.y, mystery.w, mystery.h, 0, text_height, column_width, canvas.height - text_height);
	}
}

var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
var BG_TEXT = ["?", "winter", "spring", "summer", "autumn"];
var BG_COLORS = ["purple", "white", "springGreen", "yellow", "orange"];
var TEXT_COLORS = ["white", "grey", "pink", "cyan", "red"];
var SEASONALS = [
	{"x": 179, "y": 274, "w": 98, "h": 113, "text": "sweet potatos", "season": "autumn"},
	{"x": 118, "y": 389, "w": 94, "h": 118, "text": "carrots", "season": "autumn"},
	{"x": 197, "y": 463, "w": 86, "h": 110, "text": "leeks", "season": "autumn"},
	{"x": 125, "y": 575, "w": 96, "h": 98, "text": "shiitake mushrooms", "season": "autumn"},
	{"x": 291, "y": 271, "w": 94, "h": 103, "text": "kaki", "season": "autumn"},
	{"x": 386, "y": 342, "w": 73, "h": 115, "text": "grapes", "season": "autumn"},
	{"x": 294, "y": 415, "w": 93, "h": 101, "text": "apple", "season": "autumn"},
	{"x": 384, "y": 502, "w": 76, "h": 84, "text": "pear", "season": "autumn"},
	{"x": 307, "y": 577, "w": 81, "h": 96, "text": "chestnut", "season": "autumn"},
	{"x": 472, "y": 300, "w": 78, "h": 91, "text": "kiku", "season": "autumn"},
	{"x": 557, "y": 283, "w": 83, "h": 106, "text": "cosmos", "season": "autumn"},
	{"x": 468, "y": 389, "w": 85, "h": 98, "text": "maple leaves", "season": "autumn"},
	{"x": 565, "y": 402, "w": 72, "h": 98, "text": "ginko leaves", "season": "autumn"},
	{"x": 477, "y": 494, "w": 65, "h": 93, "text": "acorn", "season": "autumn"},
	{"x": 545, "y": 541, "w": 85, "h": 106, "text": "pine cone", "season": "autumn"},
	{"x": 474, "y": 588, "w": 69, "h": 84, "text": "rice", "season": "autumn"},
	{"x": 722, "y": 274, "w": 93, "h": 115, "text": "moon viewing", "season": "autumn"},
	{"x": 646, "y": 364, "w": 102, "h": 110, "text": "sweet potato harvest", "season": "autumn"},
	{"x": 723, "y": 450, "w": 92, "h": 110, "text": "sports day", "season": "autumn"},
	{"x": 643, "y": 517, "w": 84, "h": 98, "text": "Halloween", "season": "autumn"},
	{"x": 709, "y": 572, "w": 105, "h": 103, "text": "753", "season": "autumn"},
	{"x": 827, "y": 303, "w": 167, "h": 74, "text": "saury fish", "season": "autumn"},
	{"x": 861, "y": 409, "w": 86, "h": 98, "text": "cricket", "season": "autumn"},
	{"x": 156, "y": 267, "w": 81, "h": 97, "text": "cabbage", "season": "spring"},
	{"x": 158, "y": 370, "w": 79, "h": 107, "text": "potato", "season": "spring"},
	{"x": 159, "y": 478, "w": 76, "h": 86, "text": "onion", "season": "spring"},
	{"x": 168, "y": 571, "w": 60, "h": 94, "text": "bamboo shoots", "season": "spring"},
	{"x": 346, "y": 268, "w": 67, "h": 98, "text": "strawberry", "season": "spring"},
	{"x": 470, "y": 267, "w": 169, "h": 141, "text": "cherry blossoms", "season": "spring"},
	{"x": 472, "y": 412, "w": 70, "h": 93, "text": "rape flowers", "season": "spring"},
	{"x": 556, "y": 412, "w": 79, "h": 98, "text": "dandelions", "season": "spring"},
	{"x": 473, "y": 513, "w": 72, "h": 81, "text": "tulip", "season": "spring"},
	{"x": 570, "y": 517, "w": 50, "h": 76, "text": "tsukushi", "season": "spring"},
	{"x": 480, "y": 594, "w": 150, "h": 73, "text": "carnations", "season": "spring"},
	{"x": 681, "y": 279, "w": 109, "h": 117, "text": "hinamatsuri", "season": "spring"},
	{"x": 645, "y": 422, "w": 80, "h": 116, "text": "koinobori", "season": "spring"},
	{"x": 731, "y": 419, "w": 78, "h": 91, "text": "kabuto", "season": "spring"},
	{"x": 669, "y": 539, "w": 130, "h": 127, "text": "Mother's Day", "season": "spring"},
	{"x": 902, "y": 268, "w": 88, "h": 101, "text": "tadpoles", "season": "spring"},
	{"x": 829, "y": 363, "w": 67, "h": 76, "text": "bees", "season": "spring"},
	{"x": 922, "y": 417, "w": 69, "h": 81, "text": "butterflies", "season": "spring"},
	{"x": 837, "y": 492, "w": 74, "h": 75, "text": "ladybugs", "season": "spring"},
	{"x": 915, "y": 583, "w": 68, "h": 85, "text": "swallows", "season": "spring"},
	{"x": 197, "y": 268, "w": 80, "h": 83, "text": "tomato", "season": "summer"},
	{"x": 128, "y": 310, "w": 74, "h": 126, "text": "cucumber", "season": "summer"},
	{"x": 200, "y": 405, "w": 74, "h": 103, "text": "green pepper", "season": "summer"},
	{"x": 123, "y": 475, "w": 95, "h": 117, "text": "corn", "season": "summer"},
	{"x": 126, "y": 602, "w": 156, "h": 66, "text": "pumpkin", "season": "summer"},
	{"x": 342, "y": 573, "w": 68, "h": 93, "text": "cherries", "season": "summer"},
	{"x": 340, "y": 482, "w": 78, "h": 83, "text": "peaches", "season": "summer"},
	{"x": 346, "y": 367, "w": 71, "h": 98, "text": "melon", "season": "summer"},
	{"x": 340, "y": 266, "w": 84, "h": 97, "text": "watermelon", "season": "summer"},
	{"x": 471, "y": 264, "w": 161, "h": 114, "text": "ajisai", "season": "summer"},
	{"x": 473, "y": 384, "w": 67, "h": 95, "text": "yuri", "season": "summer"},
	{"x": 543, "y": 404, "w": 93, "h": 121, "text": "sunflowers", "season": "summer"},
	{"x": 476, "y": 487, "w": 65, "h": 92, "text": "houzuki", "season": "summer"},
	{"x": 555, "y": 549, "w": 68, "h": 115, "text": "morning glories", "season": "summer"},
	{"x": 645, "y": 569, "w": 88, "h": 98, "text": "fireworks", "season": "summer"},
	{"x": 744, "y": 577, "w": 67, "h": 89, "text": "fan", "season": "summer"},
	{"x": 721, "y": 472, "w": 90, "h": 92, "text": "pool", "season": "summer"},
	{"x": 655, "y": 478, "w": 63, "h": 88, "text": "shaved ice", "season": "summer"},
	{"x": 650, "y": 370, "w": 150, "h": 90, "text": "tanabata", "season": "summer"},
	{"x": 659, "y": 271, "w": 145, "h": 85, "text": "fathers day", "season": "summer"},
	{"x": 832, "y": 275, "w": 78, "h": 94, "text": "snail", "season": "summer"},
	{"x": 922, "y": 358, "w": 69, "h": 81, "text": "frogs", "season": "summer"},
	{"x": 837, "y": 431, "w": 73, "h": 94, "text": "rhino beetles", "season": "summer"},
	{"x": 904, "y": 505, "w": 79, "h": 90, "text": "stag beetles", "season": "summer"},
	{"x": 835, "y": 594, "w": 112, "h": 74, "text": "cicadas", "season": "summer"},
	{"x": 191, "y": 263, "w": 96, "h": 116, "text": "daikon", "season": "winter"},
	{"x": 120, "y": 347, "w": 72, "h": 111, "text": "chinese cabbage", "season": "winter"},
	{"x": 196, "y": 411, "w": 91, "h": 121, "text": "radishes", "season": "winter"},
	{"x": 128, "y": 479, "w": 81, "h": 107, "text": "gobo", "season": "winter"},
	{"x": 194, "y": 571, "w": 87, "h": 106, "text": "spinach", "season": "winter"},
	{"x": 344, "y": 285, "w": 70, "h": 97, "text": "mikan", "season": "winter"},
	{"x": 341, "y": 466, "w": 77, "h": 95, "text": "tsubaki", "season": "winter"},
	{"x": 344, "y": 569, "w": 73, "h": 88, "text": "plum blossoms", "season": "winter"},
	{"x": 491, "y": 579, "w": 77, "h": 98, "text": "kadomatsu", "season": "winter"},
	{"x": 586, "y": 574, "w": 118, "h": 105, "text": "hagoita and koma", "season": "winter"},
	{"x": 715, "y": 576, "w": 85, "h": 103, "text": "setsubun", "season": "winter"},
	{"x": 721, "y": 478, "w": 84, "h": 99, "text": "mochitsuki", "season": "winter"},
	{"x": 602, "y": 477, "w": 87, "h": 99, "text": "kagamimochi", "season": "winter"},
	{"x": 485, "y": 473, "w": 81, "h": 103, "text": "kite flying", "season": "winter"},
	{"x": 487, "y": 373, "w": 82, "h": 100, "text": "skiing", "season": "winter"},
	{"x": 601, "y": 373, "w": 90, "h": 103, "text": "snowman", "season": "winter"},
	{"x": 720, "y": 380, "w": 84, "h": 99, "text": "snowball fight", "season": "winter"},
	{"x": 724, "y": 267, "w": 84, "h": 101, "text": "hats, gloves and scarves", "season": "winter"},
	{"x": 594, "y": 266, "w": 102, "h": 101, "text": "christmas tree", "season": "winter"},
	{"x": 478, "y": 270, "w": 87, "h": 96, "text": "Santa", "season": "winter"},
	{"x": 874, "y": 271, "w": 83, "h": 99, "text": "swan", "season": "winter"},
	{"x": 874, "y": 378, "w": 79, "h": 87, "text": "crab", "season": "winter"},
	{"x": 874, "y": 470, "w": 78, "h": 109, "text": "lobster", "season": "winter"},
	{"x": 875, "y": 586, "w": 78, "h": 91, "text": "octopus", "season": "winter"}
]
var boxes = [
	[],
	[],
	[],
	[]
];
var mystery = null;
var correct = document.createElement("audio");
correct.src = "resources/correct.mp3";
var wrong = document.createElement("audio");
wrong.src = "resources/wrong.mp3";
var winter_img = document.createElement("img");
winter_img.src = "resources/winter_things.jpeg";
var spring_img = document.createElement("img");
spring_img.src = "resources/spring_things.jpeg";
var summer_img = document.createElement("img");
summer_img.src = "resources/summer_things.jpeg";
var autumn_img = document.createElement("img");
autumn_img.src = "resources/fall_things.jpeg";
SEASONALS.forEach(function (o) {
	if (o.season === "winter") {
		o.img = winter_img;
	} else if (o.season === "spring") {
		o.img = spring_img;
	} else if (o.season === "summer") {
		o.img = summer_img;
	} else if (o.season === "autumn") {
		o.img = autumn_img;
	}
});

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

window.addEventListener("pointerdown", function (e) {
	console.log(e);
	var columnWidth = canvas.width/5;
	var columnIndex;
	columnIndex = Math.floor(e.clientX/columnWidth);
	console.log(columnIndex);
	if (columnIndex === 0 && mystery === null) {
		mystery = SEASONALS.splice(Math.floor(SEASONALS.length*Math.random()), 1)[0];
		correct.pause();
		correct.currentTime = 0;
	}
	if (columnIndex > 0 && mystery !== null) {
		if (mystery.season === BG_TEXT[columnIndex]) {
			boxes[columnIndex - 1].push(mystery);
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

render();
