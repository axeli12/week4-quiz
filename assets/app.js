const questions = [
    {
        question: "What is javascript mainly for?",
        choices: ["a. functionality ", "b. coding", "c. writing",],
        answer: "a. functionality"
    },
    {
        question: "Which one isnt a javascript mehtod",
        choices: ["a. string", "b. dot notation", "c. alert", "d. boolean"],
        answer: "c. alert"
    },
    {
        question: "What are some array methods",
        choices: ["a. sort", "b. map", "c. filter", "d. all of the above"],
        answer: "d. all of the above"
    },
    {
        question: "what does css do",
        choices: ["a. styling", "b. formating", "c. alerts", "d. shaping"],
        answer: "a. styling"
    },
    {
        question: "what can be stored in an array",
        choices: ["a. strings", "b. arrays", "c. booleans", "d. all of above"],
        answer: "d. all of above"
    }
];


let timer = document.getElementById("timer");
let timeLeft = document.getElementById("timeLeft");
let timesUp = document.getElementById("timesUp");

let startDiv = document.getElementById("start");
let startQuizBtn = document.getElementById("startBtn");

let questionDiv = document.getElementById("questionDiv");
let questionTitle = document.getElementById("questionTitle");
let choice1 = document.getElementById("btn0");
let choice2 = document.getElementById("btn1");
let choice3 = document.getElementById("btn2");
let choice4 = document.getElementById("btn3");
let answerCheck = document.getElementById("answerCheck");

let summary = document.getElementById("summary");
let submitBtn = document.getElementById("submitBtn");
let initialsIn = document.getElementById("initialsIn");
let mainDiv = document.getElementById("mainDiv");

let highScored = document.getElementById("highScored");
let score = document.getElementById("FinalScore");

let goBackBtn = document.getElementById("goBackBtn");
let clearBtn = document.getElementById("clearBtn"); 
let viewHighscore = document.getElementById("viewHighscore");
let listHighscores = document.getElementById("listHighscores");

let rightAns = 0;
let questionNum = 0;
let scoreResult = 0;
let questionIndex = 0;



startQuizBtn.addEventListener("click", newQuiz);

function newQuiz() {
  questionIndex = 0;
  totalTime = 110;
  timeLeft.textContent = totalTime;
  initialsIn.textContent = "";
  rightAns = 0;

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timesUp.style.display = "none";

  let startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              gameOver();
          }
      }
  },1000);

  showQuiz();
};

choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choice1.textContent = questions[questionIndex].choices[0];
  choice2.textContent = questions[questionIndex].choices[1];
  choice3.textContent = questions[questionIndex].choices[2];
  choice4.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

  let lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      rightAns++;
      answerCheck.textContent = "Correct!";
  } else {
      totalTime -= 10;
      timeLeft.textContent = totalTime;
      answerCheck.textContent = "Incorrect The answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      gameOver();
  }
}

function choose1() { checkAnswer(0); }
function choose2() { checkAnswer(1); }
function choose3() { checkAnswer(2); }
function choose4() { checkAnswer(3); }

function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timesUp.style.display = "block";
  console.log(rightAns);
  score.innerHTML= rightAns;
};


function showScores() {
    listHighscores.innerHTML = "";
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScored.style.display = "block";
   
    let savedScores = localStorage.getItem("highscores");
   
    
    if (savedScores === "") {
        return;
    }
        
    let storedHighScores = JSON.parse(savedScores);
    let newHighscore = [];
    for (let i = 0; i < storedHighScores.length; i++) {
        let newHighscore = document.createElement("p");
        newHighscore.innerHTML = storedHighScores[i].initials + " : " + storedHighScores[i].score;
        listHighscores.appendChild(newHighscore);
    }
  };
  
function storeHighScores() {
    
    if (initialsIn.value === "") {
        alert("Please Enter your Intials");
        return;
    } 
  
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScored.style.display = "block";   
  
    let savedScores = localStorage.getItem("highscores");
    let scoresArray;
  
    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores);
    }
  
    let userScore = {
        initials: initialsIn.value,
        score: rightAns
    };
  
    scoresArray.push(userScore);
    initialsIn.value = "";
    
    let scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("highscores", scoresArrayString);

    showScores();
    
  };

submitBtn.addEventListener("click", function(){ 
  storeHighScores();
});
viewHighscore.addEventListener("click", function(event) { 
  showScores(event);
});

goBackBtn.addEventListener("click", function() {
  startDiv.style.display = "block";
  highScored.style.display = "none";
});

clearBtn.addEventListener("click", function(){
  window.localStorage.removeItem("highscores");
  listHighscores.innerHTML = "Highscores Deleted";
  listHighscores.setAttribute("style", "font-weight: bold")
});