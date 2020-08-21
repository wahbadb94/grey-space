//var cc = require('ccapture.js');

let xRotation = 0;
let locations = Array<I3DPoint>();
let thetaY = 0;
let thetaX = 0;
let boxWidth: number;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER).noStroke().frameRate(60);
  locations = initPoints(width/80);;
}

function draw() {

  ambientMaterial(255);
  background(12);
  orbitControl();


  let dthetaY = map(mouseX, 0, width, -0.007, 0.007);
  let dthetaX = map(mouseY, 0, height, 0.007, -0.007);
  let Zoffset = (width/4)*sin(frameCount/100);

  pointLight(255, 255, 255, 0 , 0,0);
  ambientLight(20);


  locations.forEach( p => {
    push();
    rotateY(thetaY);
    rotateX(thetaX);
    translate(0, 0, Zoffset);
    translate(p.x, p.y, p.z);
    boxWidth =  width/30*sin(frameCount/50 + p.x/300 + p.y/300 - p.z/300) + 1;
    box(boxWidth/2);
    pop();
  });

  thetaX += dthetaX;
  thetaY += dthetaY;
}

function initPoints(numPoints1D: number): Array<I3DPoint> {
  let points = new Array<I3DPoint>();
  let xSpacing = width/numPoints1D;
  for (let x=-4*width/5; x<4*width/5; x+=xSpacing)
  {
    for (let y=-4*height/5; y<4*height/5; y+=xSpacing)
    {
      for (let z = width; z>-width; z-= xSpacing) {
        points.push(new Point3(x, y, z));
      }
    }
  }

  return points;
}

function distance(p: Point3) : number {
  return sqrt( pow(p.x,2) + pow(p.y,2) + pow(p.z,2) );
}


