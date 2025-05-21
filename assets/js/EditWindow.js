editMenu = document.getElementById("settings")
editOverlay = document.getElementById("edit-overlay");
triggers = [document.getElementById("trig0"),document.getElementById("trig2"),document.getElementById("trig1"),document.getElementById("trig3")]
windows = [document.getElementById("settings"),document.getElementById("settings"),document.getElementById("settings"),document.getElementById("settings")]

addEventListener("keypress", (key) => { 
    console.log(key)
    if (key.key == "e"){
        if(editOverlay.style.display == "none"){
            editOverlay.style.display = "grid"
        } else {
            editOverlay.style.display = "none"
            hideEditWindow()
        }
    }
})

triggers.forEach((trigger, i) => {
    trigger.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showEditWindow(i)
    });
});

function showEditWindow(num) {
    console.log("Window: " + num)
    editMenu.hidden = false
}

function hideEditWindow() {
    editMenu.hidden = true;
}