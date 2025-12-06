"use strict"

import Loader from "../js_modules/Loader.mjs";
import shuffle from "../js_modules/shuffle.mjs";
import flags from "../image_library/flags/flags.mjs";
import BANKNOTES from "./banknotes_data.mjs";

function Quiz() {
	shuffle(banknotes);
	let choices = banknotes.slice(0, 5);
	let answer = choices[0];
	banknotes = banknotes.slice(1);
	shuffle(choices);
	listOfElementsToRemoveChildren.forEach(function (e) {
		while (e.firstChild) {
			e.removeChild(e.firstChild);
		}
	});
	divBanknote.appendChild(answer.img);
	buttonChoice1.data = choices[0];
	buttonChoice1.innerHTML = choices[0].english;
	buttonChoice1.appendChild(choices[0].flag);
	buttonChoice2.data = choices[1];
	buttonChoice2.innerHTML = choices[1].english;
	buttonChoice2.appendChild(choices[1].flag);
	buttonChoice3.data = choices[2];
	buttonChoice3.innerHTML = choices[2].english;
	buttonChoice3.appendChild(choices[2].flag);
	buttonChoice4.data = choices[3];
	buttonChoice4.innerHTML = choices[3].english;
	buttonChoice4.appendChild(choices[3].flag);
	buttonChoice5.data = choices[4];
	buttonChoice5.innerHTML = choices[4].english;
	buttonChoice5.appendChild(choices[4].flag);
	Array.from(document.getElementsByTagName("button")).forEach(function (b) {
		b.disabled = false;
		b.style.background = "";
	});
	this.answer = answer;
	this.choices = choices;
	this.countTries = 0;
}

function buttonClickHandler(ev) {
	let target = ev.currentTarget;
	if (target.data.country_code == quiz.answer.country_code) {
		audioWrong.pause();
		audioCorrect.currentTime = .1;
		audioCorrect.play();
		Array.from(document.getElementsByTagName("button")).forEach(function (b) {
			b.disabled = true;
		});
		points += 5-quiz.countTries;
		document.getElementById("pointNumber").innerHTML = points;
		target.style.background = "lime";
		window.setTimeout(function () {quiz = new Quiz();}, 3000);
	} else {
		audioCorrect.pause();
		audioWrong.currentTime = 0;
		audioWrong.play();
		target.disabled = true;
		target.style.background = "red";
		quiz.countTries += 1;
	}
}

function onload() {
	if (loader.assetsLoaded && loaderFlags.assetsLoaded) {
		quiz = new Quiz();
		console.log(quiz.answer, quiz.choices);
	}
}

const divBanknote = document.getElementById("banknote");
const buttonChoice1 = document.getElementById("choice1");
const buttonChoice2 = document.getElementById("choice2");
const buttonChoice3 = document.getElementById("choice3");
const buttonChoice4 = document.getElementById("choice4");
const buttonChoice5 = document.getElementById("choice5");
const listOfElementsToRemoveChildren = [divBanknote, buttonChoice1, buttonChoice2, buttonChoice3, buttonChoice4, buttonChoice5];
const loader = new Loader("./banknotes/");
const loaderFlags = new Loader("../image_library/flags/img/", onload);
const audioCorrect = document.createElement("audio");
const audioWrong = document.createElement("audio");
let banknotes = BANKNOTES.slice();
let quiz;
let points = 0;
Array.from(document.getElementsByClassName("choice")).forEach(el => el.addEventListener("click", buttonClickHandler));
banknotes.forEach(function (bn) {
	bn.img = loader.newImageAsset(bn.src, onload);
	bn.flag = loaderFlags.newImageAsset(bn.country_code + ".png", onload);
});
audioCorrect.src = "correct.mp3";
audioWrong.src = "wrong.mp3";
