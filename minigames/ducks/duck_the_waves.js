var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var pond = new Image();
pond.src = "img/pond.png"
var wave0 = new Image();
wave0.src = "img/wave0.png"
var wave1 = new Image();
wave1.src = "img/wave1.png"
var wave2 = new Image();
wave2.src = "img/wave2.png"
var wave3 = new Image();
wave3.src = "img/wave3.png"

var motherDuck = new Image();
motherDuck.src = "img/mother_duck.png"
var duckling1 = new Image();
duckling1.src = "img/baby_duck_1.png"
var duckling2 = new Image();
duckling2.src = "img/baby_duck_2.png"
var duckling3 = new Image();
duckling3.src = "img/baby_duck_3.png"
var bubbles = new Image();
bubbles.src = "img/bubbles.png"
var splash = new Image();
splash.src = "img/splash.png"

var base = 1;
var numbers = [2, 3, 4];

function getSequence() {
	//base = Math.ceil(Math.random()*8) + 10;
	//numbers = [
	//	base + 1,
	//	base + 2,
	//	base + 3
	//];
	base = base + 4
	numbers = [
		base + 1,
		base + 2,
		base + 3
	];
};

shuffle(numbers);

var positions = [
	{x:100, y:100},
	{x:500, y:100},
	{x:200, y:300},
	{x:600, y:300},
];

shuffle(positions);

//draw to fit canvas, keep image aspect ratio
var frame = 1;
var draw = function(){
	switch (frame) {
		case 1:
			ctx.drawImage(pond, 0, 0);
			ctx.drawImage(motherDuck, 50, 100);
			ctx.font = "100px Arial";
			ctx.fillStyle = "white";
			ctx.fillText(base, 170, 150);
			ctx.drawImage(duckling1, 350, 200);
			ctx.font = "70px Arial";
			ctx.fillText(base + 1, 350+45, 200);
			ctx.drawImage(duckling1, 475, 225);
			ctx.fillText(base + 2, 475+45, 225);
			ctx.drawImage(duckling1, 600, 250);
			ctx.fillText(base + 3, 600+45, 250);
			break;
		case 2:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(wave0, 0, 0);
			ctx.drawImage(motherDuck, 50, 100);
			ctx.drawImage(duckling1, 350, 200);
			ctx.drawImage(duckling1, 475, 225);
			ctx.drawImage(duckling1, 600, 250);
			frame++;
			myTimeout = setTimeout(draw, 700);
			break;
		case 3:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(wave1, 0, 0);
			ctx.drawImage(motherDuck, 50, 100);
			ctx.drawImage(duckling1, 350, 200);
			ctx.drawImage(duckling1, 475, 225);
			ctx.drawImage(duckling1, 600, 250);
			frame++;
			myTimeout = setTimeout(draw, 700);
			break;
		case 4:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(wave2, 0, 0);
			frame++;
			myTimeout = setTimeout(draw, 700);
			break;
		case 5:
			//positionsAfterWave = shuffle(positions);
			shuffle(positions);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(pond, 0, 0);
			ctx.drawImage(motherDuck, positions[0].x -50, positions[0].y-70);
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.drawImage(duckling1, positions[2].x, positions[2].y);
			ctx.drawImage(bubbles, positions[3].x, positions[3].y+40);
			ctx.drawImage(wave3, 0, 0);
			frame++;
			myTimeout = setTimeout(draw, 700);
			break;
		case 6:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(pond, 0, 0);
			ctx.drawImage(motherDuck, positions[0].x -50, positions[0].y-70);
			ctx.font = "100px Arial";
			ctx.fillText(base, positions[0].x+70, positions[0].y-20)
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.font = "70px Arial";
			ctx.fillText(numbers[0], positions[1].x+45, positions[1].y)
			ctx.drawImage(duckling1, positions[2].x, positions[2].y);
			ctx.fillText(numbers[1], positions[2].x+45, positions[2].y)
			ctx.drawImage(bubbles, positions[3].x, positions[3].y+40);
			break;
		case 7:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(pond, 0, 0);
			ctx.drawImage(motherDuck, positions[0].x -50, positions[0].y-70);
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.font = "100px Arial";
			ctx.fillText(base, positions[0].x+70, positions[0].y-20)
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.font = "70px Arial";
			ctx.fillText(numbers[0], positions[1].x+45, positions[1].y)
			ctx.drawImage(duckling1, positions[2].x, positions[2].y);
			ctx.fillText(numbers[1], positions[2].x+45, positions[2].y)
			ctx.drawImage(splash, positions[3].x, positions[3].y);
			frame++;
			myTimeout = setTimeout(draw, 500);
			break;
		case 8:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(pond, 0, 0);
			ctx.drawImage(motherDuck, positions[0].x -50, positions[0].y-70);
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.font = "100px Arial";
			ctx.fillText(base, positions[0].x+70, positions[0].y-20)
			ctx.drawImage(duckling1, positions[1].x, positions[1].y);
			ctx.font = "70px Arial";
			ctx.fillText(numbers[0], positions[1].x+45, positions[1].y)
			ctx.drawImage(duckling1, positions[2].x, positions[2].y);
			ctx.fillText(numbers[1], positions[2].x+45, positions[2].y)
			ctx.drawImage(duckling1, positions[3].x, positions[3].y);
			ctx.fillStyle = "yellow";
			ctx.fillText(numbers[2], positions[3].x+45, positions[3].y)
			break;
		case 9:
			getSequence();
			frame = 1;
			draw();
			shuffle(numbers);
			break;
		default:
			console.log("Sorry, we are out of frames");
	}
};

myListener = addEventListener("keydown", function(){
	if ( event.keyCode == " ".charCodeAt(0) ) {
		frame++;
		draw();
	}
});

setTimeout(draw, 1000);
