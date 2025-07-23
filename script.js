// let allQuestions = [];
// let questions = [];
// let currentQuestionIndex = 0;
// let quizCompleted = false;
// let timerInterval;
// let secondsSpent = 0;
// let immediateFeedback = true;
// let selectedCourse = 'health';
// let selectedChapter = 'chapter1';
// function selectChapter(chapterId) {
//   selectedChapter = chapterId;
//   // Update tab UI
//   document.querySelectorAll('.chapter-tab').forEach(tab => {
//     tab.classList.remove('active');
//     if (tab.textContent.trim() === `Chapter ${chapterId.replace('chapter','')}`) {
//       tab.classList.add('active');
//     }
//   });
//   // Reset quiz UI
//   document.getElementById("quiz-container").innerHTML = "";
//   document.getElementById("summary").innerHTML = "";
//   document.getElementById("result").innerHTML = "";
//   document.getElementById("startBtn").style.display = "inline-block";
//   document.getElementById("restartBtn").style.display = "none";
//   document.getElementById("progress-container").style.display = "none";
//   document.getElementById("timer").style.display = "none";
//   document.getElementById("feedback-toggle").style.display = "flex";
//   document.getElementById("questionCount").innerText = "";
//   quizCompleted = false;
//   currentQuestionIndex = 0;
//   secondsSpent = 0;
// }

// function selectCourse(courseId) {
//   selectedCourse = courseId;
//   // Update tab UI
//   document.querySelectorAll('.course-tab').forEach(tab => {
//     tab.classList.remove('active');
//     if ((courseId === 'health' && tab.textContent.trim() === 'Health Principles') ||
//         (courseId === 'messiah' && tab.textContent.trim() === 'Christ the Messiah')) {
//       tab.classList.add('active');
//     }
//   });
//   // Reset quiz UI
//   document.getElementById("quiz-container").innerHTML = "";
//   document.getElementById("summary").innerHTML = "";
//   document.getElementById("result").innerHTML = "";
//   document.getElementById("startBtn").style.display = "inline-block";
//   document.getElementById("restartBtn").style.display = "none";
//   document.getElementById("progress-container").style.display = "none";
//   document.getElementById("timer").style.display = "none";
//   document.getElementById("feedback-toggle").style.display = "flex";
//   document.getElementById("questionCount").innerText = "";
//   quizCompleted = false;
//   currentQuestionIndex = 0;
//   secondsSpent = 0;

//   // Show/hide chapter tabs based on course
//   if (courseId === 'messiah') {
//     document.getElementById('chapter-tabs').style.display = 'grid';
//   } else {
//     document.getElementById('chapter-tabs').style.display = 'none';
//     // Reset chapter selection to default
//     selectedChapter = 'chapter1';
//     document.querySelectorAll('.chapter-tab').forEach(tab => tab.classList.remove('active'));
//     document.querySelector('.chapter-tab').classList.add('active');
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   const feedbackSwitch = document.getElementById("feedbackSwitch");
//   const feedbackToggle = document.getElementById("feedback-toggle");
//   immediateFeedback = !feedbackSwitch.checked;
//   feedbackSwitch.addEventListener("change", function() {
//     immediateFeedback = !this.checked;
//   });

//   // Hide toggle after quiz starts
//   const startBtn = document.getElementById("startBtn");
//   startBtn.addEventListener("click", function() {
//     feedbackToggle.style.display = "none";
//   });
// });

// // document.addEventListener("keydown", function(event) {
// //   if (event.key === "Enter" && !quizCompleted) {
// //     nextQuestion();
// //   }
  
// // });
// document.addEventListener("keydown", function(event) {
//     // if (quizCompleted) return;
  
//     if (event.key === "Enter") {
//         if (currentQuestionIndex === questions.length - 1) {
//             confirmSubmit();
//         } else{
//             nextQuestion();
//         }
//     } else if (event.key === "ArrowRight") {
//         if (currentQuestionIndex === questions.length - 1) {
//             confirmSubmit();
//         } else{
//             nextQuestion();
//         }
//     } else if (event.key === "ArrowLeft") {
//        prevQuestion();
//     } // else if (event.key === "ArrowRight") {
//     //   if (currentQuestionIndex === questions.length - 1) {
//     //     confirmSubmit();
//     //   }
//     // }
//   });

// function askNumberOfQuestions() {
//   let file = selectedCourse === 'health' ? 'questions.json' : 'messiah.json';
//   fetch(file)
//     .then(response => response.json())
//     .then(data => {
//       if (selectedCourse === 'messiah') {
//         // Expect messiah.json to be an object: { chapter1: [...], chapter2: [...], ... }
//         allQuestions = data[selectedChapter] || [];
//       } else {
//         allQuestions = data;
//       }
//       allQuestions = allQuestions.sort(() => Math.random() - 0.5);
//       let num = prompt(`How many questions do you want? (Max: ${allQuestions.length})`);
//       num = parseInt(num);
//       if (!num || num <= 0 || num > allQuestions.length) {
//         alert("Invalid number. Starting full quiz.");
//         num = allQuestions.length;
//       }
//       questions = allQuestions.slice(0, num);
//       console.log('Loaded questions:', allQuestions);
//       startQuiz();
//     })
//     .catch(error => console.error("Error loading questions:", error));
// }

// function startQuiz() {
//   currentQuestionIndex = 0;
//   quizCompleted = false;
//   document.getElementById("summary").innerHTML = "";
//   document.getElementById("result").innerHTML = "";
//   document.getElementById("startBtn").style.display = "none";
//   document.getElementById("retakeBtn").style.display = "none";
//   document.getElementById("restartBtn").style.display = "none";
//   document.getElementById("prevBtn").style.display = "inline-block";
//   document.getElementById("prevBtn").disabled = true;
//   document.getElementById("nextBtn").style.display = "inline-block";
//   document.getElementById("progress-container").style.display = "block";
//   document.getElementById("timer").style.display = "block";
//   document.getElementById("feedback-toggle").style.display = "none";
//   document.getElementById("questionCount").innerText = "";
//   document.getElementById("quiz-container").innerHTML = "";
//   var progressBar = document.getElementById("progress-bar");
//   if (progressBar) {
//     progressBar.style.width = "0%";
//   }
//   document.getElementById("question-navigation").innerHTML = "";
//   startTimer();
//   displayQuestion(); // <-- This ensures the first question is shown
// }
// // function restartQuiz(){
// //   currentQuestionIndex = 0;
// //   quizCompleted = false;
// //   document.getElementById("progress-bar").style.width = "0%";
// // }
// function generateQuestionButtons() {
//   // Question navigation buttons removed as requested
// }

// function jumpToQuestion(index) {
//   currentQuestionIndex = index;
//   displayQuestion();
// }

// function displayQuestion() {
//   if (quizCompleted) return;

//   const quizContainer = document.getElementById("quiz-container");
//   if (!questions || questions.length === 0) {
//     quizContainer.innerHTML = '<p style="color:red; font-weight:bold;">No questions available for this chapter.</p>';
//     document.getElementById("questionCount").innerText = '';
//     return;
//   }
//   const q = questions[currentQuestionIndex];
//   console.log('Current question:', q);

//   quizContainer.innerHTML = `
//     <p><strong>${currentQuestionIndex + 1}. ${q.question}</strong></p>
//     ${q.options.map(option => {
//       let optionClass = 'option';
//       // Always show blue for selected in "at end" mode
//       if (!immediateFeedback && q.selected === option) optionClass += ' selected';

//       // Immediate feedback logic
//       if (immediateFeedback && q.selected) {
//         if (option === q.selected && q.selected !== q.correct) {
//           optionClass += ' wrong-answer';
//         }
//         if (option === q.correct) {
//           optionClass += ' correct-answer';
//         }
//       }

//       // Disable click after selection in immediate feedback
//       const clickable = (!immediateFeedback || !q.selected) ? `onclick="selectAnswer('${option}')"` : "";

//       return `<div class="${optionClass}" ${clickable}>${option}</div>`;
//     }).join('')}
//   `;

//   document.getElementById("questionCount").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
//   updateNavigation();
//   highlightCurrentButton();
//   console.log('Current question:', questions[currentQuestionIndex]);
// }

// // function selectAnswer(selectedOption) {
// //   questions[currentQuestionIndex].selected = selectedOption;
// //   displayQuestion();
// // }
// function selectAnswer(selectedOption) {
//   if (immediateFeedback && questions[currentQuestionIndex].selected) return; // Prevent changing answer in immediate mode
//   questions[currentQuestionIndex].selected = selectedOption;
//   displayQuestion();
//   updateProgressBar();
// }
  

// function updateNavigation() {
//   document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
//   document.getElementById("nextBtn").style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
//   document.getElementById("submitBtn").style.display = "inline-block"; // Always visible
// }

// function nextQuestion() {
//   if (currentQuestionIndex < questions.length - 1) {
//     currentQuestionIndex++;
//     displayQuestion();
//   }
// }

// function prevQuestion() {
//   if (currentQuestionIndex > 0) {
//     currentQuestionIndex--;
//     displayQuestion();
//   }
// }

// function highlightCurrentButton() {
//   const navButtons = document.querySelectorAll("#question-navigation button");
//   navButtons.forEach(btn => btn.classList.remove("active"));
  
//   if (navButtons[currentQuestionIndex]) {
//     navButtons[currentQuestionIndex].classList.add("active");
//   } else if(navButtons[currentQuestionIndex] && questions[currentQuestionIndex].selected){
//     navButtons[currentQuestionIndex].classList.add("active");
//   }
//    if(questions[currentQuestionIndex].selected) {
//     navButtons[currentQuestionIndex].classList.add("select");
// }
// }

// function confirmSubmit() {
//   // Custom modal prompt
//   const overlay = document.createElement("div");
//   overlay.style.position = "fixed";
//   overlay.style.top = "0";
//   overlay.style.left = "0";
//   overlay.style.width = "100vw";
//   overlay.style.height = "100vh";
//   overlay.style.background = "rgba(0,0,0,0.35)";
//   overlay.style.display = "flex";
//   overlay.style.alignItems = "center";
//   overlay.style.justifyContent = "center";
//   overlay.style.zIndex = "9999";

//   const modal = document.createElement("div");
//   modal.style.background = "#fff";
//   modal.style.padding = "32px 24px";
//   modal.style.borderRadius = "16px";
//   modal.style.boxShadow = "0 4px 24px rgba(44,62,80,0.18)";
//   modal.style.textAlign = "center";
//   modal.innerHTML = `
//     <h2>Submit Quiz?</h2>
//     <p>Are you sure you want to submit your answers? You won't be able to change them after submission.</p>
//     <button id="confirmYes" style="margin: 12px 16px 0 0;">Yes, Submit</button>
//     <button id="confirmNo" style="margin: 12px 0 0 0;">Cancel</button>
//   `;

//   overlay.appendChild(modal);
//   document.body.appendChild(overlay);

//   document.getElementById("confirmYes").onclick = function() {
//     document.body.removeChild(overlay);
//     submitQuiz();
//   };
//   document.getElementById("confirmNo").onclick = function() {
//     document.body.removeChild(overlay);
//   };
// }

// function submitQuiz() {
//   quizCompleted = true;
//   clearInterval(timerInterval);

//   let score = 0;
//   const quizContainer = document.getElementById("quiz-container");
//   quizContainer.innerHTML = "<h2>Quiz Completed!</h2>";

//   questions.forEach(q => {
//     if (q.selected === q.correct) {
//       score++;
//     }
//   });

//   document.getElementById("result").innerHTML = `
//     Your score: ${score} / ${questions.length} <br>
//     Time Taken: ${formatTime(secondsSpent)}
//   `;

//   showSummary();
//   document.getElementById("prevBtn").style.display = "none";
//   document.getElementById("nextBtn").style.display = "none";
//   document.getElementById("submitBtn").style.display = "none";
//   document.getElementById("restartBtn").style.display = "inline-block"; // Show restart only now
// }

// function showSummary() {
//   const summaryContainer = document.getElementById("summary");
//   summaryContainer.innerHTML = "<h3>Quiz Summary:</h3>";

//   questions.forEach((q, index) => {
//     let status = "";
//     if (q.selected) {
//       status = q.selected === q.correct ? `<span class="correct">✅ Correct</span>` : `<span class="incorrect">❌ Incorrect</span>`;
//     } else {
//       status = `<span class="incorrect">❌ Not Answered</span>`;
//     }

//     summaryContainer.innerHTML += `
//       <div class="summary-item">
//         <p><strong>${index + 1}. ${q.question}</strong></p>
//         <p>Your answer: <em>${q.selected || "None"}</em> ${status}</p>
//         <p>Correct answer: <span class="correct">${q.correct}</span></p>
//       </div>
//     `;
//   });
// }

// function startTimer() {
//   clearInterval(timerInterval);
//   secondsSpent = 0;
//   timerInterval = setInterval(() => {
//     secondsSpent++;
//     document.getElementById("timer").innerText = `Time Spent: ${formatTime(secondsSpent)}`;
//   }, 1000);
// }

// function formatTime(seconds) {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${mins}m ${secs}s`;
// }

// // function updateProgressBar() {
// //   const progressBar = document.getElementById("progress-bar");
// //   const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
// //   progressBar.style.width = `${percentage}%`;
// // }
// // function updateProgressBar() {
// //     const progressBar = document.getElementById("progress-bar");
// //     // Count how many questions have been answered
// //     const answeredCount = questions.filter(q => q.selected !== undefined && q.selected !== null).length;
// //     const percentage = (answeredCount / questions.length) * 100;
// //     progressBar.style.width = `${percentage}%`;
// //   }

// document.querySelectorAll('input[name="feedbackMode"]').forEach(radio => {
//   radio.addEventListener('change', function() {
//     immediateFeedback = this.value === "immediate";
//   });
// });

// document.getElementById("restartBtn").onclick = function() {
//   // Custom modal prompt for restart
//   const overlay = document.createElement("div");
//   overlay.style.position = "fixed";
//   overlay.style.top = "0";
//   overlay.style.left = "0";
//   overlay.style.width = "100vw";
//   overlay.style.height = "100vh";
//   overlay.style.background = "rgba(0,0,0,0.35)";
//   overlay.style.display = "flex";
//   overlay.style.alignItems = "center";
//   overlay.style.justifyContent = "center";
//   overlay.style.zIndex = "9999";

//   const modal = document.createElement("div");
//   modal.style.background = "#fff";
//   modal.style.padding = "32px 24px";
//   modal.style.borderRadius = "16px";
//   modal.style.boxShadow = "0 4px 24px rgba(44,62,80,0.18)";
//   modal.style.textAlign = "center";
//   modal.innerHTML = `
//     <h2>Restart Quiz?</h2>
//     <p>Are you sure you want to retake quiz?.</p>
//     <button id="restartYes" style="margin: 12px 16px 0 0;">Retake</button>
//     <button id="restartNo" style="margin: 12px 0 0 0;">Cancel</button>
//   `;

//   overlay.appendChild(modal);
//   document.body.appendChild(overlay);

//   document.getElementById("restartYes").onclick = function() {
//     document.body.removeChild(overlay);
//     // Reset UI to home/start
//     document.getElementById("quiz-container").innerHTML = "";
//     document.getElementById("summary").innerHTML = "";
//     document.getElementById("result").innerHTML = "";
//     document.getElementById("startBtn").style.display = "inline-block";
//     document.getElementById("restartBtn").style.display = "none";
//     document.getElementById("progress-container").style.display = "none";
//     document.getElementById("timer").style.display = "none";
//     document.getElementById("feedback-toggle").style.display = "flex";
//     document.getElementById("question-navigation").innerHTML = "";
//     document.getElementById("questionCount").innerText = "";
//     // Reset variables
//     quizCompleted = false;
//     currentQuestionIndex = 0;
//     secondsSpent = 0;
//   };
//   document.getElementById("restartNo").onclick = function() {
//     document.body.removeChild(overlay);
//   };
// };

// console.log('Loaded questions:', allQuestions);





let allQuestions = [];
let questions = [];
let currentQuestionIndex = 0;
let quizCompleted = false;
let timerInterval;
let secondsSpent = 0;
let immediateFeedback = true;
let selectedCourse = 'health';
let selectedChapter = 'chapter1';

function selectCourse(courseId) {
  selectedCourse = courseId;
  document.querySelectorAll('.course-tab').forEach(tab => {
    tab.classList.remove('active');
    if ((courseId === 'health' && tab.textContent.trim() === 'Health Principles') ||
        (courseId === 'messiah' && tab.textContent.trim() === 'Christ the Messiah')) {
      tab.classList.add('active');
    }
  });

  if (courseId === 'messiah') {
    document.getElementById('chapter-tabs').style.display = 'grid';
  } else {
    document.getElementById('chapter-tabs').style.display = 'none';
    selectedChapter = 'chapter1';
    document.querySelectorAll('.chapter-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector('.chapter-tab').classList.add('active');
  }

  resetUI();
}

function selectChapter(chapterId) {
  selectedChapter = chapterId;
  document.querySelectorAll('.chapter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.trim().includes(chapterId.replace('chapter', 'Chapter '))) {
      tab.classList.add('active');
    }
  });

  resetUI();
}

function resetUI() {
  document.getElementById("quiz-container").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("progress-container")?.style.setProperty("display", "none");
  document.getElementById("timer").style.display = "none";
  document.getElementById("feedback-toggle").style.display = "flex";
  document.getElementById("questionCount").innerText = "";
  quizCompleted = false;
  currentQuestionIndex = 0;
  secondsSpent = 0;
}

function askNumberOfQuestions() {
  const file = selectedCourse === 'health' ? 'questions.json' : 'messiah.json';
  fetch(file)
    .then(res => res.json())
    .then(data => {
      if (selectedCourse === 'messiah') {
        allQuestions = data[selectedChapter] || [];
      } else {
        allQuestions = data;
      }

      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
      let num = prompt(`How many questions? (Max: ${allQuestions.length})`);
      num = parseInt(num);
      if (!num || num <= 0 || num > allQuestions.length) {
        alert("Invalid number. Starting full quiz.");
        num = allQuestions.length;
      }

      questions = allQuestions.slice(0, num);
      startQuiz();
    })
    .catch(err => {
      alert("Error loading questions.");
      console.error(err);
    });
}

function startQuiz() {
  currentQuestionIndex = 0;
  quizCompleted = false;
  document.getElementById("summary").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("prevBtn").style.display = "inline-block";
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("prevBtn").disabled = true;
  document.getElementById("submitBtn").style.display = "inline-block";
  document.getElementById("timer").style.display = "block";
  document.getElementById("feedback-toggle").style.display = "none";
  document.getElementById("questionCount").innerText = "";
  document.getElementById("quiz-container").innerHTML = "";

  startTimer();
  displayQuestion();
}

function displayQuestion() {
  const container = document.getElementById("quiz-container");
  if (!questions || questions.length === 0) {
    container.innerHTML = "<p>No questions found.</p>";
    return;
  }

  const q = questions[currentQuestionIndex];
  container.innerHTML = `
    <p><strong>${currentQuestionIndex + 1}. ${q.question}</strong></p>
    ${q.options.map(opt => {
      let className = 'option';
      if (!immediateFeedback && q.selected === opt) className += ' selected';
      if (immediateFeedback && q.selected) {
        if (opt === q.correct) className += ' correct-answer';
        else if (opt === q.selected) className += ' wrong-answer';
      }
      const clickHandler = (!immediateFeedback || !q.selected) ? `onclick="selectAnswer('${opt}')"` : '';
      return `<div class="${className}" ${clickHandler}>${opt}</div>`;
    }).join('')}
  `;

  document.getElementById("questionCount").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  updateNavigation();
}

function selectAnswer(option) {
  if (immediateFeedback && questions[currentQuestionIndex].selected) return;
  questions[currentQuestionIndex].selected = option;
  displayQuestion();
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

function updateNavigation() {
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
  document.getElementById("submitBtn").style.display = quizCompleted ? "none" : "inline-block";
}

function confirmSubmit() {
  if (!confirm("Are you sure you want to submit the quiz?")) return;
  submitQuiz();
}

function submitQuiz() {
  quizCompleted = true;
  clearInterval(timerInterval);

  let score = 0;
  questions.forEach(q => {
    if (q.selected === q.correct) score++;
  });

  document.getElementById("quiz-container").innerHTML = "<h2>Quiz Completed!</h2>";
  document.getElementById("result").innerHTML = `Your score: ${score} / ${questions.length} <br>Time Taken: ${formatTime(secondsSpent)}`;
  showSummary();

  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "inline-block";
}

function showSummary() {
  const summary = document.getElementById("summary");
  summary.innerHTML = "<h3>Summary:</h3>";

  questions.forEach((q, i) => {
    const correct = q.correct;
    const selected = q.selected || "None";
    const isCorrect = selected === correct;
    summary.innerHTML += `
      <div class="summary-item">
        <p><strong>${i + 1}. ${q.question}</strong></p>
        <p>Your answer: <em>${selected}</em> ${isCorrect ? '<span class="correct">✅ Correct</span>' : '<span class="incorrect">❌ Incorrect</span>'}</p>
        <p>Correct answer: <span class="correct">${correct}</span></p>
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

function formatTime(sec) {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins}m ${secs}s`;
}

document.addEventListener("DOMContentLoaded", () => {
  const feedbackSwitch = document.getElementById("feedbackSwitch");
  immediateFeedback = !feedbackSwitch.checked;

  feedbackSwitch.addEventListener("change", function () {
    immediateFeedback = !this.checked;
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("feedback-toggle").style.display = "none";
  });

  document.addEventListener("keydown", function (event) {
    if (quizCompleted) return;
    if (event.key === "ArrowRight" || event.key === "Enter") {
      if (currentQuestionIndex < questions.length - 1) nextQuestion();
      else confirmSubmit();
    } else if (event.key === "ArrowLeft") {
      prevQuestion();
    }
  });
});
