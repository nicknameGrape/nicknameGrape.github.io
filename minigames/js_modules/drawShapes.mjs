function distance(p1, p2) {
			var result = Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
			return result;
}
function drawCircle(context, p1, p2) {
	var x = (p1.x + p2.x)/2;
	var y = (p1.y + p2.y)/2;
	var r = distance(p1, p2)/2;
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI*2);
	context.fill();
	context.closePath();
}
function drawEllipse(context, p1, p2, p3) {
	var points = [p1, p2, p3];
	var centerPoint = {
		"x": (points[2].x + points[0].x)/2,
		"y": (points[2].y + points[0].y)/2
	};
	var radiusx = distance(points[0], centerPoint);
	var radiusy = distance(centerPoint, points[1]);
	var dx = points[2].x - points[0].x;
	var dy = points[2].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.beginPath();
	context.ellipse(centerPoint.x, centerPoint.y, radiusx, radiusy, angle, 0, Math.PI*2);
	context.fill();
}
function drawRectangle(context, p1, p2, p3) {
	//find longest diagonal and then use those as endpoints
	var p1p2 = distance(p1, p2);
	var p2p3 = distance(p2, p3);
	var p3p1 = distance(p3, p1);
	var points;
	if (p1p2 > p2p3 && p1p2 > p3p1) {
		points = [p1, p3, p2];
	} else if (p2p3 > p3p1 && p2p3 > p1p2) {
		points = [p2, p1, p3];
	} else if (p3p1 > p1p2 && p3p1 > p2p3) {
		points = [p3, p2, p1];
	}
	//use longest leg for layout
	if (distance(points[0], points[1]) < distance(points[1], points[2])) {
		points.reverse();
	}
	var angle1 = Math.atan2(
			points[1].y - points[0].y,
			points[1].x - points[0].x
			);
	context.save();
	context.translate(points[0].x, points[0].y);
	context.rotate(angle1);
	//if p2.y is larger than the line p1p3 at point p2.x, flip rectangle
	var slope = (points[1].y - points[0].y)/(points[1].x - points[0].x);
	var yIntercept = points[0].y - slope*points[0].x;
	if (points[2].y < slope*points[2].x + yIntercept) {
		if (points[1].x > points[0].x) {
			context.scale(1, -1);
		}
	} else {
		if (points[1].x < points[0].x) {
			context.scale(1, -1);
		}
	}
	context.fillRect(0, 0,
			distance(points[0], points[1]),
			distance(points[1], points[2])
			);
	context.restore();
}
function drawTriangle(context, p1, p2, p3) {
	var points = [p1, p2, p3];
	context.beginPath();
	context.moveTo(points[0].x, points[0].y);
	context.lineTo(points[1].x, points[1].y);
	context.lineTo(points[2].x, points[2].y);
	context.lineTo(points[0].x, points[0].y);
	context.fill();
	context.closePath();
};
function drawSquare(context, p1, p2) {
	var points = [p1, p2];
	var diagonal = distance(points[0], points[1]);
	var side = diagonal/Math.sqrt(2);
	var dx = points[1].x - points[0].x;
	var dy = points[1].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.save();
	context.translate(points[0].x, points[0].y);
	context.rotate(angle);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(diagonal/2, side/Math.sqrt(2));
	context.lineTo(diagonal, 0);
	context.lineTo(diagonal/2, -side/Math.sqrt(2));
	context.lineTo(0, 0);
	context.lineTo(diagonal/2, 0);
	context.fill();
	context.closePath();
	context.restore();
};
function drawHeart(context, p1, p2) {
	var points = [p1, p2];
	var diagonal = distance(points[0], points[1]);
	var dx = points[1].x - points[0].x;
	var dy = points[1].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.save();
	context.translate(points[0].x, points[0].y);
	context.rotate(angle);
	context.beginPath();
	context.arc(diagonal/4, diagonal/4, diagonal/4, -Math.PI/2, -3/2*Math.PI, true);
	context.bezierCurveTo(diagonal*2/4, diagonal/2, diagonal*2/3, diagonal*.4, diagonal, 0);
	context.bezierCurveTo(diagonal*2/3, -diagonal*.4, diagonal*2/4, -diagonal/2, diagonal/4, -diagonal/2);
	context.arc(diagonal/4, -diagonal/4, diagonal/4, -Math.PI/2, -3/2*Math.PI, true);
	context.closePath();
	context.fill();
	context.restore();
};
function drawStar(context, p1, p2) {
	var points = [p1, p2];
	var center = {"x": (p1.x + 2*p2.x)/3, "y": (p1.y + 2*p2.y)/3};
	var r = distance(points[0], points[1])*4/3/2;
	var dx = points[1].x - points[0].x;
	var dy = points[1].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.save();
	context.translate(center.x, center.y);
	context.rotate(angle + Math.PI/2);
	context.beginPath();
	var angle_step = 2/5*Math.PI; //5 pointed star
	for (var i=0; i<5; i++) {
		context.lineTo(0, r);
		context.rotate(angle_step/2);
		context.lineTo(0, r/2);
		context.rotate(angle_step/2);
	}
	context.closePath();
	context.fill();
	context.restore();
};
function drawDiamond(context, p1, p2) {
	var points = [p1, p2];
	var length = distance(points[0], points[1]);
	var dx = points[1].x - points[0].x;
	var dy = points[1].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.save();
	context.translate(points[0].x, points[0].y);
	context.rotate(angle);
	context.beginPath();
	context.lineTo(length/2, length/4);
	context.lineTo(length, 0);
	context.lineTo(length/2, -length/4);
	context.lineTo(0, 0);
	context.closePath();
	context.fill();
	context.restore();
	points = [];
	context.closePath();
	context.fill();
	context.restore();
};
function drawCrescent(context, p1, p2, p3) {
	var points = [p1, p2, p3];
	var centerPoint = {
		"x": (points[2].x + points[0].x)/2,
		"y": (points[2].y + points[0].y)/2
	};
	var radius = distance(points[0], points[2])/2;
	var dx = points[2].x - points[0].x;
	var dy = points[2].y - points[0].y;
	var angle = Math.atan2(dy,dx);
	context.save();
	context.translate(centerPoint.x, centerPoint.y);
	context.rotate(angle);
	//if p2.y is larger than the line p1p3 at point p2.x, flip moon
	var slope = (p3.y - p1.y)/(p3.x - p1.x);
	var yIntercept = p1.y - slope*p1.x;
	if (p2.y < slope*p2.x + yIntercept) {
		if (p3.x > p1.x) {
			context.scale(1, -1);
		}
	} else {
		if (p3.x < p1.x) {
			context.scale(1, -1);
		}
	}
	context.beginPath();
	context.arc(0, 0, radius, 0, Math.PI);
	var DEPTH = .65;
	var WIDTH = .65;
	context.bezierCurveTo(-WIDTH*radius, DEPTH*radius, WIDTH*radius, DEPTH*radius, radius, 0);
	context.fill();
	context.restore();
};
var drawShapes = {
	"circle": drawCircle,
	"ellipse": drawEllipse,
	"rectangle": drawRectangle,
	"triangle": drawTriangle,
	"square": drawSquare,
	"heart": drawHeart,
	"star": drawStar,
	"diamond": drawDiamond,
	"crescent": drawCrescent
};
export default drawShapes;
