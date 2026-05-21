const palette = document.getElementById('commandPalette');
const cmdInput = document.getElementById('cmdInput');

// Keyboard Listeners
document.addEventListener('keydown', (e) => {
    // Command Palette
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        palette.classList.toggle('hidden');
        if (!palette.classList.contains('hidden')) cmdInput.focus();
    }
    
    // Escape to close
    if (e.key === 'Escape') palette.classList.add('hidden');

    // Gallery Arrows
    if (e.key === 'ArrowRight') console.log("Next image");
    if (e.key === 'ArrowLeft') console.log("Prev image");
});

// Focus management
document.querySelectorAll('button, img').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('focus', () => el.classList.add('focused'));
    el.addEventListener('blur', () => el.classList.remove('focused'));
});