const upNum = document.getElementById("upNum")
const affectedNum = document.getElementById("affNum")
const downNum = document.getElementById("downNum")
const upLight = document.getElementById("upLight")
const affectedLight = document.getElementById("affLight")
const downLight = document.getElementById("downLight")

updateTrafficLight("")

setInterval(updateTrafficLight, 100000)

async function updateTrafficLight() {

    const status = await MakeStatusApiRequest("")

    console.log(status.counters)

    upNum.innerHTML = status.counters.count_status_1
    affectedNum.innerHTML = status.counters.count_status_2
    downNum.innerHTML = status.counters.count_status_3

    if (status.counters.count_status_1 > 0) {
        upLight.style.backgroundColor = "darkgreen"
    }

    if (status.counters.count_status_2 > 0) {
        affectedLight.style.backgroundColor = "gold"
    }

    if (status.counters.count_status_3 > 0) {
        downLight.style.backgroundColor = "darkred"
    }

}