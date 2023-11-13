var questionsObj = {
    questions: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
    ],
    
    responses: [
        [
            "1",
            "Answer 1",
            "Answer 2",
            "Answer 3",
            "Answer 4"
        ],
        [
            "2",
            "Answer 1",
            "Answer 2",
            "Answer 3",
            "Answer 4"
        ],
        [
            "3",
            "Answer 1",
            "Answer 2",
            "Answer 3",
            "Answer 4"
        ],
        [
            "4",
            "Answer 1",
            "Answer 2",
            "Answer 3",
            "Answer 4"
        ],
        [
            "1",
            "Answer 1",
            "Answer 2",
            "Answer 3",
            "Answer 4"
        ]
    ]
}

var startButton = document.querySelector("#start");
var textTimer = document.getElementById("score-timer");
var starterText = document.getElementById("starter-text")
var questionText = document.getElementById("question-text");
var responseArea = document.getElementById("response-sect");
var answerText = document.getElementById("answer-text");
var scoreTime = 75;
var questionNum = 0;

function onStart(event) {
    starterText.remove();
    startButton.remove();
    questionText.style.textAlign = "left";
    startTimer();
    makeNewQuestion();
}

// console.log(questionsObj.responses[0].indexOf(questionsObj.responses[0][1]));
// console.log(questionsObj.responses[0][0]);

// if (questionsObj.responses[0][0] == questionsObj.responses[0].indexOf(questionsObj.responses[0][1])) {
//     console.log("true");
// }

function startTimer() {
    textTimer.textContent = "Time: " + scoreTime;
    var timer = setInterval(function() {
        scoreTime--;
        textTimer.textContent = "Time: " + scoreTime;

    }, 1000);
}

function makeNewQuestion() {
    questionNum++;
    if(questionNum <= questionsObj.questions.length) {
        questionText.textContent = questionsObj.questions[questionNum - 1];
        for(var i = 0; i < questionsObj.responses.length; i++) {
            if(i != 0) {
                var ansBtn = document.createElement("button");

                ansBtn.classList.add("btn");
                
                ansBtn.textContent = questionsObj.responses[questionNum - 1][i];
                ansBtn.addEventListener("click", clickResponse);

                responseArea.appendChild(ansBtn);
            }

        }

    }

}

function clickResponse(event) {
    var element = event.target;

    if (element.matches("button") === true) {
        responseArea.innerHTML = "";
        makeNewQuestion();

    }
}

startButton.addEventListener("click", onStart);
