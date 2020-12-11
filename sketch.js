var ghostimg
var doorimg
var climberimg, towerimg
var gamestate = "play"

function preload() {
  ghostimg = loadImage("ghost-jumping.png")
  doorimg = loadImage("door.png")
  climberimg = loadImage("climber.png")
  towerimg = loadImage("tower.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300, 600, 600)
  tower.addImage(towerimg)

  ghost = createSprite(300, 300)
  ghost.addImage(ghostimg)
  ghost.scale = 0.3;
  
  climberGroup = new Group ()
  doorGroup = new Group ()
  
}

function draw() {
  background(0)
  if (gamestate === "play") {
    tower.velocityY = 2
    if (tower.y > 600) {
      tower.y = 300
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 2;
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 2;
    }

    if (keyDown("space")) {
      ghost.velocityY = -8
    }
    ghost.velocityY = ghost.velocityY + 0.5
    spawnDoors()
    
    if (climberGroup.isTouching(ghost)||ghost.y>=600) {
      gamestate = "end"
    }
     drawSprites();
  }
   
if (gamestate === "end"){ stroke("yellow"); fill("yellow"); textSize(30); text("Game Over", 230,250) }


}

function spawnDoors() {
  if (frameCount % 60 === 0) {
    door = createSprite(Math.round(random(100, 500)), 0)
    door.addImage(doorimg)
    door.velocityY = 2
    var climber = createSprite(200, 60);
    climber.addImage(climberimg)
    climber.x = door.x;
    climber.velocityY = 2
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorGroup.add(door); climberGroup.add(climber);
  }
}