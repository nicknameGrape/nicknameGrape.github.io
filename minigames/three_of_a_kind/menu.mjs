function keypressHandler(ev) {
	if (ev.key === " ") {
		game.state.go();
	}
}
var setup = function () {
	window.addEventListener("keypress", keypressHandler);
};

var takedown = function () {
	window.removeEventListener("keypress", keypressHandler);
};

var update = function () {
};

var render = function (context) {
	var canvas = game.canvas;
	var context = game.context;
	context.fillStyle = "pink";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "white";
	fitText(context, "Three of a Kind", 0, 0, canvas.width, canvas.height);
};

export default {
	setup: setup,
	takedown: takedown,
	update: update,
	render: render
};
