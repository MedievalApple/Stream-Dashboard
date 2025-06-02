let upNum
let affectedNum
let downNum
let upLight
let affectedLight
let downLight

function initServiceStatus() {
    upNum = document.getElementById("upNum")
    affectedNum = document.getElementById("affNum")
    downNum = document.getElementById("downNum")
    upLight = document.getElementById("upLight")
    affectedLight = document.getElementById("affLight")
    downLight = document.getElementById("downLight")

    updateTrafficLight()
    updateNotifications()

    setInterval(updateTrafficLight, 100000)
    setInterval(updateNotifications, 100000)
}

async function updateTrafficLight() {

    const status = await MakeStatusApiRequest("msu-status")

    console.log(status.counters)

    upNum.innerHTML = status.counters.count_status_1
    affectedNum.innerHTML = status.counters.count_status_2
    downNum.innerHTML = status.counters.count_status_3

    if (status.counters.count_status_1 > 0) {
        upLight.style.backgroundColor = "darkgreen"
    } else {
        upLight.style.backgroundColor = "rgb(88, 88, 88)"
    }

    if (status.counters.count_status_2 > 0) {
        affectedLight.style.backgroundColor = "rgb(212, 181, 0)"
    } else {
        affectedLight.style.backgroundColor = "rgb(88, 88, 88)"
    }

    if (status.counters.count_status_3 > 0) {
        downLight.style.backgroundColor = "darkred"
    } else {
        downLight.style.backgroundColor = "rgb(88, 88, 88)"
    }

}

async function updateNotifications() {
    const eventsHolder = document.getElementById("events")

    const incidents = await MakeStatusApiRequest("msu-incidents")
    const maintenances = await MakeStatusApiRequest("msu-maintenances")

    console.log(incidents)
    console.log(maintenances)

    eventsHolder.innerHTML = "<div id=\"no-events\" class=\"center-event\"><span>No Current Events</span></div>"

    if (incidents.length > 0 || maintenances.length > 0) {
        document.getElementById("no-events").style.display = "none"
    } else {
        document.getElementById("no-events").style.display = ""
    }

    incidents.forEach(incident => {
        console.log(incident.id)
        console.log(incident.title)
        eventsHolder.innerHTML += `<div class=\"event\"><div class=\"event-circle\"></div><div class=\"event-title\"><div class=\"right-to-left\">${incident.title}</div></div><a href=\"https://servicestatus.msu.edu/incidents/${incident.id}\">More Details</a></div>`
    });

    maintenances.forEach(maintenance => {
        console.log(maintenance.id)
        console.log(maintenance.title)
        eventsHolder.innerHTML += `<div class=\"event\"><div class=\"event-circle\"></div><div class=\"event-title\"><div class=\"right-to-left\">${maintenance.title}</div></div><a href=\"https://servicestatus.msu.edu/maintenances/${maintenance.id}\">More Details</a></div>`
    });
}