"use strict"
import il from "../../image_library/image_library.mjs";

function resizeHandler() {
}

function setup() {
	groups.forEach(function (group) {
		group.o.forEach(function (o) {
			let src = "../../image_library/images/" + il.find(function (ilo) {return ilo.text === o.keyword;})["src"];
			let img = document.createElement("img");
			img.src = src;
			img.draggable = false;
			o.img = img;
		});
	});
	console.log(groups);
	correct = document.createElement("audio");
	wrong = document.createElement("audio");
	correct.src = "correct.mp3";
	wrong.src = "wrong.mp3";
}

function pointerdownHandler(ev) {
	let data = ev.currentTarget;
	console.log(data, quiz);
	if (!data.chosen) {
		if (data.value === quiz.group.v_no_ruby) {
			console.log("CORRECT");
			wrong.pause();
			correct.currentTime = 0;
			correct.play();
			data.style.background = "lime";
			Array.from(divButtons.children).forEach(function (button) {
				button.removeEventListener("pointerdown", pointerdownHandler);
			});
			divEn.innerHTML = "I&nbsp<span style=\"background: lime\">"+quiz.group.v_no_ruby+"</span>&nbsp"+quiz.choice.text;
			setTimeout(function () {
				quiz = new Quiz();
				quiz.render();
			}, 3000);
		} else {
			console.log("WRONG");
			wrong.currentTime = 0;
			wrong.play();
			data.style.background = "red";
			divEn.innerHTML = "I&nbsp<span style=\"background: red\">"+data.value+"</span>&nbsp"+quiz.choice.text;
		}
	}
	data.chosen = true;
}

function Quiz() {
	this.render = function () {
		divJp.innerHTML = choice.jp+this.group.jp;
		divEn.innerHTML = "I&nbsp<span style=\"color: gray\">???</span>&nbsp"+this.choice.text;
	};
	let group = hdGroups.drawOne();
	let buttons = [];
	let rIndex = Math.floor(Math.random()*group.o.length);
	let choice = group.o[rIndex];
	while (divPicture.firstChild) {
		divPicture.removeChild(divPicture.firstChild);
	}
	while (divButtons.firstChild) {
		divButtons.removeChild(divButtons.firstChild);
	}
	groups.forEach(function (g) {
		let button = document.createElement("button");
		button.value = g.v_no_ruby;
		button.innerHTML = g.v;
		button.chosen = false;
		button.addEventListener("pointerdown", pointerdownHandler);
		buttons.push(button);
	});
	shuffle(buttons);
	for (let i=0; i<buttons.length; i++) {
		divButtons.appendChild(buttons[i]);
	}
	divPicture.appendChild(choice.img);
	////TODO delete true choice so it doesnt repeat
	//if (group.s === g.s) {g.o.splice(rIndex, 1);}
	//console.log("CHOICE", choice);
	//let div = document.createElement("div");
	//let text = document.createElement("span");
	//text.innerHTML = choice.text;
	//div.appendChild(choice.img);
	//div.appendChild(text);
	//div.s = g.s;
	//div.classList.add("choice");

	//choice.div = div;
	//choice.chosen = false;
	//choices.push(choice);
	this.group = group;
	this.choice = choice;
}

let groups = [
	{
		"v": "<ruby>went<rt>ウェント</rt></ruby>&nbsp<ruby>to<rt>トゥ</rt></ruby>",
		"v_no_ruby": "went to",
		"jp": "に行きました。",
		"o": [
			{
				"text": "a zoo.",
				"jp": "動物園",
				"keyword": "zoo"
			},
			{
				"text": "a swimming pool.",
				"jp": "プール",
				"keyword": "pool"
			},
			{
				"text": "my grandmother's house.",
				"jp": "おばあちゃんち",
				"keyword": "grandmother"
			},
			{
				"text": "a festival.",
				"jp": "祭り",
				"keyword": "festival"
			},
			{
				"text": "a park.",
				"jp": "公園",
				"keyword": "park"
			},
			{
				"text": "an aquarium.",
				"jp": "すいぞうかん",
				"keyword": "aquarium"
			},
			{
				"text": "a science museum.",
				"jp": "理科はくぶつかん",
				"keyword": "science museum"
			},
			{
				"text": "an amusement park.",
				"jp": "ゆうえんち",
				"keyword": "amusement park"
			},
			{
				"text": "a library.",
				"jp": "図書館",
				"keyword": "library"
			}
		]
	},
	{
		"v": "<ruby>saw<rt>サゥ</rt></ruby>",
		"v_no_ruby": "saw",
		"jp": "を見ました。	",
		"o": [
			{
				"text": "a panda.",
				"jp": "パンダ",
				"keyword": "panda"
			},
			{
				"text": "a beetle.",
				"jp": "カブトムシ",
				"keyword": "beetle"
			},
			{
				"text": "the Milky Way.",
				"jp": "天の川",
				"keyword": "the Milky Way"
			},
			{
				"text": "a shooting star.",
				"jp": "ながれぼし",
				"keyword": "shooting star"
			},
			{
				"text": "a shark.",
				"jp": "サメ",
				"keyword": "shark"
			},
			{
				"text": "a U.F.O.",
				"jp": "UFO",
				"keyword": "U.F.O."
			},
			{
				"text": "a kangaroo.",
				"jp": "カンガルー",
				"keyword": "kangaroo"
			},
			{
				"text": "a kappa.",
				"jp": "かっぱ",
				"keyword": "kappa"
			},
			{
				"text": "a dolphin.",
				"jp": "イルカ",
				"keyword": "dolphin"
			}
		]
	},
	{
		"v": "<ruby>ate<rt>エイトッ</rt></ruby>",
		"v_no_ruby": "ate",
		"jp": "を食べました。	",
		"o": [
			{
				"text": "ice cream.",
				"jp": "アイス",
				"keyword": "ice cream"
			},
			{
				"text": "curry.",
				"jp": "カレー",
				"keyword": "curry"
			},
			{
				"text": "watermelon.",
				"jp": "すいか",
				"keyword": "watermelon"
			},
			{
				"text": "sōmen.",
				"jp": "そうめん",
				"keyword": "somen"
			},
			{
				"text": "steak.",
				"jp": "ステーキ",
				"keyword": "steak"
			},
			{
				"text": "pizza.",
				"jp": "ピザ",
				"keyword": "pizza"
			},
			{
				"text": "cake.",
				"jp": "ケーキ",
				"keyword": "cake"
			},
			{
				"text": "shaved ice.",
				"jp": "かきごうり",
				"keyword": "shaved ice"
			},
			{
				"text": "mango.",
				"jp": "マンゴー",
				"keyword": "mango"
			}
		]
	},
	{
		"v": "<ruby>enjoyed<rt>エンジョイドッ</rt></ruby>",
		"v_no_ruby": "enjoyed",
		"jp": "を楽しみました。",
		"o": [
			{
				"text": "shopping.",
				"jp": "かいもの",
				"keyword": "shopping"
			},
			{
				"text": "camping.",
				"jp": "キャンプ",
				"keyword": "camping"
			},
			{
				"text": "swimming.",
				"jp": "水泳",
				"keyword": "swimming"
			},
			{
				"text": "barbecuing.",
				"jp": "バービーキュ",
				"keyword": "barbecue"
			},
			{
				"text": "playing baseball.",
				"jp": "野球",
				"keyword": "baseball"
			},
			{
				"text": "playing soccer.",
				"jp": "サッカー",
				"keyword": "soccer"
			},
			{
				"text": "playing basketball.",
				"jp": "バスケ",
				"keyword": "basketball"
			},
			{
				"text": "skiing.",
				"jp": "スキー",
				"keyword": "skiing"
			},
			{
				"text": "reading books.",
				"jp": "どくしょう",
				"keyword": "book"
			}
		]
	}//,
	//{
	//	"v": "<ruby>It was<rt>イット　ワズ</rt></ruby>",
	//	"v_no_ruby": "It was",
	//	"jp": "",
	//	"o": [
	//		{
	//			"text": "nice.",
	//			"jp": "よかったです。",
	//			"keyword": "happy"
	//		},
	//		{
	//			"text": "beautiful.",
	//			"jp": "美しかったです。",
	//			"keyword": "nature"
	//		},
	//		{
	//			"text": "cute.",
	//			"jp": "可愛かったです。",
	//			"keyword": "dog"
	//		},
	//		{
	//			"text": "fun.",
	//			"jp": "楽しかったです。",
	//			"keyword": "tag"
	//		},
	//		{
	//			"text": "hot.",
	//			"jp": "暑かったです。",
	//			"keyword": "hot"
	//		},
	//		{
	//			"text": "cold.",
	//			"jp": "寒かったです。",
	//			"keyword": "cold"
	//		},
	//		{
	//			"text": "lucky.",
	//			"jp": "幸運でした。",
	//			"keyword": "clover"
	//		},
	//		{
	//			"text": "delicious.",
	//			"jp": "美味しかったです。",
	//			"keyword": "full"
	//		},
	//	]
	//},
];
let divEn = document.getElementById("en");
let divJp = document.getElementById("jp");
let divPicture = document.getElementById("picture");
let divButtons = document.getElementById("buttons");
let hdGroups = new HatDraw(groups);
let quiz;
let correct, wrong;

setup();
quiz = new Quiz();
quiz.render();
//console.log(quiz.category, quiz.choices.map(function (o) {return o.text;}));
console.log(quiz);
