// Gets a handle to the element with id canvas.
var canvas = document.getElementById("canvas");
// Set the canvas up for drawing in 2D.
var ctx = canvas.getContext("2d");

//Global variables
var keyUp = 0;
var obstacleInterval = 40; // difficulty level 
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
y: 150,
width: 40,
height: 30,
acceleration: 0.10,
image: "helicopter.png"
}
//Obstacle object
var obstacle = {
height: 50,
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
ctx.clearRect(0, 0, canvas.width, canvas.height);
obstacleArray = new Array();

heliX = helicopter.x;
heliY = helicopter.y;

velocity = physics.maxVelocity;
obstacleCount = 0;
playerScore = 0;
scrollVal = 0;
  
addObstacle();
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

//document.getElementById("myBtn").addEventListener("click", repeatme);
//repeatme();
}

function play() {
    if(game == "stop") {
        intervalId = window.requestAnimationFrame(repeatme, canvas);
        gameState = "play";
    }
}

function stop() {
    game = "stop";
}

function repeatme() {
ctx.clearRect(0, 0, canvas.height, canvas.width); 

// Draw the ball (stroked, not filled).
ctx.beginPath();
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

moveObstacles();

heliY += velocity;
window.addEventListener("keypress", function(e) { 

if (e.keyCode === 32) {
velocity = -velocity;
}
});

if( (heliY <= 0) || (heliY > (canvas.height-helicopter.height)) ) {
start();
}
window.requestAnimationFrame(repeatme);
}

function moveObstacles() {
  obstacleCount++;
  for(var i=0; i<obstacleArray.length; i++) {
    if(obstacleArray[i].x < 0-obstacle.width) {
      obstacleArray.splice(i, 1); // remove the brick that's outside the canvas
    } 
    else {
      obstacleArray[i].x = obstacleArray[i].x - obstacle.velocity
      ctx.fillStyle = obstacle.colour
      ctx.fillRect(obstacleArray[i].x, obstacleArray[i].y, obstacle.width, obstacle.height)

      // If enough distance (based on obstacleInterval) has elapsed since 
      // the last obstacle was created, create another one
      if(obstacleCount >= obstacleInterval) {
        addObstacle();
        obstacleCount = 0;
        playerScore=playerScore+5;
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
