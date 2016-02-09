'use strict';

var imagePath = 'img/';
var images = ['bag.jpg','banana.jpg','chair.jpg','cthulhu.jpg','dragon.jpg','pen.jpg','scissors.jpg','shark.jpg','sweep.jpg','unicorn.jpg','usb.jpg','watercan.jpg','wineglass.jpg'];

function Tracker(elements){
	this.selectionTotals = {};
	this.elements = elements;

	for(var i = 0; i < this.elements.length; i++){
	this.elements[i].addEventListener('click',
		function(event){
			var imagePath = event.target.src;
			var imageFile = imagePath.substr(imagePath.lastIndexOf('/') + 1);
			this.addSelection(imageFile);
			this.setImages();
		}.bind(this));
			var voteCounter
			if (this.roundNumber < 15) {
				this.getRandomElements();
				this.roundNumber += 1;
			} else {
				console.log("survey over");
			}
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

var imageElements = document.querySelectorAll('.vote');
var imageTracker = new Tracker(imageElements);
imageTracker.setImages();

var data = {
	labels: ["bag", "banana", "boots", "chair", "cthulhu", "dragon", "pen", "scissors", "shark", "sweep", "unicorn", "usb", "watercan", "wineglass"],
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
formEl.addEventListener('submit', function(event) {
  event.preventDefault();
});

var results = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(results).Bar(data);
