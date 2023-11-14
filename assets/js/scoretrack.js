//Load scores
var loadScores = JSON.parse(localStorage.getItem("scores"));

// Get elements
var goBackBtn = document.querySelector("#go-back");
var clearHighscoresBtn = document.querySelector("#clear-highscore");
var scoreListEl = document.getElementById("score-list");

// Load the scores if any exist, and put them into a list
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

// Go to quiz when clicked
goBackBtn.addEventListener("click", function(event) {
    window.location.href = "index.html";
})

// Clear out storage and reload page when clicked
clearHighscoresBtn.addEventListener("click", function(event) {
    localStorage.setItem("scores", null);
    location.reload();
})