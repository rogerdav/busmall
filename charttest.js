'use strict';
function newchart() {
var ctx = document.getElementById('totalchart').getContext('2d');
console.log(ctx);
var chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: 'Votes by Image',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    },

    // Configuration options go here
    options: {}
});
}
newchart();
