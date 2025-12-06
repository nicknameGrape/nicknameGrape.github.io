"use strict"

import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import Loader from "../js_modules/Loader.mjs"
import fitTextArray from "../js_modules/fitTextMontage.mjs"
//require(["fitText", "fitImage", "Loader", "mousetrap.min", "fitTextArray", "HatDraw"], function (fitText, fitImage, Loader, Mousetrap, fitTextArray, HatDraw) {
function touchstartHandler(e) {
	e.preventDefault();
	var touch = e.changedTouches[0];
	var x = touch.clientX;
	var y = touch.clientY;
	console.log("touchstart", x, y);
	inputHandler(x, y);
}

function clickHandler(e) {
	//e.preventDefault();
	var touch = e;
	var x = touch.clientX;
	var y = touch.clientY;
	console.log("click", x, y);
	inputHandler(x, y);
}

function inputHandler(x, y) {
		var restaurant = null;
		var button = null;
		restaurants.some(function (r) {
			restaurant = r;
			r.buttons.some(function (b) { 
				button = b;
				return b.containsPoint(x, y);
			})
			return r.containsPoint(x, y);
		});
		if (!button.containsPoint(x, y)) {
			button = null;
		} else {
			var item = meibutsu[button.data];
			if (restaurant.choice === null && item.chosen === false) {
				restaurant.choice = button.data;
				item.chosen = true;
				//restaurant.render();
				restaurants.forEach(function (o) {
					o.render();
				});
			}
		}
		if (restaurant.choice !== null) {
			restaurant.wrapped = !restaurant.wrapped;
			restaurants.forEach(function (o) {
				o.render();
			});
		}
		//console.log(button.data.text);
	}
function Button(data, x, y, w, h) {
	this.data = data;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.containsPoint = function (x, y) {
		return x >= this.x && y >= this.y && x < this.x + this.w && y < this.y + this.h;
	}
}

function Restaurant(color, x, y, w, h, presentIndex) {
	var scramble = [];
	var buttonOrder = [];
	for (var i=0;i<meibutsu.length;i++) {
		scramble.push(i);	
	}
	while (scramble.length > 0) {
		var rIndex = scramble.splice(Math.floor(Math.random()*scramble.length), 1)[0];
		buttonOrder.push(rIndex);
	}
	this.color = color;
	this.presentIndex = presentIndex;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.buttons = [];
	this.choice = null;
	this.wrapped = false;
	this.containsPoint = function (x, y) {
		return x >= this.x && y >= this.y && x < this.x + this.w && y < this.y + this.h;
	}
	//24 menu items, 8 rows 3 cols
	var ROWS = 7;
	var COLS = 3;
	var tileW = this.w/COLS;
	var tileH = this.h/ROWS;
	for (var i=0;i<ROWS;i++) {
		for (var j=0;j<COLS;j++) {
			if (buttonOrder.length > 0) {
				this.buttons.push(new Button(buttonOrder.pop(), this.x + j*tileW, this.y + i*tileH, tileW, tileH));
			}
		}
	}
	this.render = function () {
		//if (startTime === null) {
		//	context.fillStyle = "white";
		//} else {
		//	context.fillStyle = "lime";
		//}
		if (this.choice === null) {
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
			this.buttons.forEach(function (b) {
				console.log(b);
				if (meibutsu[b.data].chosen) {
					context.fillRect(b.x, b.y, b.w, b.h);
				} else {
					fitImage(context, meibutsu[b.data].img, b.x, b.y, b.w, b.h);
				}
			});
		} else {
			if (this.wrapped) {
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.w, this.h);
				fitImage(context, presents[this.presentIndex], this.x, this.y, this.w, this.h, "n");
			} else {
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.w, this.h);
				fitImage(context, meibutsu[this.choice].img, this.x, this.y, this.w, this.h, "n");
			}
		}
	};
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	render();
}

function onload() {
	if (loader.assetsLoaded) {
		state.loaded();
	}
}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var loader = new Loader("./img_gifts/");
var meibutsu, presents;
var restaurants = [];
//var startTime = null;
var players = 6;
var render = function () {};
var COLORS = [
	"pink",
	"skyblue",
	"orange",
	"green",
	"yellow",
	"red",
	"tan"
];
var PRESENTS = [
	"present01.png",
	"present02.png",
	"present03.png",
	"present04.png",
	"present05.png",
	"present06.png",
	"present07.png"
];
var MEIBUTSU = [
	"0080_monkey_01.png",
	"0083_horse_01.png",
	"0087_dog_01.png",
	"0088_cat_01.png",
	"0089_hamster_01.png",
	"0090_rabbit_01.png",
	"0091_pig_01.png",
	"0092_sheep_01.png",
	"0094_mouse_01.png",
	"0104_squid_01.png",
	"0105_octopus_01.png",
	"0106_crab_01.png",
	"0107_shrimp_01.png",
	"0110_turtle_01.png",
	"0111_pigeon_01.png",
	"0118_frog_01.png",
	"0119_snail_01.png",
	"0120_snake_01.png",
	"0121_butterfly_01.png",
	"0122_beetle_01.png",
	"0128_stagbeetle_01.png",
	"0133_fish_01.png",
	"0134_bird_01.png",
	"0135_melon_01.png",
	"0136_watermelon_01.png",
	"0137_strawberry_01.png",
	"0137_strawberry_01.png",
	"0138_banana_01.png",
	"0139_apple_01.png",
	"0139_apple_01.png",
	"0140_orange_01.png",
	"0141_grapes_01.png",
	"0141_grapes_01.png",
	"0142_peach_01.png",
	"0142_peach_01.png",
	"0143_grapefruit_01.png",
	"0144_pineapple_01.png",
	"0145_cherry_01.png",
	"0145_cherry_01.png",
	"0146_kiwifruit_01.png",
	"0147_lemon_01.png",
	"0148_carrot_01.png",
	"0149_cucumber_01.png",
	"0150_cabbage_01.png",
	"0151_potato_01.png",
	"0152_sweetpotato_01.png",
	"0153_onion_01.png",
	"0154_tomato_01.png",
	"0155_corn_01.png",
	"0156_greenpepper_01.png",
	"0157_pumpkin_01.png",
	"0158_eggplant_01.png",
	"0159_turnip_01.png",
	"0167_egg_01.png",
	"0185_cheese_01.png",
	"0185_cheese_01.png",
	"0193_juice_01.png",
	"0195_milk_01.png",
	"0196_tea_01.png",
	"0197_greentea_01.png",
	"0198_coffee_01.png",
	"0200_cake_01.png",
	"0201_icecream_01.png",
	"0201_icecream_01.png",
	"0202_donut_01.png",
	"0203_pudding_01.png",
	"0204_jelly_01.png",
	"0205_parfait_01.png",
	"0221_baseball_01.png",
	"0222_bat_01.png",
	"0223_glove_01.png",
	"0224_soccerball_01.png",
	"0225_ball_01.png",
	"0313_book_01.png",
	"0314_notebook_01.png",
	"0315_pencil_01.png",
	"0316_pen_01.png",
	"0318_eraser_01.png",
	"0319_pencilcase_01.png",
	"0320_ruler_01.png",
	"0321_triangle_01.png",
	"0322_protractor_01.png",
	"0323_scissors_01.png",
	"0324_glue_01.png",
	"0325_paper_01.png",
	"0326_compasses_01.png",
	"0327_crayon_01.png",
	"0328_paint_01.png",
	"0329_brush_01.png",
	"0332_dictionary_01.png",
	"0336_map_01.png",
	"0337_globe_01.png",
	"0338_computer_01.png",
	"0339_ink_01.png",
	"0341_piano_01.png",
	"0342_accordion_01.png",
	"0343_harmonica_01.png",
	"0344_xylophone_01.png",
	"0345_recorder_01.png",
	"0346_guitar_01.png",
	"0347_violin_01.png",
	"0348_tambourine_01.png",
	"0349_drum_01.png",
	"0350_castanets_01.png",
	"0351_triangle_01.png",
	"0352_mat_01.png",
	"0353_beaker_01.png",
	"0354_microscope_01.png",
	"0355_skeleton_01.png",
	"0356_bag_01.png",
	"0454_TV_01.png",
	"0455_washingmachine_01.png",
	"0456_vacuumcleaner_01.png",
	"0457_telephone_01.png",
	"0458_refrigerator_01.png",
	"0459_kettle_01.png",
	"0460_fryingpan_01.png",
	"0461_cup_01.png",
	"0462_glass_01.png",
	"0463_fork_01.png",
	"0464_knife_01.png",
	"0465_spoon_01.png",
	"0466_box_01.png",
	"0467_trashcan_01.png",
	"0469_mat_01.png",
	"0470_calendar_01.png",
	"0471_mirror_01.png",
	"0474_CD_01.png",
	"0475_newspaper_01.png",
	"0477_clock_01.png",
	"0478_watch_01.png",
	"0479_camera_01.png",
	"0480_umbrella_01.png",
	"0481_toothbrush_01.png",
	"0482_T-shirt_01.png",
	"0483_sweater_01.png",
	"0484_shirt_01.png",
	"0485_pants_01.png",
	"0486_skirt_01.png",
	"0487_cap_01.png",
	"0488_hat_01.png",
	"0489_shoes_01.png",
	"0490_socks_01.png",
	"0491_glasses_01.png",
	"0492_gloves_01.png",
	"0493_handkerchief_01.png",
	"0573_flower_01.png",
	"0573_flower_01.png",
	"0574_morningglory_01.png",
	"0574_morningglory_01.png",
	"0575_sunflower_01.png",
	"0576_dandelion_01.png",
	"0576_dandelion_01.png",
	"0577_rose_01.png",
	"0586_car_01.png",
	"0596_bike_01.png",
	"0597_motorcycle_01.png",
	"0598_unicycle_01.png",
	"0600_sailboat_01.png"
];
var state = new StateMachine({
	"init": "loading",
	"transitions": [
		{"name": "loaded", "from": "loading", "to": "splashReady"},
		{"name": "order", "from": "splashReady", "to": "touchpad"},
		{"name": "reset", "from": "touchpad", "to": "splashReady"}
	],
	"methods": {
		"onLeaveState": function () {
			Mousetrap.reset();
			render = null;
		},
		"onEnterState": function () {
			console.log(this.state);
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
		"onLoading": function () {
			meibutsu = [];
			presents = [];
			MEIBUTSU.forEach(function (str) {
				var o = {};
				o.img = loader.newImageAsset(str, onload);
				o.chosen = false;
				meibutsu.push(o);
			});
			PRESENTS.forEach(function (str) {
				var img = loader.newImageAsset(str, onload);
				presents.push(img);
			});
			render = function renderLoading() {
				fitText(context, "Loading...");
			}
			resize();
			render();
			console.log(meibutsu);
		},
		"onSplashReady": function () {
			render = function renderSplashReady() {
				var colors = COLORS.slice(0, players);
				var rWidth = canvas.width/colors.length;
				colors.forEach(function (c, i) {
					context.fillStyle = c;
					context.fillRect(i*rWidth, 0, rWidth, canvas.height);
				});
				context.fillStyle = "black";
				fitText(context, "This is for you.");
			}
			Mousetrap.bind("enter", function () {
				state.order();
			});
			render();
		},
		"onTouchpad": function () {
			function makeRestaurants() {
				var colors = COLORS.slice(0, players);
				var rWidth = canvas.width/colors.length;
				restaurants = [];
				colors.forEach(function (c, i) {
					restaurants.push(new Restaurant(c, i*rWidth, canvas.height*.3, rWidth, canvas.height*.7, i));
				});
				console.log(restaurants);
			}
			context.fillStyle = "white";
			context.fillRect(0, 0, canvas.width, canvas.height);
			makeRestaurants();
			render = function () {
				restaurants.forEach(function (r) {
					if (r.choice === null)
					r.render();
				});
			};
			render();
			Mousetrap.bind("enter", function () {
				state.reset();
			});
		}
	}
});
canvas.addEventListener("touchstart", touchstartHandler);
canvas.addEventListener("mousedown", clickHandler);
window.addEventListener("resize", function () {
	resize();
	render();
});
window.addEventListener("keydown", function (e) {
	console.log(e.key)
	var keyAsInt = parseInt(e.key);
	if (Number.isInteger(keyAsInt)) {
		players = keyAsInt;
		render();
	}
});
