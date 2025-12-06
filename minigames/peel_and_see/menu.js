import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"

var view = {};

view.setup = function () {
	console.log(game);
	Mousetrap.bind("c", function () {
		game.options.uppercase = !game.options.uppercase;
		view.render();
	});
	Mousetrap.bind("b", function () {
		game.options.blackAndWhite = !game.options.blackAndWhite;
		game.options.inverted = false;
		view.render();
	});
	Mousetrap.bind("r", function () {
		game.options.rotated = !game.options.rotated;
		view.render();
	});
	Mousetrap.bind("s", function () {
		game.options.stretched = !game.options.stretched;
		view.render();
	});
	Mousetrap.bind("i", function () {
		game.options.inverted = !game.options.inverted;
		game.options.blackAndWhite = false;
		view.render();
	});
	Mousetrap.bind("space", function () {
		game.state.go();
	});
};

view.update = function (dt) {
};

view.render = function () {
	var canvas = game.context.canvas;
	var context = game.context;
	//var canvas = document.getElementsByTagName("canvas")[0]
	//var context = canvas.getContext("2d");
	var prevFillStyle = context.fillStyle;

	context.fillStyle = "gray";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "green";
	fitText(context, "Peel and See", 0, 0, canvas.width, canvas.height / 3);
	context.fillStyle = "green";
	if (game.options.uppercase) {
		fitText(context, "Upper(c)ase", 0, canvas.height * 2 / 8, canvas.width, canvas.height / 8);
	} else {
		fitText(context, "Lower(c)ase", 0, canvas.height * 2 / 8, canvas.width, canvas.height / 8);
	}
	if (game.options.blackAndWhite) {
		context.fillStyle = "yellow";
	} else {
		context.fillStyle = "white";
	}
	fitText(context, "(B)lack and White", 0, canvas.height * 4 / 8, canvas.width, canvas.height / 8);
	if (game.options.stretched) {
		context.fillStyle = "yellow";
	} else {
		context.fillStyle = "white";
	}
	if (game.options.rotated) {
		context.fillStyle = "yellow";
	} else {
		context.fillStyle = "white";
	}
	fitText(context, "(R)otated", 0, canvas.height * 5 / 8, canvas.width, canvas.height / 8);
	if (game.options.stretched) {
		context.fillStyle = "yellow";
	} else {
		context.fillStyle = "white";
	}
	fitText(context, "(S)tretched", 0, canvas.height * 6 / 8, canvas.width, canvas.height / 8);
	if (game.options.inverted) {
		context.fillStyle = "yellow";
	} else {
		context.fillStyle = "white";
	}
	fitText(context, "(I)nverted", 0, canvas.height * 7 / 8, canvas.width, canvas.height / 8);

	context.fillStyle = prevFillStyle;
};

view.takedown = function () {
	Mousetrap.reset();
};

export default view;
