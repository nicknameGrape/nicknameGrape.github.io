# js_modules

## HatDraw.mjs:
javascript Constructor with 1 argument, an array.
Usage:
```
var hd = new HatDraw(arr);
var choice = hd.drawOne();
```

## Loader.mjs:
javascript Constructor with 1 optional argument, the default path to look for the source files
Usage:
```
var loader = new Loader("path/to/images/");  //Don't forget trailing slash in path
var myImage = loader.newImageAsset("apple.jpg");
```

## fitImage.mjs
javascript function with 2 arguments, a "2d canvas context" and an image
It will draw the image on the canvas as large as possible while keeping the image aspect ratio.
Usage:
```
fitImage(context, myImage);
fitImage(context, myImage, x, y, w, h);
fitImage(context, myImage, subx, suby, subw, subh, x, y, w, h);
```

## fitText.mjs
javascript function with 2 arguments, a "2d canvas context" and a string
It will draw the text on the canvas as large as possible.
Usage:
```
fitText(context, "Large Text");
fitText(context, "Large Text", x, y, w, h);
fitText(context, "Large Text", x, y, w, h, padding); //padding is a float between 0 and 1, defaults to .1
```

## shuffle.mjs
javascript function with 1 argument, an array
It shuffles the array in place.
Usage:
```
var myArray = [1, 2, 3, 4, 5];
shuffle(myArray);
```

## drawShapes.mjs
javascript object with methods to draw various shapes using control points
Usage:
```
drawShapes.drawTriangle(context, {x: 5, y: 0}, {x: 0, y: 10}, {x: 10, y: 10})
```
