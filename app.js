'use strict';

var globalCounter = 0;
var imagesToUse = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var arrOfObjects = [];
var frame1 = document.getElementById('section_one');
var frame2 = document.getElementById('section_two');
var frame3 = document.getElementById('section_three');



// constructor function??
function Picture(name) {
  this.filename = name;
  this.path = 'images/' + name;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
}

function getRandomIntInclusive() {
  return Math.floor(Math.random() * (19 - 0 + 0)) + 0;
}

for (var i = 0; i < imagesToUse.length; i++) {
  var newImage = new Picture(imagesToUse[i]);
  arrOfObjects.push(newImage);
}

var a = getRandomIntInclusive();
console.log(a);
var last_a;
var b = getRandomIntInclusive();
console.log(b);
var last_b;
var c = getRandomIntInclusive();
console.log(c);
var last_c;

while ( a === b || b === c || a === c ) {
  b = getRandomIntInclusive();
  while ( a === c || b === c) {
    c = getRandomIntInclusive();
  }
}
console.log(a,b,c);


// frame one picture append
function displayPictures(x, y, z) {

  var frame1img;
  frame1img = document.createElement('div');
  var textToAppendFrame1 = '<img src="' + arrOfObjects[x].path + '" >';
  console.log(textToAppendFrame1);
  frame1img.innerHTML = textToAppendFrame1;
  frame1.appendChild(frame1img);

  var frame2img;
  frame2img = document.createElement('div');
  var textToAppendFrame2 = '<img src="' + arrOfObjects[y].path + '" >';
  console.log(textToAppendFrame2);
  frame2img.innerHTML = textToAppendFrame2;
  frame2.appendChild(frame2img);

  var frame3img;
  frame3img = document.createElement('div');
  var textToAppendFrame3 = '<img src="' + arrOfObjects[z].path + '" >';
  console.log(textToAppendFrame3);
  frame3img.innerHTML = textToAppendFrame3;
  frame3.appendChild(frame3img);

}

displayPictures(a,b,c);
