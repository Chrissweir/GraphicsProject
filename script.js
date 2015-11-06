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
  if(game == "play") { // Checks if the game is set to "play"
    ctx.clearRect(0, 0, 600, 500); // Clears the canvas
    repeatme(); // Calls the repeatme() function
    moveObstacles(); // Calls the moveObstacles() function
    collision(); // Calls the collision function
    window.requestAnimationFrame(init,canvas);// Requests the init() function and refreshes the canvas
  }// End of if statement
}// End of init() function

// The repeatme() function draws the helicopter on the canvas, adds velocity to the heliY coordinate, calls the score function to get the playerScore value and adds it to the score label on the html. Also checks for any collisions
function repeatme() { 
  ctx.beginPath();// Begins the path
  ctx.fillStyle = helicopter.colour; // Makes the helicopter black
  ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);// Draw the helicopter on the canvas

  heliY += velocity; // Increase the heliY value by the velocity value
  score(); // Call the score function
  document.getElementById("playerScore").value = playerScore; // Output the playerScore to the html label
  if((heliY <= 0) || (heliY > (canvas.height-helicopter.height))) { // Checks to see if the helicopter has collided with the canvas walls
    stop();
  }
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
      ctx.fillRect(obstacleArray[i].x, obstacleArray[i].y, obstacle.width, obstacle.height); // Draw the next obstacle on the canvas
      if(obstacleCount >= obstacleInterval) { // Checks if the obstacleCount is greater or equal to the obstacleInterval
        addObstacle(); // Calls the addObstacle() function to create a new obstacle if obstacleCount has reached obstacleInterval
        obstacleCount = 0; // Resets the obstacleCount back to 0
      } // End of if statement
    } //End of else statement
  } // End of for loop
} //End of moveObstacle() function

// The function addObstacles() generate a new obstacle object, gives it an X and Y coordinate and pushes it to the obstacleArray
function addObstacle() {
  newObstacle = {} // Create the newObstacle object
  newObstacle.x = canvas.width; // Sets the obstacle X coordinate to the canvas width coordinate
  newObstacle.y = Math.floor(Math.random() * (canvas.height-obstacle.height)) // Sets the Y coordinate to a random value within the canvas 
  obstacleArray.push(newObstacle); // Push the newObstacle to the obstacleArray
} // End of addObstacle() function

// The collision() function checks if the helicopter collides with the obstacles
function collision() {
    for(var i=0; i<obstacleArray.length; i++) { // For loop to check if i is less than the length of the obstacleArray, adds 1 to i
        if (heliX < (obstacleArray[i].x + obstacle.width) && (heliX + helicopter.width) > obstacleArray[i].x
            && heliY < (obstacleArray[i].y + obstacle.height) && (heliY + helicopter.height) > obstacleArray[i].y ) { // Checks if the helicopter hits any of the obstacles
            stop(); // Calls the stop() function if the helicopter collides the the obstacles
        } // End of if statement
    } // End of for loop
} // End of collision() function

// The score() function calculates the players score and adds to the difficulty if the score reaches a certain level
function score(){
  playerScore=playerScore+1; // Adds 1 to the playerScore
  if(playerScore > 1500){ // Checks if the playerscore is less than 1500
    obstacleInterval = 35; // If the score is greater than 1500, the difficulty increases by lowering the obstacle Interval value
  } // End of if statement
  else if(playerScore > 2500){ // Checks if the playerscore is less than 2500
    obstacleInterval = 25; // If the score is greater than 2500, the difficulty increases by lowering the obstacle Interval value
  } // End of else if statement
} // End of score() function

// onkeydown function to check if either the up key or the down key is being pressed, if so then change the velocity accordingly
document.onkeydown = function(e) { // onkeydown function
    switch (e.keyCode) { // switch statement that checks what keycode is being pressed
        case 38: // If keycode is 38 (up key) change velocity
            velocity = -3; // Velocity set to -3
            break;
        case 40: // If keycode is 40 (up key) change velocity
            velocity = 3; // Velocity set to 3
            break;
    } //End of switch statement
}; // End of onkeydown function