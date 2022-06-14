

const loader = document.getElementById("loader");
document.getElementById("btn").onclick = async function() {
    loader.style.display = "block";
    let title = document.getElementById("inp").value;

    let promise = await fetch(`/title/${title}`);
    let json = await promise.json();

    loader.style.display = "none";

    let kod = "";

    if(json?.results.length > 0) {
        json.results.forEach(movie => {
            kod += `
            <div class="poster">
                <a href="movie/?id=${movie.id}">
                    <img src="${movie.image}" />
                    <p>${movie.title}</p>
                </a>
            </div>`;
        });
    }
    else 
        kod = "<h1>Movie not found:(</h1>"

    document.getElementById("movie").innerHTML = kod;

}

