let allQuestions = [];
let questions = [];
let currentQuestionIndex = 0;
let quizCompleted = false;
let timerInterval;
let secondsSpent = 0;
let immediateFeedback = true;

document.addEventListener("DOMContentLoaded", function() {
  const feedbackSwitch = document.getElementById("feedbackSwitch");
  const feedbackToggle = document.getElementById("feedback-toggle");
  immediateFeedback = !feedbackSwitch.checked;
  feedbackSwitch.addEventListener("change", function() {
    immediateFeedback = !this.checked;
  });

  // Hide toggle after quiz starts
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function() {
    feedbackToggle.style.display = "none";
  });
});

// document.addEventListener("keydown", function(event) {
//   if (event.key === "Enter" && !quizCompleted) {
//     nextQuestion();
//   }
  
// });
document.addEventListener("keydown", function(event) {
    // if (quizCompleted) return;
  
    if (event.key === "Enter") {
        if (currentQuestionIndex === questions.length - 1) {
            confirmSubmit();
        } else{
            nextQuestion();
        }
    } else if (event.key === "ArrowRight") {
        if (currentQuestionIndex === questions.length - 1) {
            confirmSubmit();
        } else{
            nextQuestion();
        }
    } else if (event.key === "ArrowLeft") {
       prevQuestion();
    } // else if (event.key === "ArrowRight") {
    //   if (currentQuestionIndex === questions.length - 1) {
    //     confirmSubmit();
    //   }
    // }
  });

function askNumberOfQuestions() {
  fetch("questions.json")
    .then(response => response.json())
    .then(data => {
      allQuestions = data;
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);

      // Remove feedback prompt, use radio selection instead

      let num = prompt(`How many questions do you want? (Max: ${allQuestions.length})`);
      num = parseInt(num);
      if (!num || num <= 0 || num > allQuestions.length) {
        alert("Invalid number. Starting full quiz.");
        num = allQuestions.length;
      }
      questions = allQuestions.slice(0, num);
      startQuiz();
    })
    .catch(error => console.error("Error loading questions:", error));
}

function startQuiz() {
  currentQuestionIndex = 0;
  quizCompleted = false;
  document.getElementById("summary").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("retakeBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("prevBtn").style.display = "inline-block";
  document.getElementById("prevBtn").disabled = true;
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("progress-container").style.display = "block";
  document.getElementById("timer").style.display = "block";
  document.getElementById("feedback-toggle").style.display = "none";
  document.getElementById("questionCount").innerText = "";
  document.getElementById("quiz-container").innerHTML = "";
  document.getElementById("progress-bar").style.width = "0%";
  startTimer();
  displayQuestion(); // <-- This ensures the first question is shown
}
// function restartQuiz(){
//   currentQuestionIndex = 0;
//   quizCompleted = false;
//   document.getElementById("progress-bar").style.width = "0%";
// }
function generateQuestionButtons() {
  const nav = document.getElementById("question-navigation");
  nav.innerHTML = "";
  questions.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.innerText = index + 1;
    btn.onclick = () => jumpToQuestion(index);
    nav.appendChild(btn);
  });
}

function jumpToQuestion(index) {
  currentQuestionIndex = index;
  displayQuestion();
}

function displayQuestion() {
  if (quizCompleted) return;

  const quizContainer = document.getElementById("quiz-container");
  const q = questions[currentQuestionIndex];

  quizContainer.innerHTML = `
    <p><strong>${currentQuestionIndex + 1}. ${q.question}</strong></p>
    ${q.options.map(option => {
      let optionClass = 'option';
      // Always show blue for selected in "at end" mode
      if (!immediateFeedback && q.selected === option) optionClass += ' selected';

      // Immediate feedback logic
      if (immediateFeedback && q.selected) {
        if (option === q.selected && q.selected !== q.correct) {
          optionClass += ' wrong-answer';
        }
        if (option === q.correct) {
          optionClass += ' correct-answer';
        }
      }

      // Disable click after selection in immediate feedback
      const clickable = (!immediateFeedback || !q.selected) ? `onclick="selectAnswer('${option}')"` : "";

      return `<div class="${optionClass}" ${clickable}>${option}</div>`;
    }).join('')}
  `;

  document.getElementById("questionCount").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  updateNavigation();
  highlightCurrentButton();
}

// function selectAnswer(selectedOption) {
//   questions[currentQuestionIndex].selected = selectedOption;
//   displayQuestion();
// }
function selectAnswer(selectedOption) {
  if (immediateFeedback && questions[currentQuestionIndex].selected) return; // Prevent changing answer in immediate mode
  questions[currentQuestionIndex].selected = selectedOption;
  displayQuestion();
  updateProgressBar();
}
  

function updateNavigation() {
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
  document.getElementById("submitBtn").style.display = "inline-block"; // Always visible
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function highlightCurrentButton() {
  const navButtons = document.querySelectorAll("#question-navigation button");
  navButtons.forEach(btn => btn.classList.remove("active"));
  
  if (navButtons[currentQuestionIndex]) {
    navButtons[currentQuestionIndex].classList.add("active");
  } else if(navButtons[currentQuestionIndex] && questions[currentQuestionIndex].selected){
    navButtons[currentQuestionIndex].classList.add("active");
  }
   if(questions[currentQuestionIndex].selected) {
    navButtons[currentQuestionIndex].classList.add("select");
}
}

function confirmSubmit() {
  // Custom modal prompt
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.35)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const modal = document.createElement("div");
  modal.style.background = "#fff";
  modal.style.padding = "32px 24px";
  modal.style.borderRadius = "16px";
  modal.style.boxShadow = "0 4px 24px rgba(44,62,80,0.18)";
  modal.style.textAlign = "center";
  modal.innerHTML = `
    <h2>Submit Quiz?</h2>
    <p>Are you sure you want to submit your answers? You won't be able to change them after submission.</p>
    <button id="confirmYes" style="margin: 12px 16px 0 0;">Yes, Submit</button>
    <button id="confirmNo" style="margin: 12px 0 0 0;">Cancel</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById("confirmYes").onclick = function() {
    document.body.removeChild(overlay);
    submitQuiz();
  };
  document.getElementById("confirmNo").onclick = function() {
    document.body.removeChild(overlay);
  };
}

function submitQuiz() {
  quizCompleted = true;
  clearInterval(timerInterval);

  let score = 0;
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "<h2>Quiz Completed!</h2>";

  questions.forEach(q => {
    if (q.selected === q.correct) {
      score++;
    }
  });

  document.getElementById("result").innerHTML = `
    Your score: ${score} / ${questions.length} <br>
    Time Taken: ${formatTime(secondsSpent)}
  `;

  showSummary();
  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "inline-block"; // Show restart only now
}

function showSummary() {
  const summaryContainer = document.getElementById("summary");
  summaryContainer.innerHTML = "<h3>Quiz Summary:</h3>";

  questions.forEach((q, index) => {
    let status = "";
    if (q.selected) {
      status = q.selected === q.correct ? `<span class="correct">✅ Correct</span>` : `<span class="incorrect">❌ Incorrect</span>`;
    } else {
      status = `<span class="incorrect">❌ Not Answered</span>`;
    }

    summaryContainer.innerHTML += `
      <div class="summary-item">
        <p><strong>${index + 1}. ${q.question}</strong></p>
        <p>Your answer: <em>${q.selected || "None"}</em> ${status}</p>
        <p>Correct answer: <span class="correct">${q.correct}</span></p>
      </div>
    `;
  });
}

function startTimer() {
  clearInterval(timerInterval);
  secondsSpent = 0;
  timerInterval = setInterval(() => {
    secondsSpent++;
    document.getElementById("timer").innerText = `Time Spent: ${formatTime(secondsSpent)}`;
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

// function updateProgressBar() {
//   const progressBar = document.getElementById("progress-bar");
//   const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
//   progressBar.style.width = `${percentage}%`;
// }
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    // Count how many questions have been answered
    const answeredCount = questions.filter(q => q.selected !== undefined && q.selected !== null).length;
    const percentage = (answeredCount / questions.length) * 100;
    progressBar.style.width = `${percentage}%`;
  }

document.querySelectorAll('input[name="feedbackMode"]').forEach(radio => {
  radio.addEventListener('change', function() {
    immediateFeedback = this.value === "immediate";
  });
});

document.getElementById("restartBtn").onclick = function() {
  // Custom modal prompt for restart
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.35)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const modal = document.createElement("div");
  modal.style.background = "#fff";
  modal.style.padding = "32px 24px";
  modal.style.borderRadius = "16px";
  modal.style.boxShadow = "0 4px 24px rgba(44,62,80,0.18)";
  modal.style.textAlign = "center";
  modal.innerHTML = `
    <h2>Restart Quiz?</h2>
    <p>Are you sure you want to retake quiz?.</p>
    <button id="restartYes" style="margin: 12px 16px 0 0;">Retake</button>
    <button id="restartNo" style="margin: 12px 0 0 0;">Cancel</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById("restartYes").onclick = function() {
    document.body.removeChild(overlay);
    // Reset UI to home/start
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("progress-container").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("feedback-toggle").style.display = "flex";
    document.getElementById("question-navigation").innerHTML = "";
    document.getElementById("questionCount").innerText = "";
    // Reset variables
    quizCompleted = false;
    currentQuestionIndex = 0;
    secondsSpent = 0;
  };
  document.getElementById("restartNo").onclick = function() {
    document.body.removeChild(overlay);
  };
};