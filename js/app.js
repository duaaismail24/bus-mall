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
var shownImages = []
var attempts = 25;
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

for (let i = 0; i < images.length; i++) {
  new Bus(images[i]);
}
function render() {
  // while (leftBus === rightBus || centerBus === leftBus || centerBus === rightBus) {
    var leftBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
    var centerBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
    var rightBus = Bus.all[randomNumber(0, Bus.all.length - 1)];
    var show = Bus.all
//     switch (show) {

//       case leftBus === rightBus || centerBus === leftBus || centerBus === rightBus:
//         break;

//           case views = 5:
// break;
            

//           alert("attempt is " + i++); 
//           break;
    
  
    
  

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

function handleClick(e) {

  if (e.target.id !== 'sectionImages') {
    for (let i = 0; i < Bus.all.length; i++ ){
      if (e.target.title === Bus.all[i].name) {
        Bus.all[i].votes++;

    }
    } 
  render(); 
  }
}
// imageSection.addEventLitener('click', handleClick);
sectionImages.addEventListener('click',handleClick);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

  function displayImage(){

    var num = Math.floor(Math.random() * (Bus.all));
    document.canvas.src = images[num];
  }

  //   shownImages.unshift(images.splice(num,num+1));

  //   if(images.length == 0){
  //    images = shownImages;
  //    shownImages = [];

  //    return shownImages[0];

    }
  
