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

    document.getElementById('notification-permission-button').addEventListener('click', () => {
        Notification.requestPermission().then(function(result) {
            if(result === 'granted') {
                setTimeout(
                    () => {
                        showNotification('This is the title!', 'Notifications will appear like this!!', 'https://res.cloudinary.com/dkb1nvu7q/image/upload/v1582885486/grid.png')
                    }, 4000
                )
            }
        });
    })

    document.getElementById('notification-button').addEventListener('click', notificationButtonClicked);
});

function notificationButtonClicked() {
    setTimeout(
        () => {
            showNotification('This is the title!', 'Notifications will appear like this!!', 'https://res.cloudinary.com/dkb1nvu7q/image/upload/v1582885486/grid.png')
        }, 4000
    )
}

function showNotification(title, text, imageSrc) {
    const options = {
        body: text,
        icon: imageSrc,
    };
    new Notification(title, options);
}