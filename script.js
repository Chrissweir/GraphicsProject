// Gets a handle to the element with id canvas.
var canvas = document.getElementById("canvas");
// Set the canvas up for drawing in 2D.
var ctx = canvas.getContext("2d");

//Global variables
var keyUp = 0;
var obstacleInterval = 50; // difficulty level 
var heliX;
var heliY;
var game;
var obstacleCount;
var obstacleArray;
var playerScore;
var scrollVal;
var ascentRate;
var descentRate;
var intervalId;

//Helicopter object
var helicopter = {
x: 100,
y: 135,
width: 40,
height: 30,
acceleration: 0.10,
image: "helicopter.png"
}
//Obstacle object
var obstacle = {
height: 60,
width: 30,
colour: "rgb(0,0,255)",
velocity: 6,
interval: 50
}

var physics = {
ascendRate: 1,
descendRate: 1.5,
climbRate: 0.5,
maxVelocity: 3,
gravity: 0.8
}

var background ={
width: 600,
height: 350,
velocity: 2,
colour: "rgb(211,211,211)",
image: "background.png"
}


// A function to repeat every time the animation loops
window.onload = function () { start(); }

function start(){
game ="stop";
ctx.clearRect(0, 0, 600, 500);
obstacleArray = new Array();

heliX = helicopter.x;
heliY = helicopter.y;

velocity = physics.maxVelocity;
obstacleCount = 0;
playerScore = 0;
scrollVal = 0;
  
addObstacle();
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

document.getElementById("myBtn").addEventListener("click", play);
//repeatme();
}

function play() {
    if(game == "stop") {
      start();
        intervalId = window.requestAnimationFrame(init, canvas);
        game = "play";
    }
}

function stop() {
    game = "stop";
    alert("YOU LOSE, GAME OVER!!", 240, 80);
}

function init(){
  if(game == "play"){
    ctx.clearRect(0, 0, 600, 500);
    repeatme();
    moveObstacles();
    collision();
    window.requestAnimationFrame(init,canvas);
    
  }
}

function repeatme() {
ctx.beginPath();
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

heliY += velocity;
playerScore=playerScore+1;
document.getElementById("playerScore").value = playerScore;
if((heliY <= 0) || (heliY > (canvas.height-helicopter.height)))      {
    stop();
    }
}

function moveObstacles() {
  obstacleCount++;
  for(var i=0; i<obstacleArray.length; i++) {
    if(obstacleArray[i].x < 0-obstacle.width) {
      obstacleArray.splice(i, 1); // remove the brick that's outside the canvas
    } 
    else {
      obstacleArray[i].x = obstacleArray[i].x - obstacle.velocity
      ctx.fillStyle = obstacle.colour;
      ctx.fillRect(obstacleArray[i].x, obstacleArray[i].y, obstacle.width, obstacle.height);

      // If enough distance (based on obstacleInterval) has elapsed since 
      // the last obstacle was created, create another one
      if(obstacleCount >= obstacleInterval) {
        addObstacle();
        obstacleCount = 0;
      }
    }
  }
}

function addObstacle() {
newObstacle = {} 
newObstacle.x = canvas.width;
newObstacle.y = Math.floor(Math.random() * (canvas.height-obstacle.height))
obstacleArray.push(newObstacle);
}

function collision() {
    for(var i=0; i<obstacleArray.length; i++) {
        if (heliX < (obstacleArray[i].x + obstacle.width) && (heliX + helicopter.width) > obstacleArray[i].x
                    && heliY < (obstacleArray[i].y + obstacle.height) && (heliY + helicopter.height) > obstacleArray[i].y ) {
            stop();
        }
    }
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 38:
            velocity = -3;
            break;
        case 40:
            velocity = 3;
            break;
    }
};