function resizeVideo() {
    const video = document.getElementById('responsiveVideo');
    const container = video.parentElement;
    const containerAspectRatio = container.clientWidth / container.clientHeight;
    const videoAspectRatio = video.videoWidth / video.videoHeight;

    let reservedSpace;
    if (containerAspectRatio > 1) {
        reservedSpace = 70 + (containerAspectRatio - 1) * 30;
    } else {
        reservedSpace = 70;
    }

    document.documentElement.style.setProperty('--reserved-space', `${reservedSpace}px`);
    document.documentElement.style.setProperty('--aspect-ratio', containerAspectRatio);

    if (containerAspectRatio > videoAspectRatio) {
        video.style.width = '100%';
        video.style.height = 'auto';
    } else {
        video.style.width = 'auto';
        video.style.height = '100%';
    }
    video.style.transform = 'translate(-50%, -50%)';
}

// Resize the video on window resize, load, and video metadata load
window.addEventListener('resize', resizeVideo);
window.addEventListener('load', resizeVideo);
window.addEventListener('loadedmetadata', resizeVideo);

// Enable video playback on mobile devices
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('responsiveVideo');
    video.play().catch(error => {
        console.log('Autoplay prevented, enabling on user interaction');
        document.body.addEventListener('click', () => {
            video.play();
        }, { once: true });
    });

    const header = document.querySelector('header');
    const hero = document.querySelector('#hero');
    const headerHeight = header.offsetHeight;

    window.onscroll = function() {
        if (window.pageYOffset > (hero.offsetHeight - headerHeight)) {
            header.classList.remove('bottom-nav');
            header.classList.add('fixed-nav');
        } else {
            header.classList.add('bottom-nav');
            header.classList.remove('fixed-nav');
        }
    };

    // Add form submission event listener
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('last-name').value,
            role: document.getElementById('role').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            objective: document.getElementById('objective').value,
            email: document.getElementById('email').value
        };

        fetch('http://localhost:5000/add-to-airtable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Record added successfully');
                } else {
                    alert('Something went wrong. Try again later');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Try again later');
            });
    });
});
