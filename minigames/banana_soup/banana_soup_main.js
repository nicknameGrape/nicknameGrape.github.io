import HatDraw from "/minigames/js_modules/HatDraw.mjs";
import fitImage from "/minigames/js_modules/fitImage.mjs";
import fitText from "/minigames/js_modules/fitText.mjs";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var foodsSources = [
"img/0164_curryandrice_01.jpg"
,"img/0165_spaghetti_01.jpg"
,"img/0166_pizza_01.jpg"
,"img/0168_omelet_01.jpg"
,"img/0172_salad_01.jpg"
,"img/0173_bread_01.jpg"
,"img/0174_sandwich_01.jpg"
,"img/0175_hamburger_01.jpg"
,"img/0176_hotdog_01.jpg"
,"img/0177_soup_01.jpg"
,"img/0186_yogurt_01.jpg"
,"img/0193_juice_01.jpg"
,"img/0195_milk_01.jpg"
,"img/0196_tea_01.jpg"
,"img/0200_cake_01.jpg"
,"img/0201_icecream_01.jpg"
,"img/0204_jelly_01.jpg"
,"img/0205_parfait_01.jpg"
,"img/milkshake.png"
,"img/onigiri.png"
,"img/pie.png"
]
var flavorsSources = [
"img/0135_melon_01.jpg"
,"img/0136_watermelon_01.jpg"
,"img/0137_strawberry_01.jpg"
,"img/0138_banana_01.jpg"
,"img/0139_apple_01.jpg"
,"img/0140_orange_01.jpg"
,"img/0141_grapes_01.jpg"
,"img/0142_peach_01.jpg"
,"img/0143_grapefruit_01.jpg"
,"img/0144_pineapple_01.jpg"
,"img/0145_cherry_01.jpg"
,"img/0146_kiwifruit_01.jpg"
,"img/0147_lemon_01.jpg"
,"img/0148_carrot_01.jpg"
,"img/0149_cucumber_01.jpg"
,"img/0150_cabbage_01.jpg"
,"img/0151_potato_01.jpg"
,"img/0152_sweetpotato_01.jpg"
,"img/0153_onion_01.jpg"
,"img/0154_tomato_01.jpg"
,"img/0155_corn_01.jpg"
,"img/0156_greenpepper_01.jpg"
,"img/0157_pumpkin_01.jpg"
,"img/0160_fruit_01.jpg"
,"img/0161_vegitable_01.jpg"
,"img/0162_steak_01.jpg"
,"img/0167_egg_01.jpg"
,"img/0169_friedchicken_01.jpg"
,"img/0170_sausage_01.jpg"
,"img/0171_Frenchfries_01.jpg"
,"img/0180_natto_01.jpg"
,"img/0182_kimchi_01.jpg"
,"img/0185_cheese_01.jpg"
,"img/0187_soysauce_01.jpg"
,"img/0188_sugar_01.jpg"
,"img/0189_salt_01.jpg"
,"img/0192_ice_01.jpg"
,"img/0198_coffee_01.jpg"
,"img/chili.png"
,"img/chocolate.png"
,"img/fish_dni4bst1.png"
,"img/miso.png"
];

var flavors = [];
for (let i=0; i<flavorsSources.length; i++) {
	var pushMe = new Image();
	pushMe.src = flavorsSources[i];
	flavors.push(pushMe);
};
const hdFlavors = new HatDraw(flavors);

var foods = [];
for (let i=0; i<foodsSources.length; i++ ) {
	var pushMe = new Image();
	pushMe.src = foodsSources[i];
	foods.push(pushMe);
};
const hdFoods = new HatDraw(foods);

let currentFlavor = null;
let currentFood = null;

//input
var timesPressed = 0;
function draw() {;
	switch (timesPressed) {
		case 0:
			//ctx.fillText("Do you like", canvas.width/2, canvas.height/2 - 100)
			//ctx.fillText("banana soup?", canvas.width/2, canvas.height/2 + 100)
			fitText(ctx, "Do you like", 0, 0, canvas.width, canvas.height/3);
			fitText(ctx, "banana soup?", 0, canvas.height/3, canvas.width, canvas.height/3);
			fitImage(ctx, flavors[3], 0, canvas.height*2/3, canvas.width/2, canvas.height/3);
			fitImage(ctx, foods[9], canvas.width/2, canvas.height*2/3, canvas.width/2, canvas.height/3);
			fitText(ctx, "+", canvas.width*5/11, canvas.height*2/3, canvas.width/11, canvas.height/3);
			currentFlavor = hdFlavors.drawOne();
			currentFood = hdFoods.drawOne();
			timesPressed++;
			break;
		case 1:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			fitImage(ctx, currentFlavor, 0, 0, canvas.width*2/5, canvas.height);
			//flavors[0].draw(0, 0, canvas.width / 2, canvas.height);
			timesPressed++;
			break;
		case 2:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//foods[0].draw(canvas.width / 2, 0, canvas.width / 2, canvas.height);
			fitImage(ctx, currentFood, canvas.width*3/5, 0, canvas.width*2/5, canvas.height);
			timesPressed++;
			break;
		case 3:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//flavors[0].draw(0, 0, canvas.width / 2, canvas.height);
			//foods[0].draw(canvas.width / 2, 0, canvas.width / 2, canvas.height);
			fitImage(ctx, currentFlavor, 0, 0, canvas.width*2/5, canvas.height);
			fitImage(ctx, currentFood, canvas.width*3/5, 0, canvas.width*2/5, canvas.height);
			fitText(ctx, "+", canvas.width*2/5, 0, canvas.width/5, canvas.height);
			currentFlavor = hdFlavors.drawOne();
			currentFood = hdFoods.drawOne();
			timesPressed = 1;
	};
}
function onSpacePress() {
	if ( event.keyCode == " ".charCodeAt(0) ) {
		draw();
	};
};

const myListener = addEventListener("keydown", function(){ onSpacePress() });
setTimeout(draw, 1000);
