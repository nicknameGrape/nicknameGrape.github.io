//require(["banapple/parts", "fitImage", "Loader", "fitMontage", "state-machine3", "fitText"], function (parts, fitImage, Loader, fitMontage, Statemachine, fitText) {
import fitImage from "/js_modules/fitImage.mjs";
import Loader from "/js_modules/Loader.mjs";
import PARTS from "./parts.mjs";

function topClickHandler(ev) {
	data_top = PARTS[this.value];
	img_top = this.firstChild;
	this.disabled = true;
	divTops.style.display = "none";
	divBottoms.style.display = "grid";
}

function bottomClickHandler(ev) {
	data_bottom = PARTS[this.value];
	img_bottom = this.firstChild;
	this.disabled = true;
	context.clearRect(0, 0, canvas.width, canvas.height);
	fitImage(context, combine());
	divBottoms.style.display = "none";
	divResult.style.display = "flex";
}

function againClickHandler(ev) {
	divResult.style.display = "none";
	divTops.style.display = "grid";
}

function combine() {
	let fTop = data_top;
	let fBot = data_bottom;
	var tmpCanvas = document.createElement("canvas");
	var tmpContext = tmpCanvas.getContext("2d");
	var fTopBeltW = fTop.tx2 - fTop.tx1;
	var fBotBeltW = fBot.bx2 - fBot.bx1;
	var beltWidth = (fTopBeltW + fBotBeltW)/2;
	var topScale = beltWidth/fTopBeltW;
	var botScale = beltWidth/fBotBeltW;
	var xOrigin = Math.max(fTop.tx1*topScale, fBot.bx1*botScale);
	var yOrigin = fTop.y*topScale;
	tmpCanvas.height = yOrigin + fBot.imgBot.height*botScale;
	tmpCanvas.width = xOrigin + Math.max(fTopBeltW*topScale, fBotBeltW*botScale)*1.1;
	console.log("tmpCanvas", tmpCanvas.width, tmpCanvas.height);
	tmpContext.drawImage(fBot.imgBot, xOrigin - fBot.bx1*botScale, yOrigin-5, fBot.imgBot.width*botScale, fBot.imgBot.height*botScale);
	tmpContext.drawImage(fTop.imgTop, xOrigin-fTop.tx1*topScale, yOrigin-fTop.y*topScale, fTop.imgTop.width*topScale, fTop.imgTop.height*topScale);
	return tmpCanvas;
}

const divTops = document.getElementById("tops");
const divBottoms = document.getElementById("bottoms");
const divResult = document.getElementById("result");
const canvas = document.getElementById("canvasResult");
const context = canvas.getContext("2d");
const loader = new Loader("./img/");
let data_top = null;
let data_bottom = null;
let img_top = null;
let img_bottom = null;

document.querySelectorAll(".top").forEach(el => el.addEventListener("click", topClickHandler));
document.querySelectorAll(".bottom").forEach(el => el.addEventListener("click", bottomClickHandler));
document.getElementById("buttonAgain").addEventListener("click", againClickHandler);

Object.values(PARTS).forEach(function (part) {
	let imgTop = document.createElement("img");
	let imgBot = document.createElement("img");
	imgTop.src = "img/"+part.top;
	imgBot.src = "img/"+part.bot;
	part.imgTop = imgTop;
	part.imgBot = imgBot;
});
