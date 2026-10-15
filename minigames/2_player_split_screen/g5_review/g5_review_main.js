import Split_Screen from "../2p_split_screen.mjs";
const GAME = new Split_Screen(document.getElementById("p1"), document.getElementById("p2"));
console.log(GAME);
window.addEventListener("keydown", function (ev) {
	console.log(GAME);
	if (ev.key === " ") {
		GAME.swap();
	}
});

