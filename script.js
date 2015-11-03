// Gets a handle to the element with id canvas.
      var canvas = document.getElementById("canvas");
      // Set the canvas up for drawing in 2D.
      var ctx = canvas.getContext("2d");
      
      //Global variables
      var keyUp = 0;
      var heliX;
      var heliY;
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
            x: 100,
            y: 150,
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
            maxVelocity: 2,
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


      // A function to repeat every time the animation loops

      
    function start()
      {
        obstacleArray = new Array();

        heliX = helicopter.x;
        heliY = helicopter.y;

        descentRate = physics.descendRatecent;
        ascentRate = physics.ascendRate;

        playerScore = 0;
        scrollVal = 0;
        repeatme();
      }

      function repeatme() 
      {
        ctx.clearRect(0, 0, canvas.height, canvas.width); 
          
        // Draw the ball (stroked, not filled).
        ctx.beginPath();
        ctx.fillRect(heliX, heliY, helicopter.width, helicopter.height);
        
        heliY += physics.maxVelocity;
        window.addEventListener("keypress", function(e) { 

        if (e.keyCode === 32) {
          physics.maxVelocity = -physics.maxVelocity;
        }
        });

        if( (heliY <= 0) || (heliY > (canvas.height-helicopter.height)) ) 
        {
          start();
        }
        window.requestAnimationFrame(repeatme);
      }
      
      // Get the animation going.
      start();
      
     // function obstacle() 
     /* {
        newBrick = {}
        newBrick.x = canvas.width;
        newBrick.y = Math.floor(Math.random() * (canvas.height-brickHeight))
        brickList.push(newBrick);
      }*/


        










      
