let currentImageIndex = 0;
let score = 0;

let images = [
    { src: 'image1.jpg', potato: { x: 500, y: 400 }, found: false },
    { src: 'image2.jpg', potato: { x: 380, y: 100 }, found: false },
    { src: 'image3.jpg', potato: { x: 390, y: 30 }, found: false },
    { src: 'image4.jpg', potato: { x: 440, y: 100 }, found: false },
    { src: 'image5.jpg', potato: { x: 500, y: 200 }, found: false }
];

// List of "try again" messages
const tryAgainMessages = [
    'No potato',
    'Nope',
    'Not there',
    'Close',
    'Try again',
];

function showImage(index) {
    const image = images[index];
    const gameImage = document.getElementById('game-image');
    gameImage.src = image.src;

    // Reset the message
    document.getElementById('message').innerHTML = '';
}

function checkClick(event) {
    const image = images[currentImageIndex];

    // Check if the potato has already been found for the current image
    if (image.found) {
        document.getElementById('message').innerText = 'You already found the potato';
        return;  // Don't process further if the potato is already found
    }

    const rect = event.target.getBoundingClientRect();

    // Calculate the click position relative to the image
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the potato's coordinates
    const potato = image.potato;
    if (Math.abs(x - potato.x) < 30 && Math.abs(y - potato.y) < 30) {
        // Increase score only if the potato has not been found already
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;

        // Mark the potato as found
        image.found = true;

        // Show success message
        document.getElementById('message').innerText = 'Potato!';
    } else {
        // Randomize "try again" messages
        const randomMessage = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
        document.getElementById('message').innerText = randomMessage;
    }
}

function showNextImage() {
    // Reset the found flag for the next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function showPrevImage() {
    // Reset the found flag for the previous image
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

// Initialize the game by showing the first image
showImage(currentImageIndex);

