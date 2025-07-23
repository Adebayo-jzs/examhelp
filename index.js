let allQuestions = [];
let questions = [];
let currentQuestionIndex = 0;
let quizCompleted = false;
let timerInterval;
let secondsSpent = 0;
let immediateFeedback = true;
let selectedCourse = 'health';
let selectedChapter = 'chapter1';

function selectChapter(chapterId) {
  selectedChapter = chapterId;
  resetUI();
  // Update tab UI
  document.querySelectorAll('.chapter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.trim() === `Chapter ${chapterId.replace('chapter','')}`) {
      tab.classList.add('active');
    }
  });
}

function selectCourse(courseId) {
  selectedCourse = courseId;
  resetUI();

  // Update course tab UI
  document.querySelectorAll('.course-tab').forEach(tab => {
    tab.classList.remove('active');
    if ((courseId === 'health' && tab.textContent.trim() === 'Health Principles') ||
        (courseId === 'messiah' && tab.textContent.trim() === 'Christ the Messiah')) {
      tab.classList.add('active');
    }
  });

  // Show/hide chapter tabs
  if (courseId === 'messiah') {
    document.getElementById('chapter-tabs').style.display = 'grid';
  } else {
    document.getElementById('chapter-tabs').style.display = 'none';
    selectedChapter = 'chapter1';
    document.querySelectorAll('.chapter-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector('.chapter-tab')?.classList.add('active');
  }
}

function resetUI() {
  document.getElementById("quiz-container").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("feedback-toggle").style.display = "flex";
  document.getElementById("questionCount").innerText = "";
  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "none";
  currentQuestionIndex = 0;
  secondsSpent = 0;
  quizCompleted = false;

  // Remove chapter title if exists
  const oldHeading = document.getElementById("chapter-heading");
  if (oldHeading) oldHeading.remove();
}

document.addEventListener("DOMContentLoaded", function() {
  const feedbackSwitch = document.getElementById("feedbackSwitch");
  const feedbackToggle = document.getElementById("feedback-toggle");
  immediateFeedback = !feedbackSwitch.checked;
  feedbackSwitch.addEventListener("change", function() {
    immediateFeedback = !this.checked;
  });

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function() {
    feedbackToggle.style.display = "none";
  });
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === "ArrowRight") {
    if (currentQuestionIndex === questions.length - 1) {
      confirmSubmit();
    } else {
      nextQuestion();
    }
  } else if (event.key === "ArrowLeft") {
    prevQuestion();
  }
});

function askNumberOfQuestions() {
  let file = selectedCourse === 'health' ? 'questions.json' : 'messiah.json';
  fetch(file)
    .then(response => response.json())
    .then(data => {
      if (selectedCourse === 'messiah') {
        allQuestions = data[selectedChapter] || [];
      } else {
        allQuestions = data;
      }
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
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
  resetUI();
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("prevBtn").style.display = "inline-block";
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("submitBtn").style.display = "inline-block";
  document.getElementById("timer").style.display = "block";
  document.getElementById("feedback-toggle").style.display = "none";

  // Hide chapter tabs and show chapter/course title
  const chapterTabs = document.getElementById('chapter-tabs');
  chapterTabs.style.display = 'none';
  const courseTabs = document.getElementById('course-tabs');
  courseTabs.style.display = 'none';
  const heading = document.createElement("h3");
  heading.id = "chapter-heading";
  heading.style.textAlign = "center";
  heading.style.color = "#0077ff";
  heading.style.marginBottom = "20px";

  if (selectedCourse === 'messiah') {
    heading.textContent = `Christ the Messiah: Chapter ${selectedChapter.replace('chapter', '')}`;
  } else {
    heading.textContent = " Health Principles Quiz";
  }

  const container = document.getElementById("quiz-container");
  container.parentNode.insertBefore(heading, container);

  startTimer();
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
      if (!immediateFeedback && q.selected === option) optionClass += ' selected';

      if (immediateFeedback && q.selected) {
        if (option === q.selected && q.selected !== q.correct) {
          optionClass += ' wrong-answer';
        }
        if (option === q.correct) {
          optionClass += ' correct-answer';
        }
      }

      const clickable = (!immediateFeedback || !q.selected) ? `onclick="selectAnswer('${option}')"` : "";
      return `<div class="${optionClass}" ${clickable}>${option}</div>`;
    }).join('')}
  `;
  document.getElementById("questionCount").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  updateNavigation();
}

function selectAnswer(selectedOption) {
  if (immediateFeedback && questions[currentQuestionIndex].selected) return;
  questions[currentQuestionIndex].selected = selectedOption;
  displayQuestion();
}

function updateNavigation() {
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
  document.getElementById("submitBtn").style.display = "inline-block";
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

function confirmSubmit() {
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
    <p>Are you sure you want to submit your answers?</p>
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
  document.getElementById("restartBtn").style.display = "inline-block";
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
    document.getElementById("timer").innerText = `🕛 ${formatTime(secondsSpent)}`;
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}
