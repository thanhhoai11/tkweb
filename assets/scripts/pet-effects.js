// Pet Effects - Thêm vào scripts/pet-effects.js

// Random pet sounds on click (visual feedback)
const petSounds = ['🐕 Woof!', '🐈 Meow!', '🐾 Purr~', '💕 Love!'];
document.addEventListener('click', function(e) {
    if (e.target.closest('.cta-button') || e.target.closest('.card')) {
        const sound = document.createElement('div');
        sound.textContent = petSounds[Math.floor(Math.random() * petSounds.length)];
        sound.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 24px;
            font-weight: bold;
            color: #FFB6C1;
            pointer-events: none;
            z-index: 10000;
            animation: popUp 1s ease-out forwards;
        `;
        document.body.appendChild(sound);
        
        setTimeout(() => sound.remove(), 1000);
    }
});

// Easter egg: Click hero 5 times for special effect
let clickCount = 0;
const heroElement = document.querySelector('.hero');
if (heroElement) {
    heroElement.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            const celebration = document.createElement('div');
            celebration.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 100px;
                z-index: 10001;
                animation: celebrate 2s ease-out forwards;
            `;
            celebration.textContent = '🐕🐈💕🐾';
            document.body.appendChild(celebration);
            
            setTimeout(() => celebration.remove(), 2000);
            clickCount = 0;
        }
    });
}

console.log('🐾 Pet effects loaded successfully!');