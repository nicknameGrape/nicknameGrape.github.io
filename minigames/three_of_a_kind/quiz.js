define(function (require) {
	var Mousetrap = require("mousetrap.min");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var images = require("image_library/images");
	var HatDraw = require("HatDraw");

	var imageHD = new HatDraw(images);
	var progress1 = 0;
	var progress2 = 0;
	var sets = [];

	var setup = function () {
		var tags = [];
		images.forEach(function (e) {
			e.tags.forEach(function (e) {
				if (!tags.includes(e)) {
					tags.push(e);
				}
			});
		});
		tags = tags.map(function (e) {
			var count = 0;
			images.forEach(function (i) {
				if (i.tags.includes(e)) {
					count++;
				}
			});
			return {"tag": e, "count": count};
		});
		tags = tags.filter(function (obj) {
			return obj.count >= 3;
		});
		tags = tags.map(function (obj) {
			return obj.tag;
		});
		console.log(tags);

		while (sets.length < 5) {
			tag = tags.splice(Math.floor(Math.random() * tags.length), 1)[0];
			var set = [];
			var indexes = Array.from(Array(images.length).keys());
			while (set.length < 3) {
				var index = indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0];
				if (images[index]["tags"].includes(tag)) {
					set.push(images[index]);
				}
			}
			sets.push(set);
			console.log(set);
		}

		sets.forEach(function (e) {
			e.forEach(function (f) {
				f["img"] = game.loader.newImageAsset("../image_library/images/" + f.src);
			});
		});

		Mousetrap.bind("space", function (event) {
			if (progress2 < 3) {
				progress2 += 1;
			} else {
				progress1 += 1;
				progress2 = 0;
			}
		});
	};

	var takedown = function () {
	};

	var update = function () {
	};

	var render = function (context) {
		var canvas = game.canvas;
		var context = game.context;
		context.fillStyle = "yellow";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "white";
		if (game.loader.assetsLoaded) {
			if (progress2 === 3) {
				fitImage(context, sets[progress1][progress2 - 3]["img"], canvas.width / 3 * 0, 0, canvas.width / 3, canvas.height * .6);
				fitText(context, sets[progress1][progress2 - 3]["text"], canvas.width / 3 * 0, canvas.height * .6, canvas.width / 3, canvas.height * .4);
				fitImage(context, sets[progress1][progress2 - 2]["img"], canvas.width / 3 * 1, 0, canvas.width / 3, canvas.height * .6);
				fitText(context, sets[progress1][progress2 - 2]["text"], canvas.width / 3 * 1, canvas.height * .6, canvas.width / 3, canvas.height * .4);
				fitImage(context, sets[progress1][progress2 - 1]["img"], canvas.width / 3 * 2, 0, canvas.width / 3, canvas.height * .6);
				fitText(context, sets[progress1][progress2 - 1]["text"], canvas.width / 3 * 2, canvas.height * .6, canvas.width / 3, canvas.height * .4);
			} else {
				fitImage(context, sets[progress1][progress2]["img"], 0, 0, canvas.width, canvas.height * .6);
				fitText(context, sets[progress1][progress2]["text"], 0, canvas.height * .6, canvas.width, canvas.height * .4);
			}
		} else {
			fitText(context, "Loading");
		}
	};

	return {
		setup: setup,
		takedown: takedown,
		update: update,
		render: render
	};
});
//<script>
//var canvas = document.getElementById("myCanvas");
//var context = canvas.getContext("2d");
//
//var progress = -1;
//var count = 0;
//
//var sources = [
//{
//	"src": "0265_L_01.jpg",
//	"text": "L"
//},
//{
//	"src": "0266_M_01.jpg",
//"text": "M"
//},
//{
//	"src": "0267_N_01.jpg",
//"text": "N"
//},
//{
//	"src": "0244_diamond_01.jpg",
//"text": "diamond"
//},
//{
//	"src": "0241_square_01.jpg",
//"text": "square"
//},
//{
//	"src": "0243_triangle_01.jpg",
//"text": "triangle"
//},
//{
//	"src": "0309_gym_01.jpg",
//"text": "gym"
//},
//{
//	"src": "0307_classroom_01.jpg",
//"text": "classroom"
//},
//{
//	"src": "0308_library_01.jpg",
//"text": "library"
//},
//{
//	"src": "0092_sheep_01.jpg",
//"text": "sheep"
//},
//{
//	"src": "0167_egg_01.jpg",
//"text": "egg"
//},
//{
//	"src": "0221_baseball_01.jpg",
//"text": "baseball"
//},
//{
//	"src": "5733_fish_01.jpg",
//"text": "fish"
//},
//{
//	"src": "0463_fork_01.jpg",
//"text": "fork"
//},
//{
//	"src": "0383_February_01.jpg",
//"text": "February"
//}
////	{
////		"src": "0013_two_01.jpg",
////		"text": "two"
////	},
////	{
////		"src": "0023_twelve_01.jpg",
////		"text": "twelve"
////	},
////	{
////		"src": "0031_twenty_01.jpg",
////		"text": "twenty"
////	},
////	{
////		"src": "0133_fish_01.jpg",
////		"text": "fish"
////	},
////	{
////		"src": "0103_shark_01.jpg",
////		"text": "shark"
////	},
////	{
////		"src": "0105_octopus_01.jpg",
////		"text": "octopus"
////	},
////	{
////		"src": "0129_dragonfly_01.jpg",
////		"text": "dragonfly"
////	},
////	{
////		"src": "0594_airplane_01.jpg",
////		"text": "airplane"
////	},
////	{
////		"src": "kite.jpg",
////		"text": "kite"
////	},
////	{
////		"src": "0504_playkendama_01.jpg",
////		"text": "kendama"
////	},
////	{
////		"src": "0180_natto_01.jpg",
////		"text": "natto"
////	},
////	{
////		"src": "samurai.png",
////		"text": "samurai"
////	},
////	{
////		"src": "0219_iceskating_01.jpg",
////		"text": "ice skating"
////	},
////	{
////		"src": "0393_December_01.jpg",
////		"text": "December"
////	},
////	{
////		"src": "0584_snow_01.jpg",
////		"text": "snow"
////	},
////	{
////		"src": "cat.jpg",
////		"text": "cat"
////	},
////	{
////		"src": "dog.jpg",
////		"text": "dog"
////	},
////	{
////		"src": "koala.jpg",
////		"text": "koala"
////	},
////	{
////		"src": "green.jpg",
////		"text": "green"
////	},
////	{
////		"src": "red.jpg",
////		"text": "red"
////	},
////	{
////		"src": "yellow.jpg",
////		"text": "yellow"
////	},
////	{
////		"src": "nine.jpg",
////			"text": "nine"
////	},
////	{
////		"src": "six.jpg",
////		"text": "six"
////	},
////	{
////		"src": "two.jpg",
////		"text": "two"
////	},
////	{
////		"src": "zebra.jpg",
////		"text": "zebra"
////	},
////	{
////		"src": "pad.png",
////		"text": "pad"
////	},
////	{
////		"src": "ref.gif",
////		"text": "ref"
////	},
////	{
////		"src": "asp.png",
////		"text": "snake"
////	},
////	{
////		"src": "hag.jpg",
////		"text": "witch"
////	},
////	{
////		"src": "vader.png",
////		"text": "Vader"
////	}
//];
//
//sources.forEach(function (e) {
//	var img = document.createElement("img");
//	img.src = e.src;
//	e.img = img;
//});
//
//function draw() {
//	context.fillStyle = "LightBlue";
//	context.fillRect(0, 0, canvas.width, canvas.height);
//	context.fillStyle = "white";
//	if (count == 4) {
//		drawFit(context, sources[progress - 1].img, 0, 0, canvas.width / 3, canvas.height * .6);
//		drawFit(context, sources[progress - 2].img, canvas.width / 3, 0, canvas.width / 3, canvas.height * .6);
//		drawFit(context, sources[progress - 3].img, canvas.width * 2 / 3, 0, canvas.width / 3, canvas.height * .6);
//		fitText(context, sources[progress - 1].text, 0, canvas.height * .6, canvas.width / 3, canvas.height * .4);
//		fitText(context, sources[progress - 2].text, canvas.width / 3, canvas.height * .6, canvas.width / 3, canvas.height * .4);
//		fitText(context, sources[progress - 3].text, canvas.width * 2 / 3, canvas.height * .6, canvas.width / 3, canvas.height * .4);
//		count = 0;
//		progress -= 1;
//	} else {
//		drawFit(context, sources[progress].img, 0, 0, canvas.width, canvas.height * .6);
//		fitText(context, sources[progress].text, 0, canvas.height * .6, canvas.width, canvas.height * .4);
//	}
//}
//
//window.addEventListener("keydown", function (e) {
//	if (e.key == "ArrowRight") {
//		if (progress + 1 <= sources.length) {
//			progress += 1;
//			count += 1;
//		}
//		draw();
//	} else if (e.key == "ArrowLeft") {
//		if (progress - 1 >= 0) {
//			progress -= 1;
//			count -= 1;
//		}
//		draw();
//	}
//});
//
