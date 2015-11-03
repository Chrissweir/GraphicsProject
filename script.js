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
      descentRate = physics.descendRate;

      // A function to repeat every time the animation loops.
      function repeatme() 
      {
        ctx.clearRect(0, 0, canvas.height, canvas.width); 
          
        // Draw the ball (stroked, not filled).
        ctx.beginPath();
        ctx.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height, 10);
        
        
        
        ascentRate = physics.ascendRate;
        
        helicopter.y += descentRate;  

      window.addEventListener("keydown", function(e) { 

        if (e.keyCode === 32) {
            descentRate = 0;
            
            helicopter.y -= ascendRate;
            
        }
                  
        });
        
       /* if(helicopter.y <= canvas.height - helicopter.height)
        {
         helicopter.y +=150; 
        }*/

          
          
        window.requestAnimationFrame(repeatme);
      }
      
      // Get the animation going.
      repeatme();


        










      
