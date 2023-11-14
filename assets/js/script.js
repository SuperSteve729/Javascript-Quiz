// Questions Section, all in order and question array matches in position with responses
var questionsObj = {
    questions: [
        "Commonly used data types DO Not include:",
        "The condition in an if / else statement is enclosed with ______.",
        "Arrays in JavaScript can be used to store ______.",
        "String values must be enclosed within ______ when being assigned to variables.",
        "A very useful tool used during development and debugging for printing content to the debugger is:",
    ],
    
    /* 
        First number in array is the correct response to the question
        Everything else is the answers
        Make sure it is in the correct order so that way the right response is in the right position
        Technically speaking, this format should allow for infinite answers, hasn't been tested though
    */
    responses: [
        [
            3,
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        [
            3,
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        [
            4,
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        [
            3,
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        [
            4,
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ]
    ]
}
// Highscore Storage
var allScores = [];


// All the variables looking for elements on the HTML
var startButton = document.querySelector("#start");
var textTimer = document.getElementById("score-timer");
var starterText = document.getElementById("starter-text")
var questionText = document.getElementById("question-text");
var responseArea = document.getElementById("response-sect");
var answerText = document.getElementById("answer-text");

// Variables for the quiz
var scoreTime = 75;
var questionNum = 0;

//Function for when the start button is pressed
function onStart(event) {
    event.preventDefault();
    starterText.style.display = "none";
    startButton.remove();
    questionText.style.textAlign = "left";
    startTimer();
    makeNewQuestion();
}

function startTimer() {
    textTimer.textContent = "Time: " + scoreTime;
    var timer = setInterval(function() {   
        if (scoreTime <= 0 || questionNum > questionsObj.questions.length) {
            clearInterval(timer);
        }
        scoreTime--;
        textTimer.textContent = "Time: " + scoreTime;
    }, 1000);
}

// Generate a new question at the start and when the user selects an option
// This also functions as the end section, when the user has finished the quiz
function makeNewQuestion() {
    questionNum++;
    if(questionNum <= questionsObj.questions.length) {
        questionText.textContent = questionsObj.questions[questionNum - 1];
        for(var i = 0; i < questionsObj.responses.length; i++) {
            if(i != 0) {
                var ansBtn = document.createElement("button");

                ansBtn.classList.add("btn");
                if (i == questionsObj.responses[questionNum - 1][0]) {
                    ansBtn.setAttribute("id", "right");
                }
                
                ansBtn.textContent = questionsObj.responses[questionNum - 1][i];
                ansBtn.addEventListener("click", clickResponse);

                responseArea.appendChild(ansBtn);
            }

        }

    } else {
        var miscSect = document.getElementById("misc-sect")
        var initialsLabel = document.createElement("label");
        var initialsInput = document.createElement("input");
        var submitButton = document.createElement("input");

        initialsLabel.setAttribute("for", "initials");
        initialsLabel.textContent = "Enter initials: "

        initialsInput.setAttribute("type", "text");
        initialsInput.setAttribute("id", "initials");
        initialsInput.setAttribute("maxlength", "2");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("id", "submit-init");
        submitButton.style.marginLeft = "5px"
        submitButton.addEventListener("click", submitScore);
        
        miscSect.appendChild(initialsLabel);
        miscSect.appendChild(initialsInput);
        miscSect.appendChild(submitButton);

        starterText.style.display = "block";
        starterText.style.textAlign = "left";
        starterText.textContent = "Your final score is " + scoreTime + "!";
        questionText.textContent = "All done!";
    }

}

// This function makes text at the bottom display letting the user know if they got the answer right or wrong
function makeAnswerText(textToDisplay) {
    answerText.style.display = "block";
    answerText.textContent = textToDisplay;

    var timeCount = 0;
    var ansTimer = setInterval( function() {
        timeCount++;
        if (timeCount >= 1) {
            answerText.style.display = "none";
            clearInterval(ansTimer);
        }
    }, 1000)
}

// This function checks when the user selects an option from the answers
function clickResponse(event) {
    var element = event.target;

    if (element.matches("button") === true) {
        if(event.target.id !== "right") {
            scoreTime -= 15;
            makeAnswerText("Wrong!");
        } else {
            makeAnswerText("Correct!");
        }

        responseArea.innerHTML = "";
        makeNewQuestion();

    }
}

function submitScore(event) {
    event.preventDefault();

    var initInput = document.getElementById("initials");

    if (initInput.value != "") {
        var storedScores = JSON.parse(localStorage.getItem("scores"));
        var scoreToSubmit = initInput.value + " - " + scoreTime;

        if (storedScores !== null) {
            allScores = storedScores;
        }

        allScores.push(scoreToSubmit);
        localStorage.setItem("scores", JSON.stringify(allScores));

        window.location.href = "highscores.html";
    }
    
}

// This is event listener for the start button
startButton.addEventListener("click", onStart);