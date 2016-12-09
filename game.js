var leafStill, leftWalk;

var x = 25,
    y = 40;
var WIDTH = 1000,
    HEIGHT = 500;
var leaf;

function preload() {
    leafStill = loadImage("assets/leaf-sprite.png"); // 8:5
    leftWalk = loadAnimation("assets/leaf-forward-left.png", "assets/leaf-forward-right.png");
    moveRight = loadAnimation("assets/leaf-move-right.png", "assets/leaf-sprite.png");
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    leaf = createSprite(x, y);
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
    if (keyIsDown(LEFT_ARROW) && !(leaf.position.x - 25 <= 0)) {
        leaf.velocity.x = -4;
        leaf.mirrorX(1);
        leaf.changeAnimation("moveRight");
    } else if (keyIsDown(RIGHT_ARROW) && !(leaf.position.x + 25 >= WIDTH)) {
        leaf.velocity.x = 4;
        leaf.mirrorX(-1);
        leaf.changeAnimation("moveRight");
    } else if (keyIsDown(DOWN_ARROW) && !(leaf.position.y + 40 >= HEIGHT)) {
        leaf.velocity.y = 4;
        leaf.mirrorX(1);
        leaf.changeAnimation("walking");
    } else if (keyIsDown(UP_ARROW) && !(leaf.position.y - 40 <= 0)) {
        leaf.velocity.y = -4;
        leaf.mirrorX(-1);
        leaf.changeAnimation("walking");
    } else {
        leaf.mirrorX(1);
        leaf.changeAnimation("still");
        leaf.velocity.x = 0;
        leaf.velocity.y = 0;
    }
    drawSprites();
}

/*
image(leafSprite, x, y, 50, 80);
if(keyIsDown(LEFT_ARROW)){
  if(!(x <= 0))
    x -= 4;
} else if (keyIsDown(RIGHT_ARROW)){
  if(!(x + 50 >= WIDTH))
    x += 4;
} else if(keyIsDown(DOWN_ARROW)){
  y += 4;
} else if (keyIsDown(UP_ARROW)){
  y -= 4;
}
*/
