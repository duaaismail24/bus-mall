'use strict';

/////////////////////// I  used DEMO REVIEW ///////////////

var imageContainer = document.getElementById('image-container');
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var productList = document.getElementById('product-list');
var allProductsArray = [];
var previouslyViewed = [];
var votesRemaining = 25;

//constructor
function Product(name) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProductsArray.push(this);
}

//Instances
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

//generate random picture//function declaration
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function productSelector() {
  console.log(allProductsArray.length);
  var firstImage = getRandomIndex(0, allProductsArray.length - 1);
  console.log('hello', firstImage);

  while (previouslyViewed.includes(firstImage)) {
    firstImage = getRandomIndex(0, allProductsArray.length - 1);
  }
  previouslyViewed.push(firstImage);
  while (previouslyViewed.length > 6) {
    previouslyViewed.shift();
  }

  var secondImage = getRandomIndex(0, allProductsArray.length - 1);
  while (previouslyViewed.includes(secondImage)) {
    secondImage = getRandomIndex(0, allProductsArray.length - 1);
  }
  previouslyViewed.push(secondImage);
  while (previouslyViewed.length > 6) {
    previouslyViewed.shift();
  }

  var thirdImage = getRandomIndex(0, allProductsArray.length - 1);
  while (previouslyViewed.includes(thirdImage)) {
    thirdImage = getRandomIndex(0, allProductsArray.length - 1);
  }
  previouslyViewed.push(thirdImage);
  while (previouslyViewed.length > 6) {
    previouslyViewed.shift();
  
  }
}

//render product
function renderProduct() {
  console.log('hi');
  productSelector();
  console.log(previouslyViewed);
  while (previouslyViewed.length > 3) {
    previouslyViewed.shift();
  }
  //assign src, alt and title
  imageOne.alt = allProductsArray[previouslyViewed[0]].name;
  imageTwo.alt = allProductsArray[previouslyViewed[1]].name;
  imageThree.alt = allProductsArray[previouslyViewed[2]].name;

  imageOne.title = allProductsArray[previouslyViewed[0]].name;
  imageTwo.title = allProductsArray[previouslyViewed[1]].name;
  imageThree.title = allProductsArray[previouslyViewed[2]].name;
  imageOne.src = allProductsArray[previouslyViewed[0]].filepath;
  imageTwo.src = allProductsArray[previouslyViewed[1]].filepath;
  imageThree.src = allProductsArray[previouslyViewed[2]].filepath;

  allProductsArray[previouslyViewed[0]].views++;
  allProductsArray[previouslyViewed[1]].views++;
  allProductsArray[previouslyViewed[2]].views++;
  
}

function renderList() {
  for (var i = 0; i < allProductsArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allProductsArray[i].name} receieved ${allProductsArray[i].votes} of votes was viewed ${allProductsArray[i].views} times`;
    productList.appendChild(liEl);
  }
}

//array that holds data
var votes = [];
var views = [];
var names = [];
var chartDrawn;
var productsData;

//function that pushes the names and votes to the arrays
function updateChartArray() {
  for (var i = 0; i < allProductsArray.length; i++) {
    votes[i] = allProductsArray[i].votes;
    views.push(allProductsArray[i].views);
    names[i] = allProductsArray[i].name;
  }
  drawChart();
}
// function for the Chart

function drawChart() {
  var data = {
    labels: names,
    datasets: [
      {
        label: 'Total Votes',
        data: votes,
        backgroundColor: 'pink',

        hoverBackgroundColor: 'white'
      },
      {
        label: 'Total Views',
        data: views,
        backgroundColor: 'blue',
        hoverBackgroundColor: 'pink'
      }
    ]
  };

  var ctx = document.getElementById('product-chart').getContext('2d');
  productsData = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            max: 10,
            min: 0,
            stepSize: 1.0
          }
        }
      ]
    }
  });
  chartDrawn = true;
}

//              *************** Local storage addition ************

//creating a variable and storing my stringified data
function createLocalStorage() {
  var stringifiedallProductsArray = JSON.stringify(allProductsArray);
  //passing stringified data into storage and giving it the key to access to my storage
  localStorage.setItem('productsArrayStorage', stringifiedallProductsArray);
}
//function im calling when loading page
function checkingLocalStorage() {
  //if local storage has something in it then it's true otherwise it will come as null and cont to else
  if (localStorage.productsArrayStorage) {
    //declaring a new var to store my storage in and using my key
    var retrieveProducts = localStorage.getItem('productsArrayStorage');
    //declaring a new var and assigning it to parse my storage data
    var parsedProducts = JSON.parse(retrieveProducts);
    //im combining my all my storage into the variable that will hold my new data
    allProductsArray = parsedProducts;
    renderProduct();
  } else {
    renderProduct();
  }
}

//event listener
imageContainer.addEventListener('click', handleClick);
//event handler
function handleClick(event) {
  votesRemaining--;
  console.log(votesRemaining);
  for (var i = 0; i < allProductsArray.length; i++) {
    if (event.target.alt === allProductsArray[i].name) {
      allProductsArray[i].votes++;
    }
  }
  if (votesRemaining === 0) {
    imageContainer.removeEventListener('click', handleClick);
    alert ('you only got 25');
    renderList();
    updateChartArray();
    createLocalStorage();
  }
  renderProduct();
}
checkingLocalStorage();