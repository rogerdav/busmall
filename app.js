'use strict';

var globalCounter = 0;
var imagesToUse = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

// constructor function??
function Pictures(name) {
  this.filename = name;
  this.path = 'images/' + name;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
}
