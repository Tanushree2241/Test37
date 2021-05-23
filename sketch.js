const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine , world;
var snows = [];
var boy1 , boy1Img , girl1 , girl1Img , snowBall , snowBallImg;
var slingShot;
var boy_options={
  isStatic : true
}
var girl_options={
  isStatic : true
}
var snowBall_options={
  isStatic : true
}

function preload() {
  backgroundImg = loadImage("snow2.png");
  boy1Img  = loadImage("boy.png");
  girl1Img = loadImage("girl.png");
  snowBallImg = loadImage("snowBall.png");
}


function setup() {
  var canvas = createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  boy1 = Bodies.rectangle(700,300,50,50,boy_options);
  World.add(world,boy1);

  girl1 = Bodies.rectangle(200,300,50,50,girl_options);
  World.add(world,girl1); 

  snowBall = Bodies.rectangle(150,280,20,20,snowBall_options);
  World.add(world,snowBall);
  
  slingShot = new SlingShot(this.snowBall,{x:150,y:280});
}

function draw() {
  //background(255,255,255);  
  background(backgroundImg);
  Engine.update(engine);

  if(frameCount%25===0) {
    snows.push(new snow(random(5,655),10,10));
 }

 for (var l = 0; l < snows.length; l++) {
  snows[l].display();
}

imageMode(CENTER)
image(boy1Img ,boy1.position.x , boy1.position.y,200,200);

imageMode(CENTER)
image(girl1Img ,girl1.position.x , girl1.position.y,100,200);

imageMode(CENTER)
image(snowBallImg ,snowBall.position.x , snowBall.position.y,40,30);

slingShot.display();
  drawSprites();
  fill("black");
  textSize(20);
  text("Press Space To Get Snow Back" , 250,50);
}

function mouseDragged(){
  Matter.Body.setPosition(this.snowBall,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  slingShot.fly();
}

function keyPressed(){

if(keyCode === 32) {
  Matter.Body.setPosition(this.snowBall,{x:150 , y:280});
  slingShot.attach(this.snowBall);
}
}