//var frame1 = createImageObject('Pics/STEP1.png', 100, 100, 10, 10);
//var frame2 = createImageObject('Pics/STEP2.png', 100, 100, 10, 10);

/*
var player = createAnimatedObject(frame1, frame2);
player.x = 10
player.y = 10;
player.width = 32;
player.vx = 0;
player.vy = 0;
*/
function start() {

  function draw() {
    context.clearRect(0,0, 1000, 1000);
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.width);
    context.fill();

    for(var i = 0; i < mapImage.length; i++){
      mapImage[i].render();
    }
    //player.render()
    window.requestAnimationFrame(draw);
  }




  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');


  var mapImage = createImage(walls);
  var collWalls = mapImage[1];
  var mapImage = mapImage[0];
  var playerImage = createImageObject('Pics/CHAR1.png', player.x, player.y, player.width, player.width)
  setInterval(Fire(walls, 10), 3000);

  draw();
  getCoord();

}
