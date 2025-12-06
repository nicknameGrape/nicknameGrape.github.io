import fitText from "../js_modules/fitText.mjs"
//draw montage to fit given area
function drawTextMontage(context, imgsArray, x, y, w, h) {
	var canvas = context.canvas;

	if ( typeof x === "undefined" ){
		x = 0;
	}
	if ( typeof y === "undefined" ){
		y = 0;
	}
	if ( typeof w === "undefined" ){
		w = canvas.width;
	}
	if ( typeof h === "undefined" ){
		h = canvas.height;
	}

	//number of rows and columns that yields the squarest tiles with the least waste
	var wastes = [];
	for (var i=1; i<=imgsArray.length; i++) {
		var tileSize = Math.min(h / i, w / Math.floor(imgsArray.length / i));
		//var tileSize = h / i * imgsArray.length < w ? h / i : w / imgsArray.length;
		wastes.push(w * h - Math.pow(tileSize, 2) * imgsArray.length);
	}
	var rows = wastes.indexOf(Math.min(...wastes)) + 1;
	var cols = Math.ceil(imgsArray.length / rows);

	var tileWidth = w / cols;
	var tileHeight = h / rows;

	imgsArray.forEach(function (element, index, array) {
		fitText(context, element, tileWidth * (index % cols) + x, tileHeight * Math.floor(index / cols) + y, tileWidth, tileHeight);
	})
}

export default drawTextMontage;
