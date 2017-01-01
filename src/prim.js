const GRIDNUM = 10;

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// pushes point to frontier array if valid
function addFrontier(x, y, grid, frontier) {
  if(x >= 0 && y >= 0 && y < GRIDNUM && x < GRIDNUM && grid[x][y] == 0) {
    frontier.push([x, y]);
  }
}

// marks point as added to tree, pushes adjacent points to frontier array
function mark(x, y, grid, frontier) {
  grid[x][y] = 1;

  addFrontier(x-1, y, grid, frontier);
  addFrontier(x+1, y, grid, frontier);
  addFrontier(x, y-1, grid, frontier);
  addFrontier(x, y+1, grid, frontier);
}

// clears array n and pushes adjacent points to n
function neighbors(x,y, grid) {
  n = [];

  if(x > 0 && grid[x-1][y] == 1) {
    n.push([x-1, y])
  }
  if(x+1 < GRIDNUM && grid[x+1][y] == 1) {
    n.push([x+1, y])
  }
  if(y+1 < GRIDNUM && grid[x][y+1] == 1) {
    n.push([x, y+1])
  }
  if(y > 0 && grid[x][y-1] == 1) {
    n.push([x, y-1])
  }

  return n;
}

var frontier = [];

// initializes array 'grid' as two-dimensional array in size GRIDNUM x GRIDNUM as 0
var gridIncluded = [];
for(var x = 0; x < GRIDNUM; x++) {
  gridIncluded[x] = [];
  for(var y = 0; y < GRIDNUM; y++) {
    gridIncluded[x][y] = 0;
  }
}

// initializes 2d array 'walls' as 1
var walls = [];
for(var x = 0; x < GRIDNUM; x++) {
  walls[x] = [];
  for(var y = 0; y < GRIDNUM * 2 - 1; y++) {
    walls[x][y] = 1;
  }
}

var n;
var x;
var y;
var random;

mark(0, 0, gridIncluded, frontier);
while(frontier.length != 0) {
  random = Math.floor(Math.random()*frontier.length);
  x = frontier[random][0];
  y = frontier[random][1];
  for(var i = frontier.length - 1; i >= 0; i--) {
    if(frontier[i].equals([x, y])) {
      frontier.splice(i, 1);
    }
  }
  n = neighbors(x, y, gridIncluded);
  random = Math.floor(Math.random()*n.length);
  nx = n[random][0];
  ny = n[random][1];
  if(x==nx) {
    walls[x][Math.min(y, ny) * 2 + 1] = 0;
  }
  else if (y == ny) {
    walls[Math.min(x, nx)][y * 2] = 0;
  }
  mark(x, y, gridIncluded, frontier);
}

console.log(walls);
