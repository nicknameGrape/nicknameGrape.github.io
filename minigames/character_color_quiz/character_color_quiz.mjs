import shuffle from "../js_modules/shuffle.mjs";

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const imagesByColor = [
	{
		all: "img/anpanman.png",
		brown: "img/anpanman_brown.png",
		yellow: "img/anpanman_yellow.png",
		red: "img/anpanman_red.png"
	},
	{
		all: "img/hanakappa.png",
		blue: "img/hanakappa_blue.png",
		green: "img/hanakappa_green.png",
		yellow: "img/hanakappa_yellow.png",
		pink: "img/hanakappa_pink.png"
	},
	//{
	//	all: "img/mymelody.png",
	//	black: "img/mymelody_black.png",
	//	pink: "img/mymelody_pink.png",
	//	red: "img/mymelody_red.png",
	//	yellow: "img/mymelody_yellow.png",
	//	white: "img/mymelody_white.png",
	//	purple: "img/mymelody_purple.png"
	//},
	//{
	//	all: "img/uutan.png",
	//	yellow: "img/uutan_yellow.png",
	//	black: "img/uutan_black.png",
	//	green: "img/uutan_green.png",
	//	orange: "img/uutan_orange.png",
	//	pink: "img/uutan_pink.png",
	//	red: "img/uutan_red.png"
	//},
		{
			all: "img/kirby.png",
			red: "./img/kirby_red.png",
			blue: "./img/kirby_blue.png",
			yellow: "./img/kirby_yellow.png",
			pink: "./img/kirby_pink.png"

		},
		{
			all: "img/yoshi.png",
			yellow: "./img/yoshi_yellow.png",
			red: "./img/yoshi_red.png",
			green: "./img/yoshi_green.png"
		},
		{
			all: "img/spongebob.png",
			white: "./img/spongebob_white.png",
			red: "./img/spongebob_red.png",
			black: "./img/spongebob_black.png",
			brown: "./img/spongebob_brown.png",
			yellow: "./img/spongebob_yellow.png"
		},
	//	{
	//		all: "img/luigi.png",
	//		blue: "./img/luigi_blue.png",
	//		brown: "./img/luigi_brown.png",
	//		green: "./img/luigi_green.png",
	//		red: "./img/luigi_red.png",
	//		yellow: "./img/luigi_yellow.png",
	//		white: "./img/luigi_white.png"
	//	},
		{
			all: "img/minion.png",
			black: "./img/minion_black.png",
			blue: "./img/minion_blue.png",
			silver: "./img/minion_silver.png",
			yellow: "./img/minion_yellow.png"
		},
	//	{
	//		all: "img/curiousGeorge.png",
	//		black: "./img/curiousGeorge_black.png",
	//		pink: "./img/curiousGeorge_pink.png",
	//		brown: "./img/curiousGeorge_brown.png",
	//		yellow: "./img/curiousGeorge_yellow.png"
	//	},
		{
			all: "img/goku.png",
			red: "./img/goku_red.png",
			blue: "./img/goku_blue.png",
			orange: "./img/goku_orange.png",
			black: "./img/goku_black.png"

		},
	//{
	//	all: "img/doraemon.png",
	//	blue: "img/doraemon_blue.png",
	//	red: "img/doraemon_red.png",
	//	yellow: "img/doraemon_yellow.png"
	//},
	//{
	///	all: "img/pikachu.png",
	//	brown: "img/pikachu_brown.png",
	//	black: "img/pikachu_black.png",
	//	red: "img/pikachu_red.png",
	//	yellow: "img/pikachu_yellow.png"
	//},
	//{
	//	all: "img/sazae.png",
	//	black: "img/sazae_black.png",
	//	green: "img/sazae_green.png",
	//	pink: "img/sazae_pink.png"//,
	//	//white: "img/sazae_white.png"
	//},
	//{
	//	all: "img/mario.png",
	//	black: "img/mario_black.png",
	//	blue: "img/mario_blue.png",
	//	brown: "img/mario_brown.png",
	//	red: "img/mario_red.png",
	//	white: "img/mario_white.png",
	//	yellow: "img/mario_yellow.png"
	//},
	//{
	//	all: "img/donald_duck.png",
	//	blue: "img/donald_duck_blue.png",
	//	orange: "img/donald_duck_orange.png",
	//	red: "img/donald_duck_red.png",
	//	white: "img/donald_duck_white.png",
	//	yellow: "img/donald_duck_yellow.png"
	//},
	//{
	//	all: "img/hello_kitty.png",
	//	orange: "img/hello_kitty_orange.png",
	//	pink: "img/hello_kitty_pink.png",
	//	white: "img/hello_kitty_white.png"
	//},
	{
		all: "img/kumamon.png",
		white: "img/kumamon_white.png",
		red: "img/kumamon_red.png",
		black: "img/kumamon_black.png"
	},
	{
		all: "img/mickey_mouse.png",
		black: "img/mickey_mouse_black.png",
		red: "img/mickey_mouse_red.png",
		white: "img/mickey_mouse_white.png",
		yellow: "img/mickey_mouse_yellow.png"
	}//,
	//{
	//	all: "img/snoopy.png",
	//	black: "img/snoopy_black.png",
	//	yellow: "img/snoopy_yellow.png"
	//},
	//{
	//	all: "img/spiderman.png",
	//	blue: "img/spiderman_blue.png",
	//	red: "img/spiderman_red.png",
	//	white: "img/spiderman_white.png"
	//},
	//{
	//	all: "img/wisupaa.png",
	//	black: "img/wisupaa_black.png",
	//	blue: "img/wisupaa_blue.png",
	//	white: "img/wisupaa_white.png"
	//},
];

//shuffle(imagesByColor);

function colorButtons(colorNames) {
	const oldDiv = document.getElementById("myDiv");
	if ( document.body.contains(oldDiv)) {
		oldDiv.parentNode.removeChild(oldDiv);
	};
	const myDiv = document.createElement("div");
	myDiv.id = "myDiv";
	colorNames.forEach(function(value, index, array) {
		const myButton = document.createElement("button");
		myButton.value = value;
		myButton.id = value + "Button"
		if (value === "brown") {
			myButton.style.backgroundColor = "saddleBrown";
		} else {
			myButton.style.backgroundColor = value;
		}
		myButton.onclick = function() {
			let color = this.value;
			const myImage = new Image();
			myImage.src = imagesByColor[0][color];
			myImage.onload = function () {
				draw(this);
			};
			this.parentNode.removeChild(this);
		};
		myDiv.appendChild(myButton);
	});
	document.body.appendChild(myDiv);
}

var firstColors = Object.keys(imagesByColor[0]).slice(1);
drawRainbow(firstColors, false);
colorButtons(firstColors);

//draw to fit canvas, keep image aspect ratio
var draw = function(img){
	let drawW = img.width > img.height * 2 ? 800 : 800 * img.width / ( img.height * 2 );
	let drawH = img.width > img.height * 2 ? 400 * ( img.height * 2 ) / img.width : 400;
	let drawX = ( 800 - drawW ) / 2
	let drawY = ( 400 - drawH ) / 2

	//ctx.clearRect(0, 0, 800, 400);
	ctx.drawImage(
		img,
		drawX,
		drawY,
		drawW,
		drawH
	);
};

function drawRainbow(colors, fade) {
	var context = ctx;

	colors.push("skyBlue");
	context.fillStyle = "skyBlue";
	context.fillRect(0, 0, canvas.width, canvas.height);
	//rainbow
	for (var i=0; i<colors.length; i++) {
		if (colors[i] === "brown") {
			context.fillStyle = "saddleBrown";
		} else {
			context.fillStyle = colors[i];
		}
		//var width = canvas.width / colors.length;
		var width = canvas.width * .2 / colors.length;
		//context.fillRect(width * i, 0, width, canvas.height);
		context.beginPath();
		//context.arc(canvas.width * 1.5, canvas.height, canvas.width * 1.4 - width * .8 * i, 3, 1);
		context.arc(canvas.width / 2, canvas.height, canvas.width * .55 - width * i, 3, 1);
		context.fill();
	}
	if (fade) {
		context.fillStyle = "gray";
		context.globalAlpha = .6;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.globalAlpha = 1;
	}
	colors.pop();
}

function reveal() {
	const myImage = new Image();
	myImage.src = imagesByColor[0].all;
	myImage.onload = function () {
		var colors = Object.keys(imagesByColor[0]).slice(1);
		drawRainbow(colors, false);
		draw(this);
	};
}

function next() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	imagesByColor.shift();
	var colors = Object.keys(imagesByColor[0]).slice(1);
	drawRainbow(colors, false);
	colorButtons(colors);
}

const myListener = addEventListener("keydown", function(){
	if ( event.keyCode == "N".charCodeAt(0) ) {
		next();
	};
	if ( event.keyCode == "A".charCodeAt(0) ) {
		reveal();
	};
});

const buttonAnswer = document.getElementById("answer");
buttonAnswer.addEventListener("click", reveal);
const buttonNext = document.getElementById("next");
buttonNext.addEventListener("click", next);
