class Circle implements IPoint{
  x: number;
  y: number;
  diameter: number;

  constructor(x: number, y: number, diameter: number) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
  }

  draw() {
    ellipse(this.x, this.y, this.diameter);
  }
}

class PolarCircle implements IPoint{
    r: number;
    theta: number;
    diameter: number;
    private _y : number
    private _x : number;

    public get x() : number {
        return this.r*cos(this.theta);
    }

    public get y() : number {
        return this.r*sin(this.theta)*(-1);
    }
    
  
    constructor(r: number, theta: number, diameter: number) {
      this.r = r;
      this.theta = theta;
      this.diameter = diameter;
    }
  
    draw() {
      let fillColor = map(this.diameter, 0, this.r/4, 255, 20);
      fill(fillColor);
      ellipse(this.x, this.y, this.diameter);
    }

    update() {
        this.diameter = (this.r/4)*sin(frameCount/100 + this.r/2) + 1;
        this.theta += this.diameter/10000;
    }
  }
