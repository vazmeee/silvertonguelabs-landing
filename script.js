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
