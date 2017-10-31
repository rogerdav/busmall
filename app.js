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





var lastDisplayed = [];
var currentDisplayed;

function getRandomIntInclusive() {
  return Math.floor(Math.random() * (19 - 0 + 0)) + 0;
}
// checks ramdom generated number agaist items displayed last
function unique() {
  var temp = getRandomIntInclusive();
  while (lastDisplayed.includes(temp)) {
    temp = getRandomIntInclusive();
  }
  return temp;
}

function getNewThree() {
  var a = unique();
  var b = unique();
  var c = unique();
  while ( a === b || b === c || a === c ) {
    b = unique();
    while ( a === c || b === c) {
      c = unique();
    }
  }
  return[a,b,c];
}






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
  var textToAppendFrame2 = '<img id="' + arrOfObjects[y].filename + '" "src="' + arrOfObjects[y].path + '" >';
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

// this is the start of the code flow

for (var i = 0; i < imagesToUse.length; i++) { //populates the array with pic objects
  var newImage = new Picture(imagesToUse[i]);
  arrOfObjects.push(newImage);
}
console.log(imagesToUse);
var initial3 = getNewThree(); //generate 3 numbers to start with
console.log('newthree',initial3);

displayPictures(initial3[0],initial3[1],initial3[2]); //displays the starting 3 pictures

// for ( var t = 0; t < 2; t++) {
//   frame1.addEventListener('click',function() {
//     globalCounter++;
//     var frame1src = this.getAttribute('src');
//     console.log(frame1src);
//   });
//   frame2.addEventListener('click',function() {
//     globalCounter++;
//     var frame2src = this.getAttribute('src');
//     console.log(frame2src);
//   });
//   frame3.addEventListener('click',function() {
//     globalCounter++;
//     var frame3src = this.getAttribute('src');
//     console.log(frame3src);
//   });
// }










// for (var k = 0; k < 5; k++) {
//   frame1.addEventListener('click',function() {
//     globalCounter++;
//   });
//   frame2.addEventListener('click',function() {
//     globalCounter++;
//   });
//   frame3.addEventListener('click',function() {
//     globalCounter++;
//   });
//
// }
