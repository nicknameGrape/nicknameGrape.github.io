//import image_library from "../image_library/image_library.mjs"
import image_library from "/image_library/image_library.mjs"
//import HatDraw from "../js_modules/HatDraw.mjs"
import HatDraw from "/minigames/js_modules/HatDraw.mjs"
//console.log(image_library);
class Choice {
	constructor(ilo) {
		this.liked = null;
		this.decisionBox = document.createElement("div");
		this.decisionBox.classList.add("decisionBox");
		let buttonLike = document.createElement("button");
		buttonLike.innerHTML = "❤<br>Like";
		buttonLike.classList.add("buttonLike");
		let buttonDont = document.createElement("button");
		buttonDont.innerHTML = "X<br>Don't Like";
		buttonDont.classList.add("buttonDont");
		let img = document.createElement("img");
		//let ilo = image_library[Math.floor(Math.random()*image_library.length)];
		//let ilo = ilFiltered.splice([Math.floor(Math.random()*ilFiltered.length)], 1)[0];
		this.ilo = ilo;
		console.log(ilo);
		img.src = PATH2IMAGES + ilo.src;
		img.il_data = ilo;
		img.classList.add("choice");
		this.decisionBox.append(img);
		this.decisionBox.append(buttonLike);
		this.decisionBox.append(buttonDont);
		buttonLike.addEventListener("click", function () {
			if (this.liked) {
				this.unsure();
			} else {
				this.like();
			}
		}.bind(this));
		buttonDont.addEventListener("click", function (click) {
			if (this.liked === false) {
				this.unsure();
			} else {
				this.dont();
			}
		}.bind(this));
		return this.decisionBox;
	}
	like () {
		this.liked = true;
		this.decisionBox.classList.remove("dont");
		this.decisionBox.classList.add("like");
		console.log("I like", this.ilo.like, this.ilo.text);
		showSentences();
	}
	dont () {
		this.liked = false;
		this.decisionBox.classList.remove("like");
		this.decisionBox.classList.add("dont");
		console.log("I don't like", this.ilo.like, this.ilo.text);
		showSentences();
	}
	unsure () {
		this.liked = null;
		this.decisionBox.classList.remove("like");
		this.decisionBox.classList.remove("dont");
		console.log("I'm not sure about ", this.ilo.like, this.ilo.text);
		showSentences();
	}
}

function showSentences () {
	let count = 0;
	let toAppend = [];
	Array.from(document.getElementById("choices").children).forEach(function (div) {
		if (div.classList.contains("like")) {
			let img = div.firstChild.cloneNode(true);
			let data = div.firstChild.il_data;
			let sentence = document.createElement("div");
			if (data.hasOwnProperty("like")) {
				sentence.innerHTML = "I like " + data.like + ".";
			} else if (data.hasOwnProperty("plural")) {
				sentence.innerHTML = "I like " + data.plural + ".";
			} else {
				sentence.innerHTML = "I like " + data.text + ".";
			}
			img.classList.add("like");
			sentence.classList.add("like");
			toAppend.push(img);
			toAppend.push(sentence);
			count++;
		} else if (div.classList.contains("dont")) {
			let img = div.firstChild.cloneNode(true);
			let data = div.firstChild.il_data;
			let sentence = document.createElement("div");
			if (data.hasOwnProperty("like")) {
				sentence.innerHTML = "I don't like " + data.like + ".";
			} else if (data.hasOwnProperty("plural")) {
				sentence.innerHTML = "I don't like " + data.plural + ".";
			} else {
				sentence.innerHTML = "I don't like " + data.text + ".";
			}
			img.classList.add("dont");
			sentence.classList.add("dont");
			toAppend.push(img);
			toAppend.push(sentence);
			count++;
		}
	});
	if (count > 2) {
		document.getElementById("choices").style.display = "none";
		toAppend.forEach(function (el) {
			document.getElementById("sentences").appendChild(el);
		});
		document.getElementById("sentences").style.display = "grid";
	}
}

function setup() {
	while (divChoices.firstChild) {
		divChoices.removeChild(divChoices.firstChild);
	}
	while (divSentences.firstChild) {
		divSentences.removeChild(divSentences.firstChild);
	}
	for (let i=0;i<N;i++) {
		let ilo = hatdraw.drawOne();
		let box = new Choice(ilo);
		divChoices.appendChild(box);
	}
	divChoices.style.display = "grid";
	divSentences.style.display = "none";
}
//const PATH2IMAGES = "/image_library/images/";
const PATH2IMAGES = "/image_library/images/";
//const N = 20;
const N = 16;
//const N = 9;
const divChosen = document.getElementById("chosen");
const divChoices = document.getElementById("choices");
const divLike = document.getElementById("like");
const divDont = document.getElementById("dont");
const divSentences = document.getElementById("sentences");
const tags = ["food", "fruit", "animal", "color", "drink", "sport", "vegetable", "monster", "vehicle", "entertainment"];
const BLACKLIST = ["pet"];
let dragged = null;
let ilFiltered = image_library.filter(function (o) {
	return o.tags.some(function (t) {return tags.includes(t);}) &&
	!BLACKLIST.includes(o.text);
	//return o;
});
const hatdraw = new HatDraw(ilFiltered);
console.log(ilFiltered);
setup();

window.addEventListener("keydown", function (ev) {
	if (ev.key === "n") {
		setup();
	}
});
document.getElementById("reset").addEventListener("click", function (ev) {
	setup();
});
