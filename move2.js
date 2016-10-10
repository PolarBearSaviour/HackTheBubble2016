var player = {
    x: 10,
    y: 10,
    vx: 0,
    vy: 0,
    width: 32
};

var moveSpeed = 0.05;

function createWalls(a, b, c, d) {
    var w = {
        // top y value:
        ty: a,
        //bottom y value:
        by: b,
        //left x value:
        lx: c,
        //right x value:
        rx: d
    }
    return w
}

var collWalls = [];
var wallTouchDistance = 2;

function createExit(a, b, c, d) {
    var w = {
        // top y value:
        ty: a,
        //bottom y value:
        by: b,
        //left x value:
        lx: c,
        //right x value:
        rx: d
    }
    return w
}

var collExit;

function createCollFire(a, b, c, d) {
    var w = {
        // top y value:
        ty: a,
        //bottom y value:
        by: b,
        //left x value:
        lx: c,
        //right x value:
        rx: d
    }
    return w
}

var collFire = [];

function checkKeyDown(evt) {
    //debugger;
    switch (evt.keyCode) {
        case 87:
            player.vy = -moveSpeed;
            break;
        case 83:
            player.vy = moveSpeed;
            break;
        case 65:
            player.vx = -moveSpeed;
            break;
        case 68:
            player.vx = moveSpeed;
            break;
        default:
            break;
    }
}

function checkKeyUp(evt) {
    //debugger;
    switch (evt.keyCode) {
        case 87:
            player.vy = 0;
            break;
        case 83:
            player.vy = 0;
            break;
        case 65:
            player.vx = 0;
            break;
        case 68:
            player.vx = 0;
            break;
        default:
            break;
    }
}

function getCoord() {

    //slows down diagonal
    if ((player.vx == moveSpeed || player.vx == -moveSpeed) && (player.vy == moveSpeed || player.vy == -moveSpeed)) {
        player.vx = player.vx / 1.41;
        player.vy = player.vy / 1.41;
    }

    for (var i = 0; i < collWalls.length; i++) {

        //case 1 - travelling right:
        if (player.vx > 0) {
            if ((player.x + (player.width) + player.vx) > collWalls[i].lx && (player.x + (player.width) + player.vx) < collWalls[i].rx) {
                if (player.y + player.width < collWalls[i].ty || player.y > collWalls[i].by) {
                    player.x += player.vx
                } else {

                    player.x = collWalls[i].lx - player.width - wallTouchDistance
                }

            } else {
                player.x += player.vx
            }
        }

        //case 2 - travelling left
        if (player.vx < 0) {
            if ((player.x + player.vx) < collWalls[i].rx && (player.x + player.vx) > collWalls[i].lx) {
                if (player.y + player.width < collWalls[i].ty || player.y > collWalls[i].by) {
                    player.x += player.vx
                } else {

                    player.x = collWalls[i].rx + wallTouchDistance
                }

            } else {
                player.x += player.vx
            }
        }

        //case 3 - travelling up
        if (player.vy < 0) {
            if ((player.y + player.vy) < collWalls[i].by && (player.y + player.vy) > collWalls[i].ty) {
                if (player.x + player.width < collWalls[i].lx || player.x > collWalls[i].rx) {
                    player.y += player.vy
                } else {

                    player.y = collWalls[i].by + wallTouchDistance
                }

            } else {
              player.y += player.vy
            }
        }

        //case 3 - travelling down
        if (player.vy > 0) {
            if ((player.y + player.width + player.vy) > collWalls[i].ty && (player.y + player.width + player.vy) < collWalls[i].by) {
                if (player.x + player.width < collWalls[i].lx || player.x > collWalls[i].rx) {
                    player.y += player.vy
                } else {

                    player.y = collWalls[i].ty - player.width - wallTouchDistance
                }

            } else {
              player.y += player.vy
            }
        }

    }

    for(var z = 0; z < collFire.length; z++) {
      if (player.x < collFire[z].rx && player.x > collFire[z].lx && player.y > collFire[z].ty && player.y < collFire[z].by) {
        document.getElementById("lose").style.display = "block";
      }
    }

    if (player.x < collExit.rx && player.x > collExit.lx && player.y > collExit.ty && player.y < collExit.by) {
      document.getElementById("win").style.display = "block";
    }

    window.requestAnimationFrame(getCoord)

}

window.addEventListener('keydown', checkKeyDown, true);
window.addEventListener('keyup', checkKeyUp, true);
getCoord()
