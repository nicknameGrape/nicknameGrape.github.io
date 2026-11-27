import Loader from "https://nicknamegrape.github.io/js_modules/Loader.mjs";
import fitImage from "https://nicknamegrape.github.io/js_modules/fitImage.mjs";
import fitText from "https://nicknamegrape.github.io/js_modules/fitText.mjs";
import IMAGE_LIBRARY from "https://nicknamegrape.github.io/image_library/image_library.mjs"
class Lot {
	constructor() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.canvas.classList.add("lot");
		this.canvas.addEventListener("click", this.build.bind(this));
		this.context.textAlign = "center";
		this.adjective = null;
		this.buildingText = null;
		this.buildingImg = null;
		divCity.appendChild(this.canvas);
	}
	render() {
		console.log("rendering");
		let c = this.canvas;
		let cx = this.context;
		let roadWidth = window.innerWidth*.01;
		c.width = window.innerWidth*.3333+1;
		c.height = window.innerHeight*.3333+1;
		cx.clearRect(0, 0, c.width, c.height);
		cx.fillStyle = "gray";
		cx.fillRect(0, 0, c.width, c.height);
		cx.fillStyle = "green";
		cx.fillRect(roadWidth, roadWidth, c.width-roadWidth*2, c.height-roadWidth*2);
		cx.strokeStyle = "white";
		cx.beginPath();
		cx.setLineDash([c.width*.03, c.width*.03]);
		cx.moveTo(c.width*.05, c.height-2);
		cx.lineTo(c.width*.95, c.height-2);
		cx.stroke();
		cx.moveTo(c.width-2, roadWidth);
		cx.lineTo(c.width-2, c.height-roadWidth);
		cx.stroke();
		if (this.buildingText !== null && this.buildingImg !== null && this.adjective !== null) {
			fitImage(cx, this.buildingImg, c.width*.1, 0, c.width*.5, c.height*.7);
			cx.setLineDash([]);
			cx.fillStyle = "yellow";
			fitText(cx, this.adjective, c.width*.6, c.height*.2, c.width*.3, c.height*.5);
			cx.fillStyle = "white";
			fitText(cx, this.buildingText, c.width*.1, c.height*.7, c.width*.5, c.height*.2);
		} else {
			cx.fillStyle = "white";
			cx.textAlign = "center";
			cx.fillText("FOR SALE", c.width/2, c.height/2);
		}
	}
	build() {
		currentLot = this;
		let checkedBoxes = document.querySelectorAll('input:checked');
		Array.from(checkedBoxes).forEach(function (input) {
			input.parentElement.parentElement.removeChild(input.parentElement);
		});
		divBuildMenu.style.display = "flex";
	}
}

function updateLot(ev) {
	if (currentLot !== null) {
		if (ev.target.name === "building") {
			currentLot.buildingText = ev.target.data.text;
			currentLot.buildingImg = loader.newImageAsset(ev.target.data.src, currentLot.render.bind(currentLot));
		} else if (ev.target.name === "adjective") {
			currentLot.adjective = ev.target.value;
		}
		if (
			currentLot.adjective !== null &&
			currentLot.buildingText !== null &&
			currentLot.buildingImg !== null
		) {
			divBuildMenu.style.display = "none";
			currentLot.render();
		}
	}
}

let loader = new Loader("https://nicknamegrape.github.io/image_library/images/");
let BLACKLIST = [
	"the Taj Mahal",
	"the Great Wall"
]
let buildings = IMAGE_LIBRARY.filter(o =>
	(
		o.tags.includes("building") &&
		!BLACKLIST.includes(o.text)
	)
);
let OTHER = [
	"mountain",
	"river"
]
let divCity = document.getElementById("city");
let divBuildMenu = document.getElementById("buildMenu");
let divBuildings = document.getElementById("buildings");
let lots = [];
let currentLot = null;
buildings.forEach(function (b) {
	let div = document.createElement("div");
	let input = document.createElement("input");
	let label = document.createElement("label");
	let img = loader.newImageAsset(b.src);
	input.data = b;
	input.type = "radio";
	input.name = "building";
	input.id = b.text;
	label.innerHTML = b.text;
	label.htmlFor = b.text;
	img.htmlFor = b.text;
	label.appendChild(img);
	div.appendChild(input);
	div.appendChild(label);
	divBuildings.appendChild(div);
});
//for (let i=0; i<20; i++) {
for (let i=0; i<9; i++) {
	let lot = new Lot();
	lots.push(lot);
	lot.render();
};
window.addEventListener("resize", function () {
	lots.forEach(l => l.render());
});
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		Array.from(document.getElementsByTagName("input")).forEach(function (input) {
			input.checked = false;
		});
		currentLot.adjective = null;
		currentLot.buildingText = null;
		currentLot.buildingImg = null;
		divBuildMenu.style.display = "none";
	}
});
Array.from(document.getElementsByTagName("input")).forEach(function (input) {
	input.checked = false;
	input.addEventListener("change", updateLot);
});
