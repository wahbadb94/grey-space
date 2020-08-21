var Point2 = (function () {
    function Point2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2;
}());
var Point3 = (function () {
    function Point3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point3;
}());
var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var xRotation = 0;
var locations = Array();
var thetaY = 0;
var thetaX = 0;
var boxWidth;
function setup() {
    createCanvas(600, 600, WEBGL);
    rectMode(CENTER).noStroke().frameRate(60);
    locations = initPoints(width / 80);
    ;
}
function draw() {
    ambientMaterial(255);
    background(12);
    orbitControl();
    var dthetaY = map(mouseX, 0, width, -0.007, 0.007);
    var dthetaX = map(mouseY, 0, height, 0.007, -0.007);
    var Zoffset = (width / 4) * sin(frameCount / 100);
    pointLight(255, 255, 255, 0, 0, 0);
    ambientLight(20);
    locations.forEach(function (p) {
        push();
        rotateY(thetaY);
        rotateX(thetaX);
        translate(0, 0, Zoffset);
        translate(p.x, p.y, p.z);
        boxWidth = width / 30 * sin(frameCount / 50 + p.x / 300 + p.y / 300 - p.z / 300) + 1;
        box(boxWidth / 2);
        pop();
    });
    thetaX += dthetaX;
    thetaY += dthetaY;
}
function initPoints(numPoints1D) {
    var points = new Array();
    var xSpacing = width / numPoints1D;
    for (var x = -4 * width / 5; x < 4 * width / 5; x += xSpacing) {
        for (var y = -4 * height / 5; y < 4 * height / 5; y += xSpacing) {
            for (var z = width; z > -width; z -= xSpacing) {
                points.push(new Point3(x, y, z));
            }
        }
    }
    return points;
}
function distance(p) {
    return sqrt(pow(p.x, 2) + pow(p.y, 2) + pow(p.z, 2));
}
//# sourceMappingURL=../sketch/sketch/build.js.map