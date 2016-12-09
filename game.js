var leafSprite;

var x = 0, y = 0;

function preload(){
  leafSprite = loadImage("leaf-sprite.svg"); // 8:5
}

function setup() {
  createCanvas(1000, 500);
}

function draw() {
  fill(255);
  background(255);
  image(leafSprite, x, y, 50, 80);
  if(keyIsDown(LEFT_ARROW)){
    x -= 4;
  } else if (keyIsDown(RIGHT_ARROW)){
    x += 4;
  } else if(keyIsDown(DOWN_ARROW)){
    y += 4;
  } else if (keyIsDown(UP_ARROW)){
    y -= 4;
  }
}

function keyPressed() {
  if(keyCode == LEFT_ARROW){
    x -= 4;
  } else if (keyCode == RIGHT_ARROW){
    x += 4;
  } else if(keyCode == DOWN_ARROW){
    y += 4;
  } else if (keyCode == UP_ARROW){
    y -= 4;
  }
}
