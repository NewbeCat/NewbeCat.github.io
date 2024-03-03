const images = ["0.PNG", "1.PNG", "2.PNG"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;

document.body.style.backgroundImage = `url(img/${chosenImage})`;
