//requirejs(["fitText", "fitImage", "HatDraw", "Loader"], function (fitText, fitImage, HatDraw, Loader) {
import fitText from "../modules/fitText.mjs";
import fitImage from "../modules/fitImage.mjs";
import HatDraw from "../modules/HatDraw.mjs";

function resizeHandler(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	drawDate();
}

var birthdays = [];
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var today = Date.now();
var time = dateFormat(today, "h:MM TT");
var timeFix = 0;
var day = dateFormat(today, "dddd");
var month = dateFormat(today, "mmmm");
var date = dateFormat(today, "dS");
var year = dateFormat(today, "yyyy");
var monthNumber = parseInt(dateFormat(today, "m"));
var season;
var index = null;
if (
	monthNumber === 1 ||
	monthNumber === 2 ||
	monthNumber === 12
) {
	season = "winter (冬)";
} else if (
	monthNumber === 3 ||
	monthNumber === 4 ||
	monthNumber === 5
) {
	season = "spring (春)";
} else if (
	monthNumber === 6 ||
	monthNumber === 7 ||
	monthNumber === 8
) {
	season = "summer (夏)";
} else if (
	monthNumber === 9 ||
	monthNumber === 10 ||
	monthNumber === 11
) {
	season = "fall (秋)";
}

var days = {
	"Sunday": "日",
	"Monday": "月",
	"Tuesday": "火",
	"Wednesday": "水",
	"Thursday": "木",
	"Friday": "金",
	"Saturday": "土"
};
var months = {
	"January": "1月",
	"February": "2月",
	"March": "3月",
	"April": "4月",
	"May": "5月",
	"June": "6月",
	"July": "7月",
	"August": "8月",
	"September": "9月",
	"October": "10月",
	"November": "11月",
	"December": "12月"
};

var japaneseDates = [
"一日",
"二日",
"三日",
"四日",
"五日",
"六日",
"七日",
"八日",
"九日",
"十日",
"十一日",
"十二日",
"十三日",
"十四日",
"十五日",
"十六日",
"十七日",
"十八日",
"十九日",
"二十日",
"二十一日",
"二十二日",
"二十三日",
"二十四日",
"二十五日",
"二十六日",
"二十七日",
"二十八日",
"二十九日",
"三十日",
"三十一日",
"三十二日"
];

var searchText = "";

function drawDate() {
	today = Date.now() + 60000 * timeFix;
	time = dateFormat(today, "h:MM TT");
	//dateFormat(today, "h:MM TT, dddd, mmmm dS, yyyy");
	context.fillStyle = "pink";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "purple";
	fitText(context, time, 0, 0, canvas.width, canvas.height * 1/7);
	context.fillStyle = "orange";
	fitText(context, day + " (" + days[day] + ")", 0, canvas.height * 1/7, canvas.width, canvas.height * 1/7);
	//fitText(context, days[day], canvas.width / 2, canvas.height * 1/6, canvas.width / 2, canvas.height * 1/6, .1, "l");
	context.fillStyle = "blue";
	//context.fillRect(0, canvas.height * 2/6, canvas.width, canvas.height * 1/6);
	fitText(context, month + " (" + months[month] + ")", 0, canvas.height * 2/7, canvas.width, canvas.height * 1/7);
	fitText(context, date + " (" + japaneseDates[parseInt(date) - 1] + ")", 0, canvas.height * 3/7, canvas.width, canvas.height * 1/7);
	context.fillStyle = "red";
	fitText(context, year, 0, canvas.height * 4/7, canvas.width, canvas.height * 1/7);
	context.fillStyle = "green";
	fitText(context, season, 0, canvas.height * 5/7, canvas.width, canvas.height * 1/7);
	context.fillStyle = "light blue";
}

window.addEventListener("resize", resizeHandler, false);

resizeHandler();
drawDate()
setInterval(function () {drawDate();}, 1000);
