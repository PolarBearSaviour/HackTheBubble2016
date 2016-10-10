function Fire(grid,x) {
  var max = x; //max row/column value
  var next = 1; //increments spread of fire by 1 room
  var spread; //random direction

  var xstart = Math.floor((Math.random() * max)); //generate random x starting point between 0 and max value
  var ystart = Math.floor((Math.random() * max)); //generate random y starting point between 0 and max value

  startFire(); //start fire at random starting point

  var now = {
    x: xstart,
    y: ystart,
  };

  var next = {
    x: 0,
    y: 0,
  };

  var begin = setInterval(function(){continueFire()},1500); //spreads fire every 1.5 seconds

  function displayFire(x, y) {
    map.push(createImageObject('Pics/fire.gif', x*100, y*100, 100, 100));
    collFire.push(createCollFire(y*100, y*100+100, x*100, x*100+100));
  }

  function startFire() {
    grid[xstart][ystart] = 2;
    displayFire(xstart, ystart); //at starting point, value is 2: fire
  }

  function continueFire() {

    spread = Math.floor((Math.random() * 4) + 1); //generate random number between 1 and 4 for random direction

    if(spread==1) { //if 1 move left by 1
      detectOuter();
      if(detectOuter()==false) {
        next.x = now.x+1;
        next.y = now.y;
      }

      grid[next.x][next.y] = 2;
      now.x = next.x;
      now.y = next.y;
      //console.log("A" + now.x + now.y); //for debugging
    }

    if(spread==2) { //if 1 move left by 1
      detectOuter();
      if(detectOuter()==false) {
        next.x = now.x;
        next.y = now.y+1;
      }

      grid[next.x][next.y] = 2;
      now.x = next.x;
      now.y = next.y;
      //console.log("B" + now.x + now.y); //for debugging
    }

    if(spread==3) { //if 1 move left by 1
      detectOuter();
      if(detectOuter()==false) {
        next.x = now.x-1;
        next.y = now.y;
      }

      grid[next.x][next.y] = 2;
      now.x = next.x;
      now.y = next.y;
      //console.log("C" + now.x + now.y); //for debugging
    }

    if(spread==4) { //if 1 move left by 1
      detectOuter();
      if(detectOuter()==false) {
        next.x = now.x;
        next.y = now.y-1;
      }

      grid[next.x][next.y] = 2;
      now.x = next.x;
      now.y = next.y;
      //console.log("D" + now.x + now.y); //for debugging
    }

    if(spread < 1 & spread > 4) console.log("ERROR");

    displayFire(now.x, now.y)
  }

  function detectOuter() {
    if(now.x>=8) {
      next.x = xstart-1;
      next.y = ystart;
    } else if(now.y>=8) {
      next.x = xstart
      next.y = ystart-1;
    } else if(now.x<=0) {
      next.x = xstart+1;
      next.y = ystart;
    } else if(now.y<=0) {
      next.x = xstart;
      next.y = ystart+1;
    } else return false;
  }

  return continueFire;
}
