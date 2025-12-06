"use strict"

import Loader from "../js_modules/Loader.mjs"
import menu from "./menu.js"
import gameView from "./game.js"

console.log(game);
game.loader = new Loader("../image_library/images/");
game.state = new StateMachine({
	init: "loading",
	transitions: [
		{name: "start", from: "loading", to: "menu"},
		{name: "go", from: "menu", to: "game"},
		{name: "back", from: "game", to: "menu"}
	],
	data: {
		"loading": {
			"setup": function(){},
			"render": function(){},
			"takedown": function(){}
		},
		"menu": menu,
		"game": gameView
	},
	methods: {
		onEnterState: function () {
			console.log(this.state);
			this[this.state].setup();
			this[this.state].render();
		},
		onLeaveState: function () {
			if (this.state !== "none") {
				this[this.state].takedown();
			}
		},
		onGo: function () {},
		onBeforeFinish: function () {}
	}
});

game.state.start();
