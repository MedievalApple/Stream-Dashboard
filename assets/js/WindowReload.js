function initAutoReload() {
    setInterval(autoReload, 300000)
}

async function autoReload() {
    reloadableFrames = document.getElementsByClassName("auto-reload")

    for (var i = 0; i < reloadableFrames.length; i++) {
        frame = reloadableFrames[i]
        src = frame.src
        frame.src = ""
        frame.src = src
    }
}