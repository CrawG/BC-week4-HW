var highScores = document.querySelector("#high-scores");
var clear = document.querySelector("#clear-btn");
var back = document.querySelector("#back-btn");

//Clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Get scores from local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScores.appendChild(createLi);
    }
}
//Navigate back to index page
back.addEventListener("click", function () {
    window.location.replace("./index.html");
});