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
  colour: "rgb(0,0,0)" // Helicopter Colour (black)
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
ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height); //Creates the Helicopter on the canvas
document.getElementById("myBtn").addEventListener("click", play); // Adds an event listener to the html button with id = "myBtn" that then calls the play() funtion
}// End of start() function

start(); // Call the start() function to start everything off

//The play() function changes the game from stop to play, calls the start function to reset everything, and calls the init function and the canvas to refresh
function play() {
    if(game == "stop") { //Chacks if the game is set to "stop"
      start(); // Calls the start() function to reset all variables
      window.requestAnimationFrame(init, canvas); // Requests the init() function to start and refreshes the canvas
      game = "play"; // Sets the game to "play"
    }// End of if statement
}// End of play() function

// The stop() function changes the game to "stop" and triggers a Javascript alert letting the player know the game is over
function stop() {
    game = "stop"; // Changes the game to "stop"
    alert("YOU LOSE, GAME OVER!! \nPress Start to try again!", 100, 50); // Generates a Javascript alert to to tell the player the game is over
}// End of stop() function

// The init() function calls all the methods to initialise the game 
function init(){
  if(game == "play"){ // Checks if the game is set to "play"
    ctx.clearRect(0, 0, 600, 500); // Clears the canvas
    repeatme(); // Calls the repeatme() function
    moveObstacles(); // Calls the moveObstacles() function
    collision(); // Calls the collision function
    window.requestAnimationFrame(init,canvas);// Requests the init() function and refreshes the canvas
  }// End of if statement
}// End of init() function

// The repeatme() function draws the helicopter on the canvas, adds velocity to the heliY coordinate, calls the score function to get the playerScore value and adds it to the score label on the html. Also calls the collision() function to check for any collisions
function repeatme() { 
  ctx.beginPath();// Begins the path
  ctx.fillStyle = helicopter.colour; // Makes the helicopter black
  ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);// Draw the helicopter on the canvas

  heliY += velocity; // Increase the heliY value by the velocity value
  score(); // Call the score function
  document.getElementById("playerScore").value = playerScore; // Output the playerScore to the html label
  collision(); // Call the collision() function to check for collisions
} // End of repeatme() function

// The moveObstacle() function populates the obstacleArray, removes obstacle if its off the canvas, adds velocity to the obstacle and then draws it on the canvas. Based on the obstacleInterval value, if enough distance has elasped from the last generated obstacle, then another obstacle is created
function moveObstacles() {
  obstacleCount++; // Adds 1 to the obstacleCount
  for(var i=0; i<obstacleArray.length; i++) { // For loop to check if i is less than the lenght of the obstacleArray, adds 1 to i
    if(obstacleArray[i].x < 0-obstacle.width) { // Chacks if the obstacle is outside the canvas
      obstacleArray.splice(i, 1); // Remove the obstacle if it is outside the canvas
    } // End of if statement
    else { // Else if the obstacle is not outside the canvas, add (-)obstacle.velocity to the next obstacle
      obstacleArray[i].x = obstacleArray[i].x - obstacle.velocity; // add (-)obstacle.velocity to the next obstacle
      ctx.fillStyle = obstacle.colour; // Make the obstacle colour = obstacle.colour (dark red)
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
  
  if((heliY <= 0) || (heliY > (canvas.height-helicopter.height)))      {
    stop();
    }
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