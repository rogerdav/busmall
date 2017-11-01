'use strict';
// global variables
var globalCounter = 0;
var imagesToUse = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var arrOfObjects = [];
var frame1 = document.getElementById('section_one');
var frame2 = document.getElementById('section_two');
var frame3 = document.getElementById('section_three');
var arrOfTotalClicks = [];
var arrOfTimesClicked = [];
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
  arrOfObjects[x].timesDisplayed++;
  //console.log(textToAppendFrame1);
  frame1img.innerHTML = textToAppendFrame1;
  frame1.appendChild(frame1img);
  var frame2img;
  frame2img = document.createElement('div');
  var textToAppendFrame2 = '<img src="' + arrOfObjects[y].path + '" >';
  arrOfObjects[y].timesDisplayed++;
  //console.log(textToAppendFrame2);
  frame2img.innerHTML = textToAppendFrame2;
  frame2.appendChild(frame2img);
  var frame3img;
  frame3img = document.createElement('div');
  var textToAppendFrame3 = '<img src="' + arrOfObjects[z].path + '" >';
  arrOfObjects[z].timesDisplayed++;
  //console.log(textToAppendFrame3);
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

function calculateData() {
  for (var w = 0; w < arrOfObjects.length; w++) {
    arrOfTotalClicks[w] = arrOfObjects[w].timesClicked;
    arrOfTimesClicked[w] = arrOfObjects[w].timesDisplayed;
  }

}
function clearLastPage () {
  console.log('im in clear last page');
  var main = document.getElementsByTagName('main')[0];
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}
function createCanvas() {
  var main = document.getElementsByTagName('main')[0];
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id','totalchart');
  canvas.style.height = '600px';
  canvas.style.width = '960px';
  main.appendChild(canvas);
}

function populateChart () {
  var ctx = document.getElementById('totalchart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imagesToUse,
      datasets: [{
        label: 'Votes by Image',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: arrOfTotalClicks,
      }]
    },

    // Configuration options go here
    options: {}
  });
}

function ifImageClicked(event) {
  if(globalCounter < 25) {

    lastDisplayed = initial3;
    initial3 = getNewThree();
    globalCounter++;
    var product = event.target.src.split('/').pop();//takes the filemane off of the string.

    for (var u = 0; u < arrOfObjects.length; u++) {
      if (product === arrOfObjects[u].filename ) {
        arrOfObjects[u].timesClicked++;
        //console.log('filename + times clicked',arrOfObjects[u].timesClicked);
      }
    }

    clearPage();
    displayPictures(initial3[0],initial3[1],initial3[2]);
    listenAndCount();
  } else {
    console.log('im inside else section');
    clearLastPage();
    calculateData();
    createCanvas();
    populateChart();
  };

  return;
}


// code start to run here

for (var i = 0; i < imagesToUse.length; i++) { //populates the array with pic objects
  var newImage = new Picture(imagesToUse[i]);
  arrOfObjects.push(newImage);
}

var initial3 = getNewThree(); //generate 3 numbers to start with
displayPictures(initial3[0],initial3[1],initial3[2]); //displays the starting 3 pictures
globalCounter++; //adds initial vaue to counter
listenAndCount(); // starts the listen function on images
