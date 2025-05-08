editMenu = document.getElementById("settings")
triggers = [document.getElementById("trig0"),document.getElementById("trig1"),document.getElementById("trig2"),document.getElementById("trig3")]
windows = [document.getElementById("settings"),document.getElementById("settings"),document.getElementById("settings"),document.getElementById("settings")]

triggers.forEach(trigger => {
    trigger.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
});

function editWindow(num) {
    editMenu.hidden = false
}