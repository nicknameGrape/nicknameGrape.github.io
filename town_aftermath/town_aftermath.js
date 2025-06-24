"use strict"

requirejs.config({
baseUrl: '../js',
paths: {
	town_aftermath: '../town_aftermath',
	imageLibrary: '../image_library'
}
});

var game = {};
game.canvas = document.getElementById("myCanvas");
game.canvas.width = 800;
game.canvas.height = 450;
game.context = game.canvas.getContext("2d");

require(["Loader", "mousetrap.min", "HatDraw", "fitImage"], function (Loader, Mousetrap, HatDraw, fitImage) {
	var town;
	var size = 2;
	var waitingForHand = false;
	function onload() {
		if (game.loader.assetsLoaded) {
			town = new Town();
			fitImage(game.context, town.beforeCanvas);
		}
	}
	var Building = function (o, x, y) {
		this.img = o.img;
		this.text = o.text;
		this.x = x;
		this.y = y;
	}
	var Town = function () {
		function renderRoads(ctx, b) {
			ctx.fillStyle = "gray";
			ctx.fillRect(b.x*tileW, b.y*tileH, tileW, tileH);
			ctx.strokeStyle = "yellow";
			ctx.setLineDash([tileW/40, tileW/80]);
			ctx.beginPath();
			ctx.moveTo((b.x+.1)*tileW,(b.y+1)*tileH);
			ctx.lineTo((b.x+.9)*tileW,(b.y+1)*tileH);
			ctx.moveTo((b.x+1)*tileW,(b.y+.1)*tileH);
			ctx.lineTo((b.x+1)*tileW,(b.y+.9)*tileH);
			ctx.stroke();
			ctx.fillStyle = "green";
			ctx.fillRect((b.x+.1)*tileW, (b.y+.1)*tileH, tileW*.8, tileH*.8);
			if (b.text !== "park") {
				ctx.fillStyle = "gray";
				ctx.fillRect((b.x+.2)*tileW, (b.y+.2)*tileH, tileW*.6, tileH*.6);
				ctx.fillRect((b.x+.4)*tileW, (b.y+.8)*tileH, tileW*.2, tileH*.11);
			}
		}
		var xroot = Math.round(Math.sqrt(size));
		var yroot = Math.ceil(Math.sqrt(size));
		var buildings = [];
		var beforeCanvas = document.createElement("canvas");
		var beforeContext = beforeCanvas.getContext("2d");
		var afterCanvas = document.createElement("canvas");
		var afterContext = afterCanvas.getContext("2d");
		beforeCanvas.width = game.canvas.width;
		beforeCanvas.height = game.canvas.height;
		afterCanvas.width = game.canvas.width;
		afterCanvas.height = game.canvas.height;
		var tileW = game.canvas.width/xroot;
		var tileH = game.canvas.height/yroot;
		var tiles = [
		]
		for (var i=0; i<size; i++) {
			tiles.push({"x": i%xroot, "y": Math.floor(i/xroot)});
		}
		var btiles = tiles.slice();
		for (var i=0; i<size; i++) {
			var b = btiles.splice(Math.floor(Math.random()*btiles.length), 1)[0];
			buildings.push(new Building(hd.drawOne(), b.x, b.y));
		}
		console.log(buildings);
		var missingIndex = Math.floor(Math.random()*buildings.length);
		buildings.forEach(function (b, i) {
			renderRoads(beforeContext, b);
			renderRoads(afterContext, b);
			fitImage(beforeContext, b.img, b.x * tileW, b.y * tileH, tileW, tileH);
			if (i !== missingIndex) {
				fitImage(afterContext, b.img, b.x * tileW, b.y * tileH, tileW, tileH);
			}
		});

		this.buildings = buildings;
		this.missingIndex = missingIndex;
		this.beforeCanvas = beforeCanvas;
		this.afterCanvas = afterCanvas;
	}
	var sources = [
{"src": "bank.PNG", "text": "bank"},
{"src": "bookstore.PNG", "text": "bookstore"},
{"src": "convenience_store.PNG", "text": "convenience store"},
{"src": "department_store.PNG", "text": "department store"},
{"src": "fire_station.PNG", "text": "fire station"},
{"src": "flower_shop.PNG", "text": "flower shop"},
{"src": "gas_station.PNG", "text": "gas station"},
{"src": "hospital.PNG", "text": "hospital"},
{"src": "library.PNG", "text": "library"},
{"src": "park.PNG", "text": "park"},
{"src": "pet_shop.PNG", "text": "pet shop"},
{"src": "police_station.PNG", "text": "police station"},
{"src": "post_office.PNG", "text": "post office"},
{"src": "restaurant.PNG", "text": "restaurant"},
{"src": "school.PNG", "text": "school"},
{"src": "sports_shop.PNG", "text": "sports shop"},
{"src": "station.PNG", "text": "station"},
{"src": "supermarket.PNG", "text": "supermarket"}
	];
	game.loader = new Loader("images/");
	var images = sources.map(function (o) {
		return {
			"img": game.loader.newImageAsset(o.src, onload),
			"text": o.text
		};
	});
	var typhoon = game.loader.newImageAsset("typhoon.png", onload);
	var debris = game.loader.newImageAsset("debris.png", onload);
	var cracks = game.loader.newImageAsset("cracks.png", onload);
	var oz = game.loader.newImageAsset("oz.png", onload);
	var witch_legs = game.loader.newImageAsset("witch_legs.png", onload);
	var hd = new HatDraw(images);
	var lastTime;
	var disaster;
	function Disaster() {
		this.x = -game.canvas.width;
		this.y = game.canvas.height*2;
		this.a = 0;
		this.start = function () {
			this.request = requestAnimationFrame(this.loop);
		};
		this.loop = function () {
			var dt = performance.now() - lastTime;
			lastTime = performance.now();
			this.x += game.canvas.width/3000 * dt;
			this.y -= game.canvas.height/3000 * dt;
			this.a -= Math.PI*2/1000 * dt;
			game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
			if (this.x < game.canvas.width/2) {
				fitImage(game.context, town.beforeCanvas);
			} else {
				fitImage(game.context, town.afterCanvas);
				fitImage(game.context, debris);
			}
			game.context.save();
				game.context.translate(this.x, this.y);
				game.context.rotate(this.a);
				fitImage(game.context, typhoon, -game.canvas.width, -game.canvas.height, game.canvas.width*2, game.canvas.height*2);
			game.context.restore();
			//fitImage(game.context, typhoon, this.x, this.y, game.canvas.width, game.canvas.height);
			console.log(this.x, this.y);
			if (this.x < game.canvas.width*2) {
				this.request = requestAnimationFrame(this.loop);
			}
		}.bind(this);
	}
	
	Mousetrap.bind("space", function () {
		if (waitingForHand) {
			cancelAnimationFrame(disaster.request);
			game.context.fillStyle = "skyBlue";
			game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
		} else {
			lastTime = performance.now();
			disaster = new Disaster();
			disaster.start();
			waitingForHand = true;
		}
	});
	Mousetrap.bind("enter", function () {
		town = new Town();
		waitingForHand = false;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		fitImage(game.context, town.beforeCanvas);
	});
	Mousetrap.bind("a", function () {
		var b = town.buildings[town.missingIndex].img;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		var tmpCanvas = document.createElement("canvas");
		tmpCanvas.width = b.width;
		tmpCanvas.height = b.height;
		var tmpContext = tmpCanvas.getContext("2d");
		fitImage(tmpContext, b);
		tmpContext.globalCompositeOperation = "source-atop";
		fitImage(tmpContext, cracks);
		fitImage(game.context, oz);
		//fitImage(game.context, witch_legs);
		fitImage(game.context, tmpCanvas);
	});
	Mousetrap.bind("1", function () {
		size = 1;
	});
	Mousetrap.bind("2", function () {
		size = 2;
	});
	Mousetrap.bind("3", function () {
		size = 3;
	});
	Mousetrap.bind("4", function () {
		size = 4;
	});
	Mousetrap.bind("5", function () {
		size = 5;
	});
	Mousetrap.bind("6", function () {
		size = 6;
	});
	Mousetrap.bind("7", function () {
		size = 7;
	});
	Mousetrap.bind("8", function () {
		size = 8;
	});
	Mousetrap.bind("9", function () {
		size = 9;
	});
	Mousetrap.bind("0", function () {
		size = 10;
	});
	Mousetrap.bind("q", function () {
		size = 11;
	});
	Mousetrap.bind("w", function () {
		size = 12;
	});
});
