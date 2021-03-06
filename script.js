  var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["the <head> section", "the <body> section", "the <head> and <body> section are correct", "none of the above"],
        answer: "the <body> section"
    },
    {
        title: "How do you create a function in Javascript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "create function myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: 'How do you call a function named "myFunction"?',
        choices: ["call myFunction()", "call function myFunction()", "myFunction()", "call (myFunction)"],
        answer: "myFunction()"
    },
    {
        title: "How do you add a comment in Javascript?",
        choices: ["//This is a comment", "<!--This is a comment--!>", "''This is a comment", "<This is a comment>"],
        answer: "//This is a comment"
    },

];

var score = 0;
var questionIndex = 0;

// Declared variables
var currentTime = document.querySelector("#current-time");
var timer = document.querySelector("#start-btn");
var questionsEl = document.querySelector("#questions-container");
var wrapper = document.querySelector("#wrapper");
var createUl = document.createElement("ul");

var secondsLeft = 75;
var hold = 0;
var penalty = 10;

// Timer button starts on click & displays on the screen
timer.addEventListener("click", function () {
console.log("timer", timer)
    if (hold === 0) {
        hold = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(hold);
                finish();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page 
function render(questionIndex) {
    questionsEl.innerHTML = "";
    createUl.innerHTML = "";
    // For loop for info in questions array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsEl.textContent = userQuestion;
    }
    // forEach for answer choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Compare user choice with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // decreases timer by 10 seconds
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        finish();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " correct!";
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(createDiv);

}
// finish will append last page
function finish() {
    questionsEl.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz Complete!"

    questionsEl.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsEl.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(hold);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsEl.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsEl.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsEl.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsEl.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert("No value entered");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscores.html");
        }
    });

}



