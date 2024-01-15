const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const input = document.getElementById("username");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  localStorage.setItem("highScores", JSON.stringify(highScores));

  input.value = "";
  saveScoreBtn.disabled = true;
  input.disabled = true;
};

saveScoreBtn.addEventListener("click", saveHighScore);
