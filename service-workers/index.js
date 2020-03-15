if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log("Window loaded!")
        navigator.serviceWorker.register('/serviceWorker.js').then(
            (registration) => {
                console.log('Service worker registered!!', registration);
            },
            (err) => {
                console.log(err);
            }
        )
    })
}

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('img').src = 'https://res.cloudinary.com/dkb1nvu7q/image/upload/v1582885486/grid.png';
    }, 3000);
})