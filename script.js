// Get all necessary elements from the page
const scene = document.getElementById('scene');
const crystalBox = document.getElementById('crystalBox');
const heartContainer = document.getElementById('heartContainer');
const messageContainer = document.getElementById('messageContainer');
const promptText = document.getElementById('promptText');
const partyCanvas = document.getElementById('party-canvas');

// The main text for the typewriter
const mainMessageText = "لولو القمررررررر";
const subMessageText = "بحبك كثييير ويارب تكوني دايما بخير 💖";

// --- Typewriter Function ---
function typewriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = "";
    element.classList.add('typing-cursor');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
            if (callback) callback();
        }
    }
    type();
}

// --- Main Click Event ---
crystalBox.addEventListener('click', () => {
    // 1. Start the unboxing and camera flight animations
    promptText.classList.add('hidden');
    crystalBox.classList.add('open');
    scene.classList.add('zoom-in');
    heartContainer.classList.add('face-camera');

    // 2. Listen for the camera flight (scene transition) to end
    scene.addEventListener('transitionend', () => {
        // This code runs only ONCE after the zoom is complete

        // Change background and start the party
        document.body.classList.add('celebration');
        partyCanvas.style.zIndex = '10'; // Bring canvas to the front
        startParty();
        
        // Make the heart beat
        heartContainer.classList.add('beating');

        // Make the message container visible and start typing
        messageContainer.classList.add('visible');
        typewriter(document.getElementById('main-message'), mainMessageText, 100, () => {
            typewriter(document.getElementById('sub-message'), subMessageText, 75);
        });

    }, { once: true }); // The { once: true } option is crucial! It ensures this event only fires one time.
});


// --- Confetti & Hearts Party Function ---
function startParty() {
    const myConfetti = confetti.create(partyCanvas, { resize: true, useWorker: true });

    // A burst of confetti from the center
    myConfetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.5 },
        shapes: ['heart', 'star'],
        colors: ['#ffc0cb', '#ff79ac', '#ffffff', '#ff007f']
    });

    // And a gentle rain for a few seconds
    const duration = 8 * 1000;
    const end = Date.now() + duration;
    
    (function frame() {
        myConfetti({
            particleCount: 2,
            angle: 270,
            spread: 90,
            origin: { y: 0, x: Math.random() },
            shapes: ['star'],
            colors: ['#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

}
