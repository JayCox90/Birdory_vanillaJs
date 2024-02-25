// import image1 from "./assets/img/1.jpg";

const gridDiv = document.getElementById("memory-grid");

console.log(gridDiv);
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
console.log(shuffledImages);

const renderCard = (image) => {
  const card = document.createElement("img");
  card.classList.add("memory-card");
  card.dataset.id = card;
  card.src = `./assets/img/${image}`;
  gridDiv.appendChild(card);
};

shuffledImages.forEach((image) => renderCard(image));
