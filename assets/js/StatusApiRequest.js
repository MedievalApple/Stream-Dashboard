const host = "https://servicestatus.msu.edu/api";

async function MakeStatusApiRequest(apiData)
{
    const response = await fetch(host + apiData, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            //"Content-Type": "application/json",
        }
    });

    return response.json();
}

console.log(MakeStatusApiRequest("/blocks/traffic_lights/v1"))