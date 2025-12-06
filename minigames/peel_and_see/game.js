import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import IMAGE_LIBRARY from "../image_library/image_library.mjs"
var ilib;

var view = {};
var img;
var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12";
var letters;
var imageState = new StateMachine({
	init: "hidden",
	transitions: [
		{name: "show", from: "hidden", to: "revealed"},
		{name: "hide", from: "revealed", to: "hidden"}
	],
	methods: {
		"onLeaveState": function () {},
		"onShow": function () {},
		"onHide": function () {}
	}
});
function drawStar(context, cx, cy, spikes, outerRadius, innerRadius) {
	var rot=Math.PI/2*3;
	var x=cx;
	var y=cy;
	var step=Math.PI/spikes;

	context.beginPath();
	context.moveTo(cx,cy-outerRadius)
		for(i=0;i<spikes;i++){
			x=cx+Math.cos(rot)*outerRadius;
			y=cy+Math.sin(rot)*outerRadius;
			context.lineTo(x,y)
				rot+=step

				x=cx+Math.cos(rot)*innerRadius;
			y=cy+Math.sin(rot)*innerRadius;
			context.lineTo(x,y)
				rot+=step
		}
	context.lineTo(cx,cy-outerRadius)
		context.fill();
	context.closePath();
}

view.setup = function () {
	let ilib = IMAGE_LIBRARY.filter(function (o) {
		return o.tags.indexOf("shape") === -1 && o.tags.indexOf("color") === -1;
	});
	let randSrc = ilib[Math.floor(Math.random() * ilib.length)].src;
	console.log(randSrc);
	if (game.options.dropped.length > 0) {
		img = game.options.dropped.splice(Math.floor(Math.random() * game.options.dropped.length), 1)[0];
	} else {
		img = game.loader.newImageAsset(randSrc, function () {
			this.render();
		}.bind(this));
	}
	letters = [];
	var scrambled = ABC.split("");
	game.options.reveal = false;
	while (scrambled.length > 0) {
		let character = scrambled.splice(Math.floor(Math.random() * scrambled.length), 1)[0]
		let obj = {"character": character, "show": true, "star": false};
		letters.push(obj);
		Mousetrap.bind(character.toLowerCase(), function () {
			this.show = false;
			view.render();
		}.bind(obj));
	}
	var count = 0;
	while (count < 10) {
		var index = Math.floor(Math.random() * letters.length);
		if (!letters[index].star) {
			letters[index].star = true;
			count += 1;
		}
	}

	if (game.options.stretched) {
		if (Math.random() < 0.5) {
			game.options.xStretch = 0.5;
			game.options.yStretch = 1.5;
		} else {
			game.options.xStretch = 1.5;
			game.options.yStretch = 0.5;
		}
	} else {
		game.options.xStretch = 1;
		game.options.yStretch = 1;
	}
	if (game.options.rotated) {
		game.options.angle = Math.random() * 2 * Math.PI;
	} else {
		game.options.angle = 0;
	}

	Mousetrap.bind("space", function () {
		game.options.reveal = !game.options.reveal;
		console.log("reveal", game.options.reveal, view.render);
		view.render()
		Mousetrap.bind("B", function () {
			game.options.blackAndWhite = false;
			view.render();
		});
		Mousetrap.bind("R", function () {
			game.options.angle = 0;
			view.render();
		});
		Mousetrap.bind("S", function () {
			game.options.xStretch = 1;
			game.options.yStretch = 1;
			view.render();
		});
		Mousetrap.bind("I", function () {
			game.options.inverted = false;
			view.render();
		});
	});
	Mousetrap.bind("esc", function () {console.log("back"); game.state.back();});

	game.canvas.ondrop = function (ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text/uri-list");
		console.log(data);
		var remoteImg = new Image();
		remoteImg.onload = function () {
			img = remoteImg;
			view.render();
		}
		remoteImg.src = data;
	};
	game.canvas.ondragover = function (ev) {ev.preventDefault(); console.log("dragover");};
};

view.update = function (dt) {
};

view.render = function () {
	console.log("rendering");
	let context = game.context;
	let canvas = context.canvas;
	let prevFillStyle = context.fillStyle;

	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "green";
	var prevCompositeOperation = context.globalCompositeOperation;
	if (game.options.blackAndWhite) {
		context.globalCompositeOperation = 'luminosity';
	} else if (game.options.inverted) {
		context.globalCompositeOperation = 'difference';
	}
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(game.options.angle);
	context.scale(game.options.xStretch, game.options.yStretch);
	fitImage(context, img,
		-canvas.width / 2 * (1 / game.options.xStretch),
		-canvas.height / 2 * (1 / game.options.yStretch),
		canvas.width * (1 / game.options.xStretch),
		canvas.height * (1 / game.options.yStretch)
	);
	context.restore();
	context.globalCompositeOperation = prevCompositeOperation;

	var tileW = canvas.width / 7;
	var tileH = canvas.height / 4;
	if (!game.options.reveal) {
		letters.forEach(function (element, index) {
			if (element.star) {
				//var prevFill = context.fillStyle;
				//context.globalAlpha = .7;
				//context.fillStyle = "yellow";
				//drawStar(context,
				//	index % 7 * tileW + tileW / 2,
				//	Math.floor(index / 7) * tileH + tileH / 2,
				//	5,
				//	tileH / 2,
				//	tileH / 5
				//)
				//context.globalAlpha = 1;
				//context.fillStyle = prevFill;
			}

			if (element.show) {
				context.fillStyle = "orange";
				context.fillRect(
					index % 7 * tileW - 1,
					Math.floor(index / 7) * tileH - 1,
					tileW + 2, tileH + 2
				)
				context.fillStyle = "green";
				if (game.options.uppercase) {
					fitText(
						context, element.character,
						index % 7 * tileW,
						Math.floor(index / 7) * tileH,
						tileW, tileH
					);
				} else {
					fitText(
						context, element.character.toLowerCase(),
						index % 7 * tileW,
						Math.floor(index / 7) * tileH,
						tileW, tileH * .95
					);
				}
			}
		});
	}

	context.fillStyle = prevFillStyle;
};

view.takedown = function () {
	Mousetrap.reset();
};

export default view;
