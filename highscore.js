const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


  highScoresList.innerHTML = highScores.slice(0,5).map((score) => `<h3>${score.name} - ${score.score}</h3>`).join("")


console.log(highScores)