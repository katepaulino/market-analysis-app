'use strict';

var imagePath = 'img/';
var images = [
	'bag.jpg',
	'banana.jpg',
	'chair.jpg',
	'cthulhu.jpg',
	'dragon.jpg',
	'pen.jpg',
	'scissors.jpg',
	'shark.jpg',
	'sweep.jpg',
  'unicorn.jpg',
  'usb.jpg',
  'watercan.jpg',
  'wineglass.jpg',
];


function Tracker(elements){
	this.selectionTotals = {};
	this.elements = elements;

	for(var i = 0; i < imageElements.length; i++){
	imageElements[i].addEventListener('click', 
		function(event){
			var imagePath = event.target.src;
			var imageFile = imagePath.substr(imagePath.lastIndexOf('/') + 1);
			this.addSelection(imageFile);
			this.setImages();
		}.bind(this));
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

//initial setup
var imageElements = document.querySelectorAll('.vote');
var imageTracker = new Tracker(imageElements);
imageTracker.setImages();
