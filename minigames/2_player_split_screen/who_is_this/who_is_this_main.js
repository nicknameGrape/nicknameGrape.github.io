import Split_Screen from "../2p_split_screen.mjs";
import JAPANESE_NAMES from "./japanese_names.mjs";
import HatDraw from "/js_modules/HatDraw.mjs";
import IMAGE_LIBRARY from "/image_library/image_library.mjs";
import Loader from "/js_modules/Loader.mjs";
const GAME = new Split_Screen(document.getElementById("p1"), document.getElementById("p2"));

//Elements to reference,
const dossierNameAnswer = document.getElementById("dossierNameAnswer");
const dossierNameGuess = document.getElementById("dossierNameGuess");
const dossierCanThumb = document.getElementById("dossierCanThumb");
const dossierCanAnswer = document.getElementById("dossierCanAnswer");
const dossierCanGuess = document.getElementById("dossierCanGuess");
const dossierPersonalityThumb = document.getElementById("dossierPersonalityThumb");
const dossierPersonalityAnswer = document.getElementById("dossierPersonalityAnswer");
const dossierPersonalityGuess = document.getElementById("dossierPersonalityGuess");
const dossierOK = document.getElementById("dossierOK");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const can1 = document.getElementById("can1");
const can1img = document.getElementById("can1img");
const can1span = document.getElementById("can1span");
const can2 = document.getElementById("can2");
const can2img = document.getElementById("can2img");
const can2span = document.getElementById("can2span");
const can3 = document.getElementById("can3");
const can3img = document.getElementById("can3img");
const can3span = document.getElementById("can3span");
const personality1 = document.getElementById("personality1");
const personality1img = document.getElementById("personality1img");
const personality1span = document.getElementById("personality1span");
const personality2 = document.getElementById("personality2");
const personality2img = document.getElementById("personality2img");
const personality2span = document.getElementById("personality2span");
const personality3 = document.getElementById("personality3");
const personality3img = document.getElementById("personality3img");
const personality3span = document.getElementById("personality3span");

const CAN_DO = [
 {en: "play the piano", keyword: "piano"},
 {en: "play the recorder", keyword: "recorder"},
 {en: "play the guitar", keyword: "guitar"},
 {en: "play soccer", keyword: "soccer"},
 {en: "play basketball", keyword: "basketball"},
 {en: "play volleyball", keyword: "volleyball"},
 {en: "sing", keyword: "microphone"},
 {en: "dance", keyword: "dance"},
 {en: "cook", keyword: "frying pan"},
 {en: "jump rope well", keyword: "jump rope"},
 {en: "run fast", keyword: "running"},
 {en: "swim fast", keyword: "swimming"},
 {en: "see ghosts", keyword: "ghost"}
];
const PERSONALITY = [
	{en: "active", src: "personality_active.png"},
	{en: "brave", src: "personality_brave.png"},
	{en: "friendly", src: "personality_friendly.png"},
	{en: "funny", src: "personality_funny.png"},
	{en: "kind", src: "personality_kind.png"},
	{en: "shy", src: "personality_shy.png"},
	{en: "smart", src: "personality_smart.png"},
	{en: "strong", src: "personality_strong.png"}
];

const loader = new Loader("/image_library/images/");
const loaderLocal = new Loader("img/");

const hdNames = new HatDraw(JAPANESE_NAMES);
const hdCan = new HatDraw(CAN_DO.map(function (obj) {
	let ilo = IMAGE_LIBRARY.find(ilo => ilo.text === obj.keyword);
	let img = loader.newImageAsset(ilo.src, onload);
	obj.img = img;
	return obj;
}));
const hdPersonality = new HatDraw(PERSONALITY.map(function (obj) {
	let img = loaderLocal.newImageAsset(obj.src, onload);
	obj.img = img;
	return obj;
}));

function onload() {
	if (loader.assetsLoaded && loaderLocal.assetsLoaded) {
		setup();
	}
}

function setup() {
	let nameChoices = [hdNames.drawOne(), hdNames.drawOne(), hdNames.drawOne()];
	let nameAnswer = nameChoices[Math.floor(Math.random()*3)];
	let canChoices = [hdCan.drawOne(), hdCan.drawOne(), hdCan.drawOne()];
	let canAnswer = canChoices[Math.floor(Math.random()*3)];
	let personalityChoices = [hdPersonality.drawOne(), hdPersonality.drawOne(), hdPersonality.drawOne()];
	let personalityAnswer = personalityChoices[Math.floor(Math.random()*3)];

	document.querySelectorAll(".pronoun").forEach(function (el) {
		if (nameAnswer.gender === "male") {
			el.innerHTML = "He";
		} else {
			el.innerHTML = "She";
		}
	});

	dossierNameAnswer.innerHTML = nameAnswer.en;
	dossierNameGuess.innerHTML = "(&emsp;)";
	dossierCanThumb.src = canAnswer.img.src;
	dossierCanAnswer.innerHTML = canAnswer.en;
	dossierCanGuess.innerHTML = "(&emsp;)";
	dossierPersonalityThumb.src = personalityAnswer.img.src;
	dossierPersonalityAnswer.innerHTML = personalityAnswer.en;
	dossierPersonalityGuess.innerHTML = "(&emsp;)";

	document.querySelectorAll("input[type='radio']").forEach(el => el.checked = false);
	name1.value = nameChoices[0].en;
	name1.nextElementSibling.innerHTML = nameChoices[0].en;
	name2.value = nameChoices[1].en;
	name2.nextElementSibling.innerHTML = nameChoices[1].en;
	name3.value = nameChoices[2].en;
	name3.nextElementSibling.innerHTML = nameChoices[2].en;
	can1.value = canChoices[0].en;
	can1span.innerHTML = canChoices[0].en;
	can1img.src = canChoices[0].img.src;
	can2.value = canChoices[1].en;
	can2span.innerHTML = canChoices[1].en;
	can2img.src = canChoices[1].img.src;
	can3.value = canChoices[2].en;
	can3span.innerHTML = canChoices[2].en;
	can3img.src = canChoices[2].img.src;
	personality1.value = personalityChoices[0].en;
	personality1span.innerHTML = personalityChoices[0].en;
	personality1img.src = personalityChoices[0].img.src;
	personality2.value = personalityChoices[1].en;
	personality2span.innerHTML = personalityChoices[1].en;
	personality2img.src = personalityChoices[1].img.src;
	personality3.value = personalityChoices[2].en;
	personality3span.innerHTML = personalityChoices[2].en;
	personality3img.src = personalityChoices[2].img.src;
}

function inputNameHandler(ev) {
	dossierNameGuess.innerHTML = this.value;
}

function inputCanHandler(ev) {
	dossierCanGuess.innerHTML = this.value;
}

function inputPersonalityHandler(ev) {
	dossierPersonalityGuess.innerHTML = this.value;
}

dossierOK.addEventListener("click", function (ev) {
	setup();
	GAME.swap();
});

window.addEventListener("keydown", function (ev) {
	if (ev.key === "Enter") {
		setup();
	}
});

document.querySelectorAll("input[name='name']").forEach(el => el.addEventListener("click", inputNameHandler));
document.querySelectorAll("input[name='can']").forEach(el => el.addEventListener("click", inputCanHandler));
document.querySelectorAll("input[name='personality']").forEach(el => el.addEventListener("click", inputPersonalityHandler));
