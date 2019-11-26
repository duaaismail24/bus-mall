'use strict';
var images = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'bubblegum',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];
// var shownImages = []
var attempts = 5;
var leftImage = document.querySelector('#leftImage');
var rightImage = document.querySelector('#rightImage');
var centerImage = document.querySelector('#centerImage');
var sectionImages = document.querySelector('#sectionImages');



function Bus(nam) {
  this.name = nam;
  this.imagePath = `img/${nam}.jpg`;
  this.votes = 0;
  this.views = 0;
  Bus.all.push(this);
}

Bus.all = [];
// Bus.votes++;
// console.log(Bus.all.votes)

for (let i = 0; i < images.length; i++) {
  new Bus(images[i]);
}
function render() {

  while (leftBus === rightBus || centerBus === leftBus || centerBus === rightBus) {

    var leftBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
    var centerBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
    var rightBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
  }
  leftBus.views++;
  centerBus.views++;
  rightBus.views++;
  leftImage.setAttribute('src', leftBus.imagePath);
  leftImage.setAttribute('alt', leftBus.name);
  leftImage.setAttribute('title', leftBus.name);
  centerImage.setAttribute('src', centerBus.imagePath);
  centerImage.setAttribute('alt', centerBus.name);
  centerImage.setAttribute('title', centerBus.name);
  rightImage.setAttribute('src', rightBus.imagePath);
  rightImage.setAttribute('alt', rightBus.name);
  rightImage.setAttribute('title', rightBus.name);

}
render();

sectionImages.addEventListener('click', handleClick);
function handleClick(e) {
  if (e.target.id !== 'sectionImages') {
    attempts--;
    if (attempts > 0) {
      for (let i = 0; i < Bus.all.length; i++) {
        if (e.target.title === Bus.all[i].name) {
          Bus.all[i].votes++;
        }
      }
      render();

      // console.table(Bus.all);
    } else if (attempts === 0) {
      sectionImages.removeEventListener('click', handleClick);
      alert('Only 25 attempt!');
 

    }
  }
}
// console.log(Bus.votes)


function buslist() {
  var sectionEl = document.getElementById('list');
  var ulEl = document.createElement('ul');
  sectionEl.appendChild(ulEl);
  for (var i = 0; i < Bus.all.length; i++); {

    var liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${images[i]} had ${Bus.all[i].votes} number of votes and it appeared ${Bus.all[i].views}`;

  }
}
buslist();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


