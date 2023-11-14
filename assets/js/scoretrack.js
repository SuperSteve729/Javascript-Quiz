//Load scores
var loadScores = JSON.parse(localStorage.getItem("scores"));

// Get elements
var goBackBtn = document.querySelector("#go-back");
var clearHighscoresBtn = document.querySelector("#clear-highscore");
var scoreListEl = document.getElementById("score-list");

if (loadScores != null) {
    for (var i = 0; i < loadScores.length; i++) {
        var liScore = document.createElement("li");

        liScore.textContent = loadScores[i];
        if (i == 0 || i % 2 == 0) {
            liScore.style.backgroundColor = "plum";
        }
        scoreListEl.appendChild(liScore);
    }
}




goBackBtn.addEventListener("click", function(event) {
    window.location.href = "index.html";
})

clearHighscoresBtn.addEventListener("click", function(event) {
    localStorage.setItem("scores", null);
    location.reload();
})