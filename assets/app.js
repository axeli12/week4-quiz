const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
        answer: "d. <script>"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c. quotes"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "b. other arrays"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b. function myFunction()"
    }
];


var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("startBtn");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choice1 = document.getElementById("btn0");
var choice2 = document.getElementById("btn1");
var choice3 = document.getElementById("btn2");
var choice4 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitBtn = document.getElementById("submitBtn");
var initialsIn = document.getElementById("initialsIn");
var mainDiv = document.getElementById("mainDiv");

var highScored = document.getElementById("highScored");
var score = document.getElementById("FinalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearBtn = document.getElementById("clearBtn"); 
var viewHighscore = document.getElementById("viewHighscore");
var listHighscores = document.getElementById("listHighscores");

var rightAns = 0;
var questionNum = 0;
var scoreResult = 0;
var questionIndex = 0;



startQuizBtn.addEventListener("click", newQuiz);

function newQuiz() {
  questionIndex = 0;
  totalTime = 40;
  timeLeft.textContent = totalTime;
  initialsIn.textContent = "";
  rightAns = 0;

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
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

  var lineBreak = document.getElementById("lineBreak");
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
   
    var savedScores = localStorage.getItem("highscores");
   
    
    if (savedScores === "") {
        return;
    }
        
    var storedHighScores = JSON.parse(savedScores);
    var newHighscore = [];
    for (let i = 0; i < storedHighScores.length; i++) {
        var newHighscore = document.createElement("p");
        newHighscore.innerHTML = storedHighScores[i].initials + " : " + storedHighScores[i].score;
        listHighscores.appendChild(newHighscore);
    }
  };
  
function storeHighScores() {
    
    if (initialsIn.value === "") {
        alert("C'mon, you have to type something.");
        return;
    } 
  
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScored.style.display = "block";   
  
    var savedScores = localStorage.getItem("highscores");
    var scoresArray;
  
    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores);
    }
  
    var userScore = {
        initials: initialsIn.value,
        score: rightAns
    };
  
    scoresArray.push(userScore);
    initialsIn.value = "";
    
    var scoresArrayString = JSON.stringify(scoresArray);
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