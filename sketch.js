var score = 0;
var gameState = "play";
function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsBottom1Img = loadImage ("assets/obsBottom1.png");
obsBottom2Img = loadImage ("assets/obsBottom2.png");
obsBottom3Img = loadImage ("assets/obsBottom3.png");
obsTop1Img = loadImage ("assets/obsTop1.png");
obsTop2Img = loadImage("assets/obsTop2.png");
gameOverImage = loadImage("assets/gameOver.png");
restartImage = loadImage("assets/restart.png");
}

function setup(){
createCanvas(800,600);
bg = createSprite (400,300,800,600)
bg.addImage(bgImg);
ground1 = createSprite(400,590,800,20);
ground2 = createSprite(400,10,800,20);
balloon = createSprite (50,300,40,40);
balloon.addAnimation("lballoon", balloonImg);
balloon.scale = 0.3;
balloon.debug = true;
balloon.setCollider("rectangle", 0,0,100,200);
topObstacleGroup = new Group ();
bottomObstacleGroup = new Group ();
barGroup = new Group ();
gameOver = createSprite(400,250);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.5;
restart = createSprite(400,300);
restart.addImage(restartImage);
restart.scale = 0.5;
restart.visible = false;
gameOver.visible = false;



}

function draw() {
  
  background("black");
  drawSprites ();
  fill ("black");
  textSize(24);
  text("Score : "+score,650,50);
  if(gameState==="play"){
    if (keyDown("space") && balloon.y>30){
      balloon.velocityY = -5;
    }
    balloon.velocityY = balloon.velocityY+1;
    balloon.collide(ground1);
bottomObstacles();
    topObstacles();
    bars();
    if (balloon.isTouching(barGroup)){
      barGroup.destroyEach();
      score = score+5;
    }
    if(balloon.isTouching(topObstacleGroup) || balloon.isTouching(bottomObstacleGroup)){
gameState = "end";
    }
  }
  if(gameState ==="end"){
    balloon.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    topObstacleGroup.setVelocityXEach(0);
    bottomObstacleGroup.setVelocityXEach(0);
    bargroup.setVelocityXEach(0);
    barGroup.setLifetimeEach = -1;
    topObstacleGroup.setLifetimeEach(-1);
    bottomObstacleGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
       
       
}

function bottomObstacles() {
  if(frameCount%200 === 0){
    obs1 = createSprite(750,470,80,100);
    rand = Math.round(random(1,3));
    switch(rand){
      case 1 :  obs1.addImage ("o1", obsBottom1Img);
      break;
      case 2 :  obs1.addImage ("o2", obsBottom2Img);
break;
case 3 :  obs1.addImage ("o3", obsBottom3Img);
default : break 
    }

    obs1.velocityX = -3
    obs1.lifetime = 800;
    obs1.scale = 0.15;
    bottomObstacleGroup.add (obs1);
  }
}
function topObstacles(){
  if (frameCount%100===0){
    obs2 = createSprite(750,70,80,100);
r = Math.round(random(1,2));
switch(r){
  case 1 : obs2.addImage("ob1", obsTop1Img);
  break;
  case 2 : obs2.addImage("ob2", obsTop2Img);
  default : break;
}
obs2.velocityX = -3;
obs2.lifetime = 800;
obs2.scale = 0.15;
topObstacleGroup.add(obs2);
  }
}

function bars(){
  if(frameCount%60===0){
    bar = createSprite(400,200,10,800);
    bar.velocityX= -6;
    bar.lifetime = 100;
    barGroup.add(bar);
    bar.visible = false;
    
  }
}

function reset(){
  gameState = "play"
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  barGroup.destroyEach();
  topObstacleGroup.destroyEach();
  bottomObstacleGroup.destroyEach();
}