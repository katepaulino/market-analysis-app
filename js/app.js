'use strict';

var imagePath = 'img/';
var images = ['bag.jpg','banana.jpg','chair.jpg','cthulhu.jpg','dragon.jpg','pen.jpg','scissors.jpg','shark.jpg','sweep.jpg','unicorn.jpg','usb.jpg','watercan.jpg','wineglass.jpg'];

var data = {
	labels: images,
	datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 4]
		},
	]
};

var formEl = document.getElementById('resultsButton');
var chart = document.getElementById('myChart');
var ctx = chart.getContext('2d');
var myChart = new Chart(ctx).Bar(data);

formEl.addEventListener('submit', function(event) {
  event.preventDefault();
  chart.classList.remove('hide');
  //TODO: You'll need to figure out how to update the values in the chart. Check the chartjs docs
  // http://www.chartjs.org/docs/#bar-chart-data-structure
  console.log(imageTracker.getFormattedData());
  myChart.update();
});

function Tracker(selectionElements, selectionOptions){
	this.selectionTotals = {};
	// 1. Check to see if selectionOptions is an array
	// 2. If so, iterate through that array and create
	// a key.
	// This ensures that an index exists in the object
	if(Array.isArray(selectionOptions)){
		selectionOptions.forEach(function(selection){
			this.selectionTotals[selection] = 0;
			// notice the use of bind here. Without using bind
			// "this" is undefined
		}.bind(this));
	}
	this.elements = selectionElements;
	//the counter should live within the constructor
	this.count = 0;

	for(var i = 0; i < this.elements.length; i++){
	this.elements[i].addEventListener('click',
		function(event){
			var imagePath = event.target.src;
			var imageFile = imagePath.substr(imagePath.lastIndexOf('/') + 1);
			this.addSelection(imageFile);
			this.setImages();

			//++this.count increments the variable and returns the result.
			// the modulo (%) operator returns the remainder of a division operation.
			// Therefore, if the remainder is 0, the number is evenly divisible by 15. 
			if(++this.count % 15 == 0){
				formEl.classList.remove('hide');
			}

		}.bind(this))
	}
}

Tracker.prototype.addSelection = function(key){
	if(this.selectionTotals[key]){
		this.selectionTotals[key]++;
	} else {
		this.selectionTotals[key]=1;
	}
	return this.selectionTotals;
}

Tracker.prototype.getRandomIndex = function(array){
	return Math.floor(Math.random() * array.length);
}

Tracker.prototype.getRandomElements = function(num, array){
	var randomElements = [];
	var validIndices = [];
	var randomIndex;
	var randomElement;

	for(var i = 0; i < array.length; i++){
		validIndices[i] = i;
	}

	while(num > 0){
		randomIndex = this.getRandomIndex(validIndices);
		randomElement = array[validIndices[randomIndex]];
		randomElements.push(randomElement);
		validIndices.splice(randomIndex, 1);
		num--;
	}
	return randomElements;
}

Tracker.prototype.setImages = function(){
	var randomImages = this.getRandomElements(this.elements.length, images);

	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].setAttribute('src', imagePath + randomImages[i]);
	}
}

Tracker.prototype.getFormattedData = function(){
	// the goal is to return the data in an array
	var totals = [];
	//we need to iterate through the object using a for-in loop, 
	// stuffing the entries into an array 
	for(var selection in this.selectionTotals){
		totals.push([selection, this.selectionTotals[selection]]);
	}
	// since an object is unordered, there's no guarantee that the
	// items in our new array are in order. We need to sort the array
	// look here for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	totals.sort(function(a, b){
		//this will alphabetically sort based on the first entry in the array
		return a[0] - b[0];
	});
	//now our array has extra information, so it's just a matter of using
	// Array.map() to reformat it. Map steps through an array, applies an 
	// operation to each entry and returns a new array. In this way we're able 
	// to return an array with just the data we want
	return totals.map(function(selection){
		return selection[1];
	});
}

var imageElements = document.querySelectorAll('.vote');
var imageTracker = new Tracker(imageElements, images);
imageTracker.setImages();




