editMenu = document.getElementById("settings")
editOverlay = document.getElementById("edit-overlay");
triggers = [document.getElementById("trig0"),document.getElementById("trig2"),document.getElementById("trig1"),document.getElementById("trig3")]
windows = [document.getElementById("win0"),document.getElementById("win1"),document.getElementById("win2"),document.getElementById("win3")]

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
        document.getElementById("winpreset").value = "e"
        refreshEditWindow()
        showEditWindow(i)
    });
});

window.addEventListener("load", (event) => {
    if(localStorage.getItem("win0") != null){
        windows[0].innerHTML = localStorage.getItem("win0")
    }
    if(localStorage.getItem("win1") != null){
        windows[1].innerHTML = localStorage.getItem("win1")
    }
    if(localStorage.getItem("win2") != null){
        windows[2].innerHTML = localStorage.getItem("win2")
    }
    if(localStorage.getItem("win3") != null){
        windows[3].innerHTML = localStorage.getItem("win3")
    }
    initServiceStatus()
});

function SaveWindows() {
    localStorage.setItem("win0", windows[0].innerHTML);
    localStorage.setItem("win1", windows[1].innerHTML);
    localStorage.setItem("win2", windows[2].innerHTML);
    localStorage.setItem("win3", windows[3].innerHTML);
}

document.getElementById("winpreset").addEventListener('change', (e) => {
    refreshEditWindow()
})

function refreshEditWindow() {
    if(document.getElementById("winpreset").value != "e"){
        document.getElementById("embedurl").style.display = "none"
    }else {
        document.getElementById("embedurl").style.display = ""
    }
    if(document.getElementById("winpreset").value == "s"){
        document.getElementById("wintitleid").style.display = "none"
    }else {
        document.getElementById("wintitleid").style.display = ""
    }
    document.getElementById("wintitle").value = ""
    document.getElementById("embedurltext").value = ""
}

function showEditWindow(num) {
    console.log("Window: " + num)
    document.getElementById("winsave").addEventListener("click", (e) => {
        saveWindow(num)
        console.log("SAVING....")
    });
    editMenu.hidden = false
}

function saveWindow(num) {
    const preset = document.getElementById("winpreset").value
    const wintitle = document.getElementById("wintitle").value
    const embedurl = document.getElementById("embedurltext").value

    if(wintitle != ""){
        windows[num].innerHTML = `<h3>${wintitle}</h3>`
    } else {
        windows[num].innerHTML = ""
    }

    if(preset == "e"){
        windows[num].innerHTML += `<iframe src=\"${embedurl}\" frameborder=\"0\"></iframe>`
    } else if (preset == "b") {
        windows[num].innerHTML += "<iframe id=\"ytplayer\" type=\"text/html\" src=\"https://www.youtube.com/embed/?listType=playlist&list=PLAEQD0ULngi6ji60yHxippnAAWQZIXnu-&mute=1&autoplay=1&cc_load_policy=1&controls=0&loop=1&modestbranding=1&color=white\" frameborder=\"0\"></iframe>"
    } else if (preset == "a") {
        windows[num].innerHTML += "<iframe src=\"https://player.twitch.tv/?channel=amiibots&parent=dash.medievalapple.net\" frameborder=\"0\" allowfullscreen=\"false\" scrolling=\"no\"></iframe>"
    } else if (preset == "s") {
        windows[num].innerHTML += "<h3>MSU Service Status</h3><div class=\"service-status\"><div class=\"lights\"><a href=\"https://servicestatus.msu.edu/\" class=\"light\"><div id=\"upLight\" class=\"circle\"><span id=\"upNum\" class=\"cairo\">0</span></div><span>UP</span></a><a href=\"https://servicestatus.msu.edu/\" class=\"light\"><div id=\"affLight\" class=\"circle\"><span id=\"affNum\" class=\"cairo\">0</span></div><span>AFFECTED</span></a><a href=\"https://servicestatus.msu.edu/\" class=\"light\"><div id=\"downLight\" class=\"circle\"><span id=\"downNum\" class=\"cairo\">0</span></div><span>DOWN</span></a></div><span>Notifications</span><div class=\"notify\"><div id=\"events\" class=\"events\"><div id=\"no-events\" class=\"center-event\"><span>No Current Events</span></div></div></div></div></div>"
    } else if (preset == "r") {
        windows[num].innerHTML += "<iframe src=\"https://streaming.swankmp.net/msuspartans\" frameborder=\"0\"></iframe>"
    } else if (preset == "l") {
        windows[num].innerHTML += "<iframe src=\"https://g1.ipcamlive.com/player/player.php?alias=61fac12eabc0a&skin=white&autoplay=1&mute=1\" frameborder=\"0\"></iframe>"
    }

    SaveWindows()

    const oldsave = document.getElementById("winsave")
    const newsave = oldsave.cloneNode(true)
    oldsave.parentNode.replaceChild(newsave, oldsave);

    hideEditWindow()
}

function hideEditWindow() {
    editMenu.hidden = true;
}