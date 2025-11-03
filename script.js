let currentImageIndex = 0;
let score = 0;

let images = [
    { src: 'image1.jpg', potato: { x: 500, y: 400 }, found: false },
    { src: 'image2.jpg', potato: { x: 380, y: 100 }, found: false },
    { src: 'image3.jpg', potato: { x: 390, y: 22 }, found: false },
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

// Show the image at the given index
function showImage(index) {
    const gameImage = document.getElementById('game-image');
    const image = images[index];
    gameImage.src = image.src;  // Just change the image source

    // Reset the message
    document.getElementById('message').innerHTML = '';
}

// Handle both touchend and click events
function checkClick(event) {
    const image = images[currentImageIndex];

    // Check if the potato has already been found for the current image
    if (image.found) {
        // If the potato was found already, show the "already found" message
        document.getElementById('message').innerText = 'You already found the potato';
        return;  // Exit the function if the potato is already found
    }

    let x, y;
    if (event.type === "touchend") {
        // Handle touch event (for mobile)
        const touch = event.changedTouches[0]; // Get the touch end point
        x = touch.pageX;
        y = touch.pageY;
    } else {
        // Handle mouse click event (for desktop)
        x = event.clientX;
        y = event.clientY;
    }

    // Get the position of the image in the viewport
    const rect = event.target.getBoundingClientRect();

    // Log the touch/click coordinates and the image position for debugging
    console.log('Click/Tap coordinates: ', x, y);
    console.log('Image rect: ', rect);

    // Calculate the click position relative to the image
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    // Log the relative click position for debugging
    console.log('Relative position inside image: ', relativeX, relativeY);

    // Get the scale factor based on the image's displayed size
    const scaleX = rect.width / 600;  // Assuming the original image width is 600px
    const scaleY = rect.height / 400;  // Assuming the original image height is 400px

    // Scale the potato's coordinates based on the displayed size of the image
    const scaledPotatoX = image.potato.x * scaleX;
    const scaledPotatoY = image.potato.y * scaleY;

    // Log the scaled potato position
    console.log('Scaled potato position: ', scaledPotatoX, scaledPotatoY);

    // Check if the click is within the scaled potato's coordinates
    if (Math.abs(relativeX - scaledPotatoX) < 30 && Math.abs(relativeY - scaledPotatoY) < 30) {
        // Increase score only if the potato has not been found already
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;

        // Mark the potato as found
        image.found = true;

        // Show success message with potato emoji
        document.getElementById('message').innerText = '🥔';
    } else {
        // Randomize "try again" messages
        const randomMessage = tryAgainMessages[Math.floor(Math.random() * tryAgainMessages.length)];
        document.getElementById('message').innerText = randomMessage;
    }
}

// Show the next image
function showNextImage() {
    // Reset the found flag for the next image
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

// Show the previous image
function showPrevImage() {
    // Reset the found flag for the previous image
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

// Initialize the game by showing the first image
showImage(currentImageIndex);

// Add event listeners for both mouse and touchend events
const gameImage = document.getElementById('game-image');
gameImage.addEventListener("click", checkClick);
gameImage.addEventListener("touchend", checkClick, { passive: true });
