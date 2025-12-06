"use strict"
import menu from "./menu.mjs"
import quiz from "./quiz_simple.mjs"

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var game = {
	"canvas": canvas,
	"context": context
};

quiz.setup();
