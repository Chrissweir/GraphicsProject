// Gets a handle to the element with id canvas.
var canvas = document.getElementById("canvas");
// Set the canvas up for drawing in 2D.
var ctx = canvas.getContext("2d");

//Global variables
var obstacleInterval = 50; // Difficulty level, space between Obstacles
var maxVelocity = 3; // var velocity takes in this Constant Value

var heliX; // Takes in takes in constant Helicopter X Coordinate
var heliY; // Takes in takes in constant Helicopter Y Coordinate
var game; // Sets the state of game (Play or Stop)
var obstacleCount; // Count for the Obstacles
var obstacleArray; // Array of Obstacles
var playerScore; // Record the player score

//Helicopter object
var helicopter = {
  x: 100, // Helicopter X Coordinate
  y: 135, // Helicopter Y Coordinate
  width: 37, // Helicopter Width
  height: 27, // Helicopter Height
  colour: "rgb(0,0,0)" // Helicopter Colour
};

//Obstacle object
var obstacle = {
  height: 60, // Obstacle Height
  width: 30, //Obstacle Width
  colour: "rgb(96,0,0)", // Obstacle Colour
  velocity: 6 // Obstacle velocity (Speed)
};

// Start function is the first function to be called. It initially sets all the necessary variables to their required state. Then when the user clicks the "Start" button the play() function is called.
function start() {

game = "stop"; // Sets the game value to "stop"
ctx.clearRect(0, 0, 600, 500); // Clear the canvas
obstacleArray = new Array(); // Sets the obstaclArray as a new array

heliX = helicopter.x; // heliX takes in the Constant helicopter.x value
heliY = helicopter.y; // heliX takes in the Constant helicopter.y value

velocity = maxVelocity; // velocity takes in Constant maxVelocity value
obstacleCount = 0; // obstacleCount is set back to 0
playerScore = 0; // playerScore is set back to 0
obstacleInterval = 50; // obstacleInterval is set to 50
  
addObstacle(); // Calls the addObstacle method
ctx.fillStyle = helicopter.colour; // Makes the helicopter colour black
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

document.getElementById("myBtn").addEventListener("click", play);
//repeatme();
}
start();

function play() {
    if(game == "stop") {
      start();
      window.requestAnimationFrame(init, canvas);
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
  ctx.fillStyle = helicopter.colour;

ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);

heliY += velocity;
score();
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

function score(){
  playerScore=playerScore+1;
if(playerScore > 1500){
 obstacleInterval = 35; 
}else if(playerScore > 2500){
 obstacleInterval = 25; 
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