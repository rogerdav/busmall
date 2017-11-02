'use strict';
// global variables
var globalCounter;
var imagesToUse = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
var arrOfObjects = [];
var frame1 = document.getElementById('section_one');
var frame2 = document.getElementById('section_two');
var frame3 = document.getElementById('section_three');
var arrOfTotalClicks = [];
var arrOfTimesDisplayed = [];
var arrOfPercentClicked = [];
var lastDisplayed = [];
var initial3 = []; //generate 3 numbers to start with

// constructor function??
function Picture(name) {
  this.filename = name;
  this.path = 'images/' + name;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
}

function getRandomIntInclusive() {
  return Math.floor(Math.random() * (20 - 0 + 0)) + 0;
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
  localStorage.x = x;
  frame1img.innerHTML = textToAppendFrame1;
  frame1.appendChild(frame1img);
  var frame2img;
  frame2img = document.createElement('div');
  var textToAppendFrame2 = '<img src="' + arrOfObjects[y].path + '" >';
  arrOfObjects[y].timesDisplayed++;
  localStorage.y = y;
  frame2img.innerHTML = textToAppendFrame2;
  frame2.appendChild(frame2img);
  var frame3img;
  frame3img = document.createElement('div');
  var textToAppendFrame3 = '<img src="' + arrOfObjects[z].path + '" >';
  arrOfObjects[z].timesDisplayed++;
  localStorage.z = z;
  frame3img.innerHTML = textToAppendFrame3;
  frame3.appendChild(frame3img);
}
// clearpage clears the images from the frame
function clearPage() {
  frame1.innerHTML = '';
  frame2.innerHTML = '';
  frame3.innerHTML = '';

}
// sets the event listners on the three images
function listenAndCount() {
  var image1 = frame1.getElementsByTagName('img');
  var image2 = frame2.getElementsByTagName('img');
  var image3 = frame3.getElementsByTagName('img');
  image1[0].addEventListener('click',ifImageClicked);
  image2[0].addEventListener('click',ifImageClicked);
  image3[0].addEventListener('click',ifImageClicked);
}
// populates the arrays with the final data
function calculateData() {
  arrOfObjects = JSON.parse(localStorage.arrOfObjects);
  for (var w = 0; w < arrOfObjects.length; w++) {
    arrOfTotalClicks[w] = arrOfObjects[w].timesClicked;
    arrOfTimesDisplayed[w] = arrOfObjects[w].timesDisplayed;
    arrOfPercentClicked[w] = arrOfObjects[w].timesClicked / arrOfObjects[w].timesDisplayed * 10;
  }
// clears page after all images have been shown and
}
function clearLastPage () {
  console.log('im in clear last page');
  var main = document.getElementsByTagName('main')[0];
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}
//creates the canvas space on the page, aslo attaches a reset button
function createCanvas() {
  var main = document.getElementsByTagName('main')[0];
  var btn = document.createElement('div');
  btn.innerHTML = '<button id="btn">Reset</button>';
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id','totalchart');
  canvas.style.height = '150px';
  canvas.style.width = '300px';
  main.appendChild(canvas);
  main.appendChild(btn);
  var resetbtn = document.getElementsByTagName('button');
  resetbtn[0].addEventListener('click',resetPage);
}
// clears local storage and resets page
function resetPage(event) {
  localStorage.clear();
  window.location.reload();
}
// pulls the data from total arrays
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
        backgroundColor: 'black',
        borderColor: 'black',
        data: arrOfTotalClicks,
      },
      {
        label: 'Times Displayed',
        backgroundColor: 'red',
        borderColor: 'red',
        data: arrOfTimesDisplayed,
      },
      {
        label: '% Chosen',
        backgroundColor: 'green',
        borderColor: 'green',
        data: arrOfPercentClicked,
      }
      ]

    },

    // Configuration options go here
    options: {}
  });
}
// main for loop to cycle through the images.
function ifImageClicked(event) {
  if(globalCounter < 25) {

    lastDisplayed = initial3;
    initial3 = getNewThree();

    globalCounter++;
    localStorage.globalCounter = globalCounter;

    var product = event.target.src.split('/').pop();//takes the filemane off of the string.

    for (var u = 0; u < arrOfObjects.length; u++) {
      if (product === arrOfObjects[u].filename ) {
        arrOfObjects[u].timesClicked++;
        //console.log('filename + times clicked',arrOfObjects[u].timesClicked);
      }
    }
    localStorage.arrOfObjects = JSON.stringify(arrOfObjects);

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
// initiat the counters and set the first three images on the page.
function initiatePage() {
  globalCounter = 0;
  for (var i = 0; i < imagesToUse.length; i++) { //populates the array with pic objects
    var newImage = new Picture(imagesToUse[i]);
    arrOfObjects.push(newImage);
  }
  initial3 = getNewThree();
  displayPictures(initial3[0],initial3[1],initial3[2]); //displays the starting 3 pictures
  listenAndCount(); // starts the listen function on images
}
// if local storage counter is null then initiates page, if you are returning to the page
// halfway through the process it will return you to the exact point that you left off.
if (!localStorage.globalCounter) {
  initiatePage();
} else if (Number(localStorage.globalCounter) < 25) {
  globalCounter = Number(localStorage.globalCounter);
  arrOfObjects = JSON.parse(localStorage.arrOfObjects);
  initial3[0] = Number(localStorage.x);
  initial3[1] = Number(localStorage.y);
  initial3[2] = Number(localStorage.z);
  displayPictures(initial3[0],initial3[1],initial3[2]);
  listenAndCount();
} else {
  console.log('im in the esle after 25');
  clearLastPage();
  calculateData();
  createCanvas();
  populateChart();
}
