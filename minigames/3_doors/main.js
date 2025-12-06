"use strict"

requirejs.config({
baseUrl: 'js',
paths: {
	three_doors: '../3_doors'
}
});

var game = {};
game.canvas = document.getElementById("myCanvas");
game.canvas.width = 800;
game.canvas.height = 450;
game.context = game.canvas.getContext("2d");
game.context.fillStyle = "yellow";

require(["Loader", "mousetrap.min", "HatDraw"], function (Loader, Mousetrap, HatDraw) {
	game.loader = new Loader();
	require(["fitText", "fitImage"], function (fitText, fitImage) {
		var canvas = game.canvas;
		var context = game.context;
		var FLOORS = 3;
		var MONSTERS = [];
		var DOORS = [];
		var HOW_TO_PLAY = game.loader.newImageAsset("img/how_to_play.jpg", onload);
		var FREE = game.loader.newImageAsset("img/free.jpg", onload);
		var render;
		var castle;
		var choice = null;
		var fadeStart = null;
		var fadeColor = "white";

		function onload() {
			if (game.loader.assetsLoaded) {
				render();
			}
		}

		function fade() {
			var elapsed = performance.now() - fadeStart;
			render();
			if (elapsed < 1000) {
				var prevFill = context.fillStyle;

				context.fillStyle = fadeColor;
				context.globalAlpha = elapsed/800;
				context.fillRect(0, 0, canvas.width, canvas.height);

				context.globalAlpha = 1;
				context.fillStyle = prevFill;
				requestAnimationFrame(fade);
			} else if (elapsed < 1300) {
				choice = null;
				castle.progress = 0;
				var prevFill = context.fillStyle;

				context.fillStyle = fadeColor;
				context.globalAlpha = (1300 - elapsed)/300;
				context.fillRect(0, 0, canvas.width, canvas.height);

				context.globalAlpha = 1;
				context.fillStyle = prevFill;
				requestAnimationFrame(fade);
			} else {
				fadeStart = null;
				render();
			}
			console.log("animating");
		}
		
		["cartoon_cat.png", "xenomorph.png", "sena_keiko_no_obake.png", "slimer.png", "five_nights_bear.png", "trex.png", "chucky.png", "it.png", "jaian.png", "pigumon.png", "stormtrooper.png", "creeper.png", "monster.png", "ghost.png", "bear.png", "tentacle.png", "huggy_wuggy.png", "tung_tung_tung_sahur.png"].forEach(function (src) {
			MONSTERS.push(game.loader.newImageAsset("img/" + src, onload));
		});
		["three_doors1.jpg", "three_doors2.jpg", "three_doors3.jpg"].forEach(function (src) {
			DOORS.push(game.loader.newImageAsset("img/" + src, onload));
		});
		var hd = new HatDraw(MONSTERS);
		var Castle = function () {
			this.progress = 0;
			var floors = [];
			for (var i=0; i<FLOORS; i++) {
				var thisFloor = [
					"monster",
					"monster",
					"monster"
				]
				thisFloor[Math.floor(Math.random() * thisFloor.length)] = null;
				floors.push(thisFloor);
			}
			this.floors = floors;
		}

		function clear() {
			castle.progress += 1;
			choice = null;
			if (castle.progress >= castle.floors.length) {
				setTimeout(function () {game.state.won();}, 800);
			} else {
				fadeStart = performance.now();
				setTimeout(function () {fadeStart = null; render();}, 800);
			}
		}

		game.state = new StateMachine({
			init: "menu",
			transitions: [
				{name: "go", from: "menu", to: "playing"},
				{name: "won", from: "playing", to: "result"},
				{name: "again", from: "result", to: "playing"}
			],
			methods: {
				onAfterTransition: function () {
					render();
				},
				onLeaveState: function () {
					Mousetrap.reset();
				},
				onMenu: function () {
					render = function () {
						context.clearRect(0, 0, canvas.width, canvas.height);
						fitImage(context, HOW_TO_PLAY);
						fitText(context, "3 Doors", 0, 0, canvas.width * .6, canvas.height * .25);
						fitText(context, game.loader.assetsLoaded?"Loaded":"Loading", canvas.width * 3/4, canvas.height * 3/4, canvas.width * .2, canvas.height/8);
					}
					Mousetrap.bind("space", function () {if (game.loader.assetsLoaded) {game.state.go();}});
				},
				onPlaying: function () {
					castle = new Castle();
					render = function () {
						var progress = castle.progress;
						context.clearRect(0, 0, canvas.width, canvas.height);
						fitImage(context, DOORS[progress]);
						fitText(context, "Level " + (progress + 1), 0, 0, 200, 100);
						var there;
						if (choice === "left") {
							there = castle.floors[progress][0];
							if (there !== null) {
								if (there === "monster") {
									there = hd.drawOne();
									castle.floors[progress][0] = there;
								}
								fitImage(context, there, 0, 150, 200, 250);
								if (fadeStart === null) {
									fadeColor = "white";
									fadeStart = performance.now();
									requestAnimationFrame(fade);
								}
							} else {
								fitText(context, "CLEAR", 0, 150, 200, 250);
								clear();
							}
						}
						if (choice === "straight") {
							there = castle.floors[progress][1];
							if (there !== null) {
								if (there === "monster") {
									there = hd.drawOne();
									castle.floors[progress][1] = there;
								}
								fitImage(context, there, 300, 150, 200, 250);
								if (fadeStart === null) {
									fadeColor = "white";
									fadeStart = performance.now();
									requestAnimationFrame(fade);
								}
							} else {
								fitText(context, "CLEAR", 300, 150, 200, 250);
								clear();
							}
						}
						if (choice === "right") {
							there = castle.floors[progress][2];
							if (there !== null) {
								if (there === "monster") {
									there = hd.drawOne();
									castle.floors[progress][2] = there;
								}
								fitImage(context, there, 600, 150, 200, 250);
								if (fadeStart === null) {
									fadeColor = "white";
									fadeStart = performance.now();
									requestAnimationFrame(fade);
								}
							} else {
								fitText(context, "CLEAR", 600, 150, 200, 250);
								clear();
							}
						}
					}
					Mousetrap.bind("left", function () {
						if (choice === null && fadeStart === null) {
							choice = "left";
							render();
						}
					});
					Mousetrap.bind("up", function () {
						if (choice === null && fadeStart === null) {
							choice = "straight";
							render();
						}
					});
					Mousetrap.bind("right", function () {
						if (choice === null && fadeStart === null) {
							choice = "right";
							render();
						}
					});
				},
				onResult: function () {
					render = function () {
						context.clearRect(0, 0, canvas.width, canvas.height);
						fitImage(context, FREE);
						fitText(context, "You Made It!");
					}
					Mousetrap.bind("enter", function () {game.state.again();});
				}
				//onLeaveGoing: function () {game.modules[menuIndex].takedown();},
			}
		});
	});
});
