// script.js

// Define the images and their hidden potato locations (coordinates)
const gameData = [
    { 
        image: 'image1.jpg', 
        potatoLocation: { x: 250, y: 200 } // Potato location for image 1
    },
    { 
        image: 'image2.jpg', 
        potatoLocation: { x: 300, y: 150 } // Potato location for image 2
    },
    { 
        image: 'image3.jpg', 
        potatoLocation: { x: 100, y: 250 } // Potato location for image 3
    },
    { 
        image: 'image4.jpg', 
        potatoLocation: { x: 400, y: 300 } // Potato location for image 4
    },
    { 
        image: 'image5.jpg', 
        potatoLocation: { x: 350, y: 400 } // Potato location for image 5
    }
];

let currentLevel = 0;  // Keeps track of the current image

const gameImage = document.getElementById('game-image');
const messageDiv = document.getElementById('message');
const nextButton = document.getElementById('nextButton');

// Function to load the next image and set the potato location
function loadImage(level) {
    const data = gameData[level];
    gameImage.src = data.image;
    gameImage.setAttribute('data-x', data.potatoLocation.x);
    gameImage.setAttribute('data-y', data.potatoLocation.y);
    messageDiv.textContent = ''; // Reset message
    nextButton.style.display = 'none'; // Hide Next button
}

// When the image is clicked, check if the click is near the potato
gameImage.addEventListener('click', function(event) {
    const rect = gameImage.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const potatoX = parseInt(gameImage.getAttribute('data-x'));
    const potatoY = parseInt(gameImage.getAttribute('data-y'));
    const tolerance = 30; // Define tolerance range for click (pixels)

    if (Math.abs(clickX - potatoX) < tolerance && Math.abs(clickY - potatoY) < tolerance) {
        messageDiv.textContent = 'You found the potato!';
        messageDiv.style.color = 'green';
        nextButton.style.display = 'inline-block'; // Show Next button
    } else {
        messageDiv.textContent = 'Try again!';
        messageDiv.style.color = 'red';
    }
});

// Move to the next level when the Next button is clicked
nextButton.addEventListener('click', function() {
    if (currentLevel < gameData.length - 1) {
        currentLevel++;
        loadImage(currentLevel);
    } else {
        messageDiv.textContent = 'Congratulations! You found all the potatoes!';
        nextButton.style.display = 'none'; // Hide Next button when all levels are completed
    }
});

// Load the first image when the page loads
loadImage(currentLevel);
