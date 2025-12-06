import Loader from "../js_modules/Loader.mjs"
import fitText from "../js_modules/fitText.mjs"
import fitTextMontage from "../js_modules/fitTextMontage.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import fitMontage from "../js_modules/fitMontage.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"
import CHARACTERS from "../image_library/characters/popular.mjs"
import images from "../image_library/image_library.mjs"

function keypressHandler(ev) {
	if (ev.key === " ") {
		if (progress === n) {
			progress = 0;
			newQuiz();
			render();
		} else {
			progress += 1;
			render();
		}
	}
}

var n = parseInt(prompt("How many examples would you like to be given\nbefore the category is revealed?"));
var progress = 0;
var categories = ["color", "food", "fruit", "animal", "vegetable", "drink", "sport"];
var categoriesHD;
var loader = new Loader("../image_library/images/");
var theseImages, theseWords, theseAre;

var newQuiz = function () {
	console.log("new quiz");
	var hd = categoriesHD.drawOne();
	theseImages = [];
	theseWords = [];
	for (var i=0;i<n;i++) {
		var draw = hd.drawOne();
		theseAre = hd.name;
		theseImages.push(loader.newImageAsset(draw.src, function () {
			if (loader.assetsLoaded) {
				render();
			}
		}));
		theseWords.push(draw.text);
	}
};

var setup = function () {
	var boringList = [
		"centipede", "goat", "puzzle", "puppet", "bat", "ball", "baseball", "gazelle"
	];
	var things = images.filter(function (obj) {
		return !boringList.includes(obj.text);
	})
	categories.forEach(function (c) {
		window[c + "s"] = [];
	});
	things.forEach(function (e) {
		categories.forEach(function (c) {
			if (e.tags.includes(c)) {
				window[c + "s"].push(e);
			}
		});
	});
	categories.forEach(function (c) {
		let hd = new HatDraw(window[c + "s"]);
		hd.name = c + "s";
		window[c + "sHD"] = hd;
	});
	categoriesHD = new HatDraw([colorsHD, foodsHD, fruitsHD, animalsHD, vegetablesHD, drinksHD, sportsHD]);
	newQuiz();

	window.addEventListener("keypress", keypressHandler);
};

var takedown = function () {
};

var update = function () {
};

var render = function () {
	const canvas = document.getElementById("myCanvas");
	const context = canvas.getContext("2d");
	context.fillStyle = "yellow";
	context.fillRect(0, 0, canvas.width, canvas.height);
	if (progress === n) {
		context.fillStyle = "lime";
		fitText(context, theseAre, 0, 0, canvas.width, canvas.height*.3);
		fitMontage(context, theseImages, 0, canvas.height*.3, canvas.width, canvas.height*.4);
		context.fillStyle = "white";
		fitTextMontage(context, theseWords, 0, canvas.height*.7, canvas.width, canvas.height*.3);

	} else {
		fitImage(context, theseImages[progress], 0, canvas.height*.3, canvas.width, canvas.height*.7);
		context.fillStyle = "white";
		fitText(context, theseWords[progress], 0, 0, canvas.width, canvas.height*.3);
	}
};

export default {
	setup: setup,
	takedown: takedown,
	update: update,
	render: render
};
