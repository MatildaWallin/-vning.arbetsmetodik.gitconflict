const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progresstext = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 100;
let questionCounter = 0;
let gameQuestions = [];
const maximalQuestions = 4;

let questions = [
  {
    question: "Föredrar Matilda katter eller hundar?",
    choice1: "Katter mjau",
    choice2: "Ingen av dom usch",
    choice3: "Hundar helt klart",
    choice4: "Bägge lika mycket!",
    answer: 4,
  },

  {
    question: "Vart bor Matilda?",
    choice1: "Skärmarbrink",
    choice2: "Sundbyberg",
    choice3: "Midsommarkransen",
    choice4: "Gubbängen",
    answer: 3,
  },

  {
    question: "Hur gammal är Matilda?",
    choice1: "40",
    choice2: "32",
    choice3: "29",
    choice4: "18",
    answer: 2,
  },

  {
    question: "Hur många syskon har Matilda?",
    choice1: "Tre",
    choice2: "Inga!",
    choice3: "Sju",
    choice4: "Två",
    answer: 4,
  },
];

const startgame = function () {
  questionCounter = 0;
  gameQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = function () {
  if (gameQuestions.length === 0 || questionCounter > maximalQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progresstext.innerText = `Question ${questionCounter} / ${maximalQuestions}`;
  progressBarFull.style.width = `${
    (questionCounter / maximalQuestions) * 100
  }%`;

  const questionsIndex = Math.floor(Math.random() * gameQuestions.length);
  currentQuestion = gameQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  gameQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      removepoints(10);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const removepoints = function (points) {
  score -= points;
  scoreText.innerHTML = score;
};

let count = 100;
let interval = setInterval(function () {
  document.getElementById("count").innerHTML = count;
  count--;
  removepoints(1);
  if (count === 0) {
    clearInterval(interval);

    alert("You're out of time! Please try again !");
  }
}, 1000);

startgame();
