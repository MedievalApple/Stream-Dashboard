async function MakeStatusApiRequest(subdomain)
{
    const response = await fetch(`https://${subdomain}.medievalapple.workers.dev/`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            //"Content-Type": "application/json",
        }
    });

    return response.json();
}