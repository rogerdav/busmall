'use strict';
// global variables
var globalCounter = 0;
var imagesToUse = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var arrOfObjects = [];
var frame1 = document.getElementById('section_one');
var frame2 = document.getElementById('section_two');
var frame3 = document.getElementById('section_three');
var lastDisplayed = [];



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
// checks ramdom generated number agaist items displayed last
function unique() {
  var temp = getRandomIntInclusive();
  while (lastDisplayed.includes(temp)) {
    temp = getRandomIntInclusive();
  }
  return temp;
}

function getNewThree() { // returns arr of 3 numbers not duplicated and not equal to previous 3
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


// append pictures to page
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


function clearPage() {
  frame1.innerHTML = '';
  frame2.innerHTML = '';
  frame3.innerHTML = '';

}

function listenAndCount() {
  var image1 = frame1.getElementsByTagName('img');
  var image2 = frame2.getElementsByTagName('img');
  var image3 = frame3.getElementsByTagName('img');

  image1[0].addEventListener('click',ifImageClicked);
  image2[0].addEventListener('click',ifImageClicked);
  image3[0].addEventListener('click',ifImageClicked);
}

function ifImageClicked(event) {
  if(globalCounter < 25) {

    lastDisplayed = initial3;
    initial3 = getNewThree();
    globalCounter++;
    var product = event.target.src.split('/').pop();

    for (var u = 0; u < arrOfObjects.length; u++) {
      if (product === arrOfObjects[u].filename ) {
        arrOfObjects[u].timesClicked++;
        console.log('filename + times clicked',arrOfObjects[u].timesClicked);
      }
    }
    clearPage();
    displayPictures(initial3[0],initial3[1],initial3[2]);
    listenAndCount();
  }
  return;
}
// code start to run here

for (var i = 0; i < imagesToUse.length; i++) { //populates the array with pic objects
  var newImage = new Picture(imagesToUse[i]);
  arrOfObjects.push(newImage);
}

var initial3 = getNewThree(); //generate 3 numbers to start with
displayPictures(initial3[0],initial3[1],initial3[2]); //displays the starting 3 pictures
globalCounter++;
listenAndCount();
