import fitImg from "../js_modules/fitImage.mjs"
//draw montage to fit given area
function drawMontage(context, imgsArray, x, y, w, h, padding=0) {
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
	console.log(wastes);
	var rows = wastes.indexOf(Math.min(...wastes)) + 1;
	var cols = Math.ceil(imgsArray.length / rows);

	var tileWidth = w / cols;
	var tileHeight = h / rows;

	imgsArray.forEach(function (element, index, array) {
		//fitImg(context, element, tileWidth * (index % cols) + x, tileHeight * Math.floor(index / cols) + y, tileWidth, tileHeight);
		fitImg(context, element, tileWidth * (index % cols + padding/100) + x, tileHeight * (Math.floor(index / cols) + padding/100) + y, tileWidth*(100 - 2*padding)/100, tileHeight*(100 - 2*padding)/100);
	})
}

export default drawMontage;
