function sprite(option) {
  var that = {};
  that.x = option.x;
  that.y = option.y;

  that.context = option.context;
  that.imageWidth = option.imageWidth;
  that.imageHeight = option.imageHeight;
  that.image = option.image;

  that.render = function () {
    that.context.drawImage(that.image, 0, 0, that.imageWidth, that.imageHeight, that.x, that.y, that.imageWidth, that.imageHeight);

  }
  return that;
}

function createImageObject(URL, xOnScreen, yOnScreen, imageWidth, imageHeight) {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d');

  var image = new Image();
  image.src = URL;

  var object = sprite({
    x: xOnScreen,
    y: yOnScreen,
    context: context,
    imageWidth: imageWidth,
    imageHeight: imageHeight,
    image: image
  });
  return object;
}

function createAnimatedObject(imgObject1, imgObject2){
  var animation = {
    frames : [imgObject1, imgObject2],
    index: 0,
    render: function(){
      this.frames[this.index%1].render();
    }
  }


}




function createImage(representationOfWalls) {

  map = []

  switch(Math.floor(Math.random()*3)) {
    case 0: {
      map.push(createImageObject('Pics/exit.png', (GRIDNUM-1)*100, 0, 100, 100));
      collExit = createExit(0, 100, (GRIDNUM-1)*100, GRIDNUM*100)
      break;
    }
    case 1: {
      map.push(createImageObject('Pics/exit.png', (GRIDNUM-1)*100, (GRIDNUM-1)*100, 100, 100));
      collExit = createExit((GRIDNUM-1)*100, GRIDNUM*100, (GRIDNUM-1)*100, GRIDNUM*100)
      break;
    }
    case 2: {
      map.push(createImageObject('Pics/exit.png', 0, (GRIDNUM-1)*100, 100, 100));
      collExit = createExit((GRIDNUM-1)*100, GRIDNUM*100, 0, 100)
      break;
    }
  }

  var x = 80;
  var y = 0;

  for(var i = 0; i < representationOfWalls.length - 1; i ++){

      var n = representationOfWalls[i].length;

      for (var k = 0; k < n; k+= 2) {
          if(representationOfWalls[i][k] == 1) {
            map.push(createImageObject('Pics/final.png' , x, y, 40, 100));
            collWalls.push(createWalls(y,y+100,x,x+40));
          }
          y += 100
      }
      x += 100;
      y = 0;
  }

  x = 0;
  y = 80;


//horizontal
  for(var i = 0; i < representationOfWalls.length; i ++){

      var n = representationOfWalls[i].length;

      for (var k = 1; k < n; k += 2) {
        if(representationOfWalls[i][k] == 1) {
          map.push(createImageObject('Pics/final(copy).png' , x, y, 100, 40));
          collWalls.push(createWalls(y,y+40,x,x+100));
        }
        y += 100
      }
      x += 100;
      y = 80;
  }
  return [map, collWalls];
}
