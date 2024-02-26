const gridDiv = document.getElementById("memory-grid");
const scoresDiv = document.getElementById("scores");

let allImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
];

let firstImage;
let secondImage;
let score = 0;
let tries = 0;
let lockBoard = false;

// function to select 8 (could be gameplay variable) random images from list of images
const selectImages = (arr) => {
  let initialImages = arr;
  let selectedImages = [];
  for (let i = 0; i < 8; i++) {
    let rand = Math.floor(Math.random() * arr.length);
    selectedImages.push(initialImages[rand]);
    initialImages.splice(rand, 1);
  }
  return selectedImages;
};

// Call function and define initial image datas
const selectedImages = selectImages(allImages);

// Duplicate images to have pairs.
let manyImages = selectedImages.concat(selectedImages);

// Shuffle order of images in array
const shuffleImages = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * arr.length - 1 + 1);
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

const shuffledImages = shuffleImages(manyImages);

const renderCard = (image) => {
  const card = document.createElement("img");
  card.classList.add("memory-card");
  card.dataset.id = image;
  card.src = `./assets/img/background_default.jpg`;
  // when selected set to:
  // card.src = `./assets/img/${card.dataset.id}`;
  card.addEventListener("click", flipCard);
  gridDiv.appendChild(card);
};

function flipCard() {
  // locked board if checking for match
  if (lockBoard) {
    return;
  }
  if (this.classList.contains("flipped")) {
    // Check if this already has already been flipped, this remains after scoring
    return;
  } else if (!firstImage) {
    // setting first image, adding fliped to list and rendering image from dataset
    firstImage = this;
    this.classList.add("flipped");
    this.src = `./assets/img/${this.dataset.id}`;

    tries += 1;
  } else if (firstImage && !secondImage) {
    // setting image, adding flipped to list, rendering image from dataset and calling checkForMatch function
    secondImage = this;
    this.src = `./assets/img/${this.dataset.id}`;
    this.classList.add("flipped");

    tries += 1;

    checkForMatch();
  }
}

function checkForMatch() {
  // if the datasets we define on creation of elements are the same, up score, refresh score innerText and check for winCondition
  if (firstImage.dataset.id === secondImage.dataset.id) {
    score += 1;
    scoreP.innerText = `${score}`;
    if (score === selectedImages.length) {
      setTimeout(() => {
        alert(`Congratulations! You won! It took you ${tries} tries`);
      }, 500);
    }
    // afterwards resetBoard for next round
    resetBoard();
    return;
  } else {
    // If no match, unflip cards
    unflipCards();
  }
}

function unflipCards() {
  // setting board to locked during unflipping
  lockBoard = true;
  // adding timeout so both images are visible for a second before being reset
  setTimeout(() => {
    // setting images back to default
    firstImage.src = `./assets/img/background_default.jpg`;
    secondImage.src = `./assets/img/background_default.jpg`;
    // Removeing Flipped from classlist
    firstImage.classList.remove("flipped");
    secondImage.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  // Resetting images to be null and unlocking the board
  [firstImage, secondImage] = [null, null];
  lockBoard = false;
}

// Create the cards on initial render
shuffledImages.forEach((image) => renderCard(image));

// Create the Score on initial render
const scoreP = document.createElement("p");
scoreP.innerText = `${score}`;
scoresDiv.appendChild(scoreP);
