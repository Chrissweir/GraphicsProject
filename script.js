// Gets a handle to the element with id canvas.
      var canvas = document.getElementById("canvas");
      // Set the canvas up for drawing in 2D.
      var ctx = canvas.getContext("2d");
      
      //Global variables
      var keyUp = 0;
      var game;
      var obstacleCount;
      var obstacleArray;
      var playerScore;
      var scrollVal;

      var ascentRate;
      var descentRate;
      
      
      
      //Helicopter object
      var helicopter = 
          {
            x: null,
            y: null,
            width: 40,
            height: 30,
            acceleration: 0.10,
            image: "helicopter.png"
          }
      
      //Obstacle object
      var obstacle = 
          {
            height: 50,
            width: 30,
            colour: "rgb(0,0,255)",
            velocity: 5,
            interval: 50
          }
      
      var physics =
          {
            ascendRate: 1,
            descendRate: 1.5,
            climbRate: 0.5,
            maxVelocity: 5,
            gravity: 0.8
          }
      
      var background =
          {
            width: 600,
            height: 350,
            velocity: 2,
            colour: "rgb(211,211,211)",
            image: "background.png"
          }
      
        window.onload = function () { startGame(); }

        
        function startGame() 
        {
          game = "pause";
          //clearScreen();

          helicopter.image.src = "helicopter.png";

          obstacleArray = new Array();

          helicopter.x = 100;
          helicopter.y = 175;

          descentRate = physics.descendRate;
          ascentRate = physics.ascendRate;

          obstacleCount = 0;
          playerScore = 0;

          scrollVal = 0;

          addObstacle();

          ctx.drawImage(background.image, 0, 0, background.width, background.height);
          ctx.drawImage(helicopter.image, helicopter.x, helicopter.y, helicopter.width, helicopter.height);
    }

        function addObstacle() {
            newObstacle = {}
            newObstacle.x = canvas.width;
            newObstacle.y = Math.floor(Math.random() * (canvas.height-obstacle.height))
            obstacleArray.push(newObstacle);
        }










      
