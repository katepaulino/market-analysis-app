'use strict';

var imagePath = 'img/';
var images = [
	'bag.jpg',
	'banana.jpg',
	'chair.jpg',
	'cthulu.jpg',
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

var imageElements = document.querySelectorAll('.vote');
for(var i = 0; i < imageElements.length; i++){
	imageElements[i].addEventListener('click', function(){
		console.log(addSelection(this.src));
		setImages(imageElements);
	});
}

var addSelection = (function(){
	var selectionCounts = {};

	return function addSelection(key){
		if(selectionCounts[key]){
			selectionCounts[key]++;
		} else {
			selectionCounts[key]=1;
		}
		return selectionCounts;
	}
}());

function getRandomIndex(array){
	return Math.floor(Math.random() * array.length);
}

function getRandomElements(num, array){
	var randomElements = [];
	var validIndices = [];
	var randomIndex;
	var randomElement;

	for(var i = 0; i < array.length; i++){
		validIndices[i] = i;
	}

	while(num > 0){
		randomIndex = getRandomIndex(validIndices);
		randomElement = array[validIndices[randomIndex]];
		randomElements.push(randomElement);
		validIndices.splice(randomIndex, 1);
		num--;
	}

	return randomElements;
}

function setImages(elements){
	var randomImages = getRandomElements(elements.length, images);

	for(var i = 0; i < elements.length; i++){
		elements[i].setAttribute('src', imagePath + randomImages[i]);
	}
}

//initial setup
setImages(imageElements);
