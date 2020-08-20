let circles: Array<PolarCircle>;

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
  translate(width/2, height/2);
  
  circles.forEach( c => {
    c.draw();
    c.update();
  });
}

function distance(a: IPoint, b: IPoint) : number {
  let dx = b.x-a.x;
  let dy = b.y - b.x;
  
  return sqrt( pow(dx, 2) + pow(dy, 2) );
}

function generateCircles() : PolarCircle[] {
  let output: Array<PolarCircle> = new Array<PolarCircle>();;

  let origin = new PolarCircle(0, 0, 1);
  output.push(origin);

  let rSpacing: number = 50;
  for (let r = rSpacing; r < width/2; r+=rSpacing){
    for(let theta=0; theta < 2*PI; theta += PI/12) {
      let c = new PolarCircle(r, theta, 20);
      output.push(c);
    }
  }

  return output;
}

