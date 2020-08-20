var Circle = (function () {
    function Circle(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
    }
    Circle.prototype.draw = function () {
        ellipse(this.x, this.y, this.diameter);
    };
    return Circle;
}());
var PolarCircle = (function () {
    function PolarCircle(r, theta, diameter) {
        this.r = r;
        this.theta = theta;
        this.diameter = diameter;
    }
    Object.defineProperty(PolarCircle.prototype, "x", {
        get: function () {
            return this.r * cos(this.theta);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PolarCircle.prototype, "y", {
        get: function () {
            return this.r * sin(this.theta) * (-1);
        },
        enumerable: true,
        configurable: true
    });
    PolarCircle.prototype.draw = function () {
        var fillColor = map(this.diameter, 0, this.r / 4, 255, 20);
        fill(fillColor);
        ellipse(this.x, this.y, this.diameter);
    };
    PolarCircle.prototype.update = function () {
        this.diameter = (this.r / 4) * sin(frameCount / 100 + this.r / 2) + 1;
        this.theta += this.diameter / 10000;
    };
    return PolarCircle;
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
var circles;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noStroke().frameRate(60);
    circles = generateCircles();
}
function windowResized() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    fill(127);
    translate(width / 2, height / 2);
    circles.forEach(function (c) {
        c.draw();
        c.update();
    });
}
function distance(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - b.x;
    return sqrt(pow(dx, 2) + pow(dy, 2));
}
function generateCircles() {
    var output = new Array();
    ;
    var origin = new PolarCircle(0, 0, 1);
    output.push(origin);
    var rSpacing = 50;
    for (var r = rSpacing; r < width / 2; r += rSpacing) {
        for (var theta = 0; theta < 2 * PI; theta += PI / 12) {
            var c = new PolarCircle(r, theta, 20);
            output.push(c);
        }
    }
    return output;
}
//# sourceMappingURL=../sketch/sketch/build.js.map