// Gets a handle to the element with id canvas.
      var canvas = document.getElementById("canvas");
      // Set the canvas up for drawing in 2D.
      var ctx = canvas.getContext("2d");
      
      //Global variables
      var keyUp = 0;
      
      //Helicopter object
      var helicopter = 
          {
            x: 0,
            y: 0,
            width: 40,
            height: 30,
            acceleration: 0.10,
            image: "helicopter.png";
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
      
      var gameMachanics =
          {
            ascendRate: 1,
            descendRate: 1.5,
            climbRate: 0.5,
            maxVelocity: 5,
            gravity: 0.8
          }
      var background =
          {
            velocity: 2,
            colour: "rgb(211,211,211)",
          }



      
