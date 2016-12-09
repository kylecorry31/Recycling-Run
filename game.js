var leafStill, leftWalk;

var chimneyUp;

var WIDTH = 1000,
    HEIGHT = 500;

var STOCKING_TOP = 150;
var chimney_width = 200;

var leaf_width = 50;
var leaf_height = 80;

var leaf;

function preload() {
    leafStill = loadImage("assets/leaf-sprite.png"); // 8:5
    leftWalk = loadAnimation("assets/leaf-forward-left.png", "assets/leaf-forward-right.png");
    moveRight = loadAnimation("assets/leaf-move-right.png", "assets/leaf-sprite.png");
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    chimneyUp = createSprite(WIDTH / 2, HEIGHT / 2, chimney_width, HEIGHT);
    chimneyUp.shapeColor = color(132, 31, 39);
    leaf = createSprite(WIDTH / 2, HEIGHT - leaf_height);
    leaf.addImage("still", leafStill);
    leaf.addAnimation("walking", leftWalk);
    leaf.addAnimation("moveRight", moveRight);
    leaf.changeAnimation("walking");
}

function draw() {
    background(255);
    fill(255);
    stroke(0);
    strokeWeight(4);
    rect(0, 0, WIDTH, HEIGHT);
    camera.zoom = 1;
    camera.position.x = leaf.position.x;
    camera.position.y = leaf.position.y;
    handleLeafMovement();
    drawSprites();
    camera.off();
}

function handleLeafMovement(){
  if (keyIsDown(LEFT_ARROW)) {
      leaf.velocity.x = -4;
      leaf.mirrorX(1);
      leaf.changeAnimation("moveRight");
  } else if (keyIsDown(RIGHT_ARROW)) {
      leaf.velocity.x = 4;
      leaf.mirrorX(-1);
      leaf.changeAnimation("moveRight");
  } else if (keyIsDown(DOWN_ARROW)) {
      leaf.velocity.y = 4;
      leaf.mirrorX(1);
      leaf.changeAnimation("walking");
  } else if (keyIsDown(UP_ARROW)) {
      leaf.velocity.y = -4;
      leaf.mirrorX(-1);
      leaf.changeAnimation("walking");
  } else {
      leaf.mirrorX(1);
      leaf.changeAnimation("still");
      leaf.velocity.x = 0;
      leaf.velocity.y = 0;
  }

  if(leaf.position.y > STOCKING_TOP && leaf.position.x - leaf_width / 2 < chimneyUp.position.x - chimney_width / 2){
    leaf.position.x = chimneyUp.position.x - chimney_width / 2 + leaf_width / 2;
  }

  if(leaf.position.y > STOCKING_TOP && leaf.position.x + leaf_width / 2 > chimneyUp.position.x + chimney_width / 2){
    leaf.position.x = chimneyUp.position.x + chimney_width / 2 - leaf_width / 2;
  }

  if(leaf.position.x < leaf_width / 2)
    leaf.position.x = leaf_width / 2;
  if(leaf.position.y < leaf_height / 2)
    leaf.position.y = leaf_height / 2;
  if(leaf.position.x > WIDTH - leaf_width / 2)
    leaf.position.x = WIDTH - leaf_width / 2;
  if(leaf.position.y > HEIGHT - leaf_height / 2)
    leaf.position.y = HEIGHT - leaf_height / 2;

}
