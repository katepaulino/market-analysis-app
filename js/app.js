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
			// the bar graph seems to need to be set up with
			// the right number of elements.
			data: images
		},
	]
};

var controls = document.getElementById('results');
var chart = document.getElementById('myChart');
var ctx = chart.getContext('2d');
var myChart = new Chart(ctx).Bar(data);

controls.addEventListener('click', function(event) {
  event.preventDefault();
	if (event.target.value === 'reset') {
		imageTracker.count = 0;
		controls.classList.add('hide');
		barGraph.classList.add('hide');
	} else if (event.target.value === 'show') {
		barGraph.classList.remove('hide')
		chart.classList.remove('hide');

		for(var i = 0, data = imageTracker.getFormattedData(); i < data.length; i++){
			myChart.datasets[0].bars[i].value = data[i];
		}
		// doesn't work! can't replace whole data set
		//myChart.datasets[0].bars = imageTracker.getFormattedData();
		myChart.update();
	}
});

function Tracker(selectionElements, selectionOptions){
	this.selectionTotals = {};
	if(Array.isArray(selectionOptions)){
		selectionOptions.forEach(function(selection){
			this.selectionTotals[selection] = 0;
		}.bind(this));
	}
	this.elements = selectionElements;
	this.count = 0;

	for(var i = 0; i < this.elements.length; i++){
	this.elements[i].addEventListener('click',
		function(event){
			if (this.count < 15) {
				var imagePath = event.target.src;
				var imageFile = imagePath.substr(imagePath.lastIndexOf('/') + 1);
				this.addSelection(imageFile);
				this.setImages();
				this.count++;
			} else {
				controls.classList.remove('hide');
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
	var totals = [];
	for(var selection in this.selectionTotals){
		totals.push([selection, this.selectionTotals[selection]]);
	}
	totals.sort(function(a, b){
		return a[0] - b[0];
	});
	return totals.map(function(selection){
		return selection[1];
	});
}

var imageElements = document.querySelectorAll('.vote');
var imageTracker = new Tracker(imageElements, images);
imageTracker.setImages();
