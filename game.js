var leafStill, leftWalk;
var recyclingStockingImage, trashStockingImage;

var chimneyUp;
var snowLeft, snowRight;
var recyclingStocking, trashStocking;

var WIDTH = 1000,
    HEIGHT = 500;

var score = 0;

var STOCKING_TOP = 150;

var leaf_width = 50;
var leaf_height = 80;

var leaf;
var recyclables = [];
var NUM_RECYCLABLES = 10;
var inventory = null;
var gameOver = false;
var leaderboard;
var startTime;

function preload() {
    leafStill = loadImage("assets/leaf-sprite.png"); // 8:5
    leftWalk = loadAnimation("assets/leaf-forward-left.png", "assets/leaf-forward-right.png");
    moveRight = loadAnimation("assets/leaf-move-right.png", "assets/leaf-sprite.png");
    recyclingStockingImage = loadImage("assets/recycling_stocking.png");
    trashStockingImage = loadImage("assets/trash_stocking.png");
}

function setup() {
    alert("Press 'd' to drop items into the correct stocking!");
    createCanvas(WIDTH, HEIGHT);
    leaderboard = new Leaderboard("Top 10", 10);
    // chimneyUp = createSprite(WIDTH / 2, HEIGHT / 2, chimney_width, HEIGHT);
    // chimneyUp.shapeColor = color(132, 31, 39);
    snowLeft = createSprite(WIDTH / 6, HEIGHT / 2 - 75 + 160, HEIGHT - 150, WIDTH / 3);
    snowLeft.shapeColor = color(255);
    snowRight = createSprite(WIDTH - WIDTH / 6, HEIGHT / 2 - 75 + 160, HEIGHT - 150, WIDTH / 3);
    snowRight.shapeColor = color(255);
    recyclingStocking = createSprite(WIDTH - WIDTH / 6 + 75, HEIGHT / 2 - 75 + 310);
    recyclingStocking.addImage(recyclingStockingImage);
    trashStocking = createSprite(WIDTH / 6 - 75, HEIGHT / 2 - 75 + 310);
    trashStocking.addImage(trashStockingImage);
    for (var i = 0; i < NUM_RECYCLABLES; i++) {
        var sprite = createSprite(random(10, WIDTH - 10), random(10, HEIGHT - 10), 10, 10);
        if (sprite.overlap(snowRight) || sprite.overlap(snowLeft)) {
            i--;
            sprite.remove();
        } else {
            if (round(random()) == 1) {
                sprite.shapeColor = color(0, 255, 0);
                recyclables.push([true, sprite]);

            } else {
                sprite.shapeColor = color(0, 0, 255);
                recyclables.push([false, sprite]);

            }
        }
    }
    leaf = createSprite(WIDTH / 2, HEIGHT - leaf_height);
    leaf.addImage("still", leafStill);
    leaf.addAnimation("walking", leftWalk);
    leaf.addAnimation("moveRight", moveRight);
    leaf.changeAnimation("walking");
    startTime = new Date();
}

function draw() {
    if (!gameOver) {
        background(255);
        noStroke();
        fill(132, 31, 39);
        rect(0, 0, WIDTH, HEIGHT);
        camera.zoom = 1;
        camera.position.x = leaf.position.x;
        camera.position.y = leaf.position.y;
        handleLeafMovement();
        displayInventory();
        drawSprites();
        drawScore();
        if (recyclables.length == 0) {
            gameOver = true;
            var name = prompt("What is your name?");
            var s = {
              score: score,
              name: name,
              time: (new Date() - startTime)/1000
            };
            leaderboard.add(s);
            leaderboard.save();
            alert("You scored: " + score);
            location.reload();
        }
        camera.off();
    }
}

function displayInventory() {
    if (inventory == null) return;
    inventory[1].position.x = leaf.position.x + leaf_width / 2;
    inventory[1].position.y = leaf.position.y + 12;
    inventory[1].depth = 100;
}

function keyPressed() {
    if (keyCode == 68) {
        if (inventory != null) {
            inventory[1].position.y = leaf.position.y + leaf_height;
            if (inventory[1].position.y > HEIGHT)
                inventory[1].position.y = HEIGHT;
            inventory[1].depth = 2;
            if (inventory[1].overlap(trashStocking)) {
                if (inventory[0]) {
                    score++;
                } else {
                    score--;
                }
                recyclables.splice(recyclables.indexOf(inventory), 1);
            } else if (inventory[1].overlap(recyclingStocking)) {
                if (inventory[0]) {
                    score--;
                } else {
                    score++;
                }
                recyclables.splice(recyclables.indexOf(inventory), 1);
            }
            inventory = null;
        }
    }
}

function handleLeafMovement() {
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

    leaf.collide(snowRight);
    leaf.collide(snowLeft);

    if (leaf.position.x < leaf_width / 2)
        leaf.position.x = leaf_width / 2;
    if (leaf.position.y < leaf_height / 2)
        leaf.position.y = leaf_height / 2;
    if (leaf.position.x > WIDTH - leaf_width / 2)
        leaf.position.x = WIDTH - leaf_width / 2;
    if (leaf.position.y > HEIGHT - leaf_height / 2)
        leaf.position.y = HEIGHT - leaf_height / 2;

    if (inventory == null) {
        for (var i = 0; i < recyclables.length; i++) {
            if (leaf.overlap(recyclables[i][1])) {
                inventory = recyclables[i];
            }
        }
    }

}

function drawScore() {
    fill(0);
    text(score, leaf.position.x - 5, leaf.position.y - leaf_width / 2 - 30);
}
