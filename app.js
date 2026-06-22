/* ============================================================
   app.js  -  Aadil Quiz
   Handles: subject selection, settings, question flow, scoring,
   per-question timer, results, local-storage high scores, theming.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Constants ---------- */
  const TIME_PER_QUESTION = 30;          // seconds
  const LETTERS = ["A", "B", "C", "D"];
  const HS_KEY = "quizmaster_highscores";
  const THEME_KEY = "quizmaster_theme";

  /* ---------- DOM references ---------- */
  const el = {
    // screens
    startScreen: document.getElementById("startScreen"),
    quizScreen: document.getElementById("quizScreen"),
    resultScreen: document.getElementById("resultScreen"),
    // start screen
    subjectGrid: document.getElementById("subjectGrid"),
    difficultySelect: document.getElementById("difficultySelect"),
    countSelect: document.getElementById("countSelect"),
    randomizeToggle: document.getElementById("randomizeToggle"),
    timerToggle: document.getElementById("timerToggle"),
    startBtn: document.getElementById("startBtn"),
    highScoreBox: document.getElementById("highScoreBox"),
    highScoreText: document.getElementById("highScoreText"),
    // quiz screen
    subjectBadge: document.getElementById("subjectBadge"),
    questionCounter: document.getElementById("questionCounter"),
    timerWrap: document.getElementById("timerWrap"),
    timerText: document.getElementById("timerText"),
    progressBar: document.getElementById("progressBar"),
    liveScore: document.getElementById("liveScore"),
    questionText: document.getElementById("questionText"),
    optionsList: document.getElementById("optionsList"),
    nextBtn: document.getElementById("nextBtn"),
    quitBtn: document.getElementById("quitBtn"),
    // result screen
    resultEmoji: document.getElementById("resultEmoji"),
    resultHeadline: document.getElementById("resultHeadline"),
    resultMessage: document.getElementById("resultMessage"),
    ringProgress: document.getElementById("ringProgress"),
    percentText: document.getElementById("percentText"),
    statScore: document.getElementById("statScore"),
    statCorrect: document.getElementById("statCorrect"),
    statIncorrect: document.getElementById("statIncorrect"),
    newRecordBadge: document.getElementById("newRecordBadge"),
    restartBtn: document.getElementById("restartBtn"),
    homeBtn: document.getElementById("homeBtn"),
    // misc
    themeToggle: document.getElementById("themeToggle"),
    year: document.getElementById("year"),
  };

  /* ---------- App state ---------- */
  const state = {
    subjectKey: null,
    questions: [],      // active question set for this run
    index: 0,
    score: 0,
    correct: 0,
    incorrect: 0,
    answered: false,
    timerId: null,
    timeLeft: TIME_PER_QUESTION,
    useTimer: true,
  };

  /* =========================================================
     Initialisation
     ========================================================= */
  function init() {
    el.year.textContent = new Date().getFullYear();
    loadTheme();
    buildSubjectTiles();
    bindEvents();
  }

  /* ---------- Theme ---------- */
  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    setTheme(saved);
  }
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    el.themeToggle.querySelector(".theme-icon").textContent =
      theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
    localStorage.setItem(THEME_KEY, theme);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  }

  /* ---------- Build subject selection tiles ---------- */
  function buildSubjectTiles() {
    el.subjectGrid.innerHTML = "";
    Object.keys(QUIZ_DATA).forEach((key) => {
      const subject = QUIZ_DATA[key];
      const tile = document.createElement("button");
      tile.className = "subject-tile";
      tile.type = "button";
      tile.dataset.key = key;
      tile.innerHTML =
        '<span class="tile-icon">' + subject.icon + "</span>" +
        '<span class="tile-name">' + subject.name + "</span>" +
        '<span class="tile-count">' + subject.questions.length + " questions</span>";
      tile.addEventListener("click", () => selectSubject(key, tile));
      el.subjectGrid.appendChild(tile);
    });
  }

  function selectSubject(key, tile) {
    state.subjectKey = key;
    document.querySelectorAll(".subject-tile").forEach((t) => t.classList.remove("selected"));
    tile.classList.add("selected");
    el.startBtn.disabled = false;
    el.startBtn.textContent = "Start " + QUIZ_DATA[key].name + " Quiz";
    showHighScore(key);
  }

  /* ---------- High score helpers ---------- */
  function getHighScores() {
    try {
      return JSON.parse(localStorage.getItem(HS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function showHighScore(key) {
    const scores = getHighScores();
    const best = scores[key];
    if (best != null) {
      el.highScoreBox.classList.remove("hidden");
      el.highScoreText.textContent =
        "Best " + QUIZ_DATA[key].name + " score: " + best + "%";
    } else {
      el.highScoreBox.classList.add("hidden");
    }
  }
  function saveHighScore(key, percent) {
    const scores = getHighScores();
    const prev = scores[key] != null ? scores[key] : -1;
    if (percent > prev) {
      scores[key] = percent;
      localStorage.setItem(HS_KEY, JSON.stringify(scores));
      return true; // new record
    }
    return false;
  }

  /* ---------- Utility: shuffle (Fisher-Yates) ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* =========================================================
     Quiz setup & flow
     ========================================================= */
  function buildQuestionSet() {
    const subject = QUIZ_DATA[state.subjectKey];
    let pool = subject.questions.slice();

    // filter by difficulty
    const diff = el.difficultySelect.value;
    if (diff !== "all") {
      const filtered = pool.filter((q) => q.difficulty === diff);
      if (filtered.length > 0) pool = filtered; // fall back to all if empty
    }

    // randomize order
    if (el.randomizeToggle.checked) pool = shuffle(pool);

    // limit count
    const count = parseInt(el.countSelect.value, 10);
    if (count > 0 && count < pool.length) pool = pool.slice(0, count);

    return pool;
  }

  function startQuiz() {
    if (!state.subjectKey) return;

    state.questions = buildQuestionSet();
    state.index = 0;
    state.score = 0;
    state.correct = 0;
    state.incorrect = 0;
    state.useTimer = el.timerToggle.checked;

    el.subjectBadge.textContent =
      QUIZ_DATA[state.subjectKey].icon + " " + QUIZ_DATA[state.subjectKey].name;
    el.liveScore.textContent = "0";
    el.timerWrap.style.display = state.useTimer ? "flex" : "none";

    switchScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    state.answered = false;
    const q = state.questions[state.index];

    // counter + progress
    el.questionCounter.textContent =
      "Question " + (state.index + 1) + " of " + state.questions.length;
    const progress = (state.index / state.questions.length) * 100;
    el.progressBar.style.width = progress + "%";

    // question text
    el.questionText.textContent = q.q;

    // re-trigger entry animation
    const box = el.questionText.closest(".question-box");
    box.style.animation = "none";
    void box.offsetWidth; // reflow
    box.style.animation = "";

    // options
    el.optionsList.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.dataset.index = i;
      btn.innerHTML =
        '<span class="option-key">' + LETTERS[i] + "</span>" +
        '<span class="option-text">' + opt + "</span>";
      btn.addEventListener("click", () => handleAnswer(i));
      el.optionsList.appendChild(btn);
    });

    // next button label / state
    el.nextBtn.disabled = true;
    el.nextBtn.textContent =
      state.index === state.questions.length - 1 ? "See Results" : "Next Question";

    // timer
    if (state.useTimer) startTimer();
  }

  /* ---------- Timer ---------- */
  function startTimer() {
    clearTimer();
    state.timeLeft = TIME_PER_QUESTION;
    updateTimerUI();
    state.timerId = setInterval(() => {
      state.timeLeft--;
      updateTimerUI();
      if (state.timeLeft <= 0) {
        clearTimer();
        handleTimeout();
      }
    }, 1000);
  }
  function updateTimerUI() {
    el.timerText.textContent = state.timeLeft;
    el.timerWrap.classList.toggle("danger", state.timeLeft <= 5);
  }
  function clearTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
    el.timerWrap.classList.remove("danger");
  }

  /* ---------- Answering ---------- */
  function handleAnswer(selectedIndex) {
    if (state.answered) return;
    state.answered = true;
    clearTimer();

    const q = state.questions[state.index];
    const buttons = el.optionsList.querySelectorAll(".option-btn");

    buttons.forEach((btn) => {
      const idx = parseInt(btn.dataset.index, 10);
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
      if (idx === selectedIndex && idx !== q.answer) btn.classList.add("incorrect");
    });

    if (selectedIndex === q.answer) {
      state.score++;
      state.correct++;
      el.liveScore.textContent = state.score;
    } else {
      state.incorrect++;
    }

    el.nextBtn.disabled = false;
  }

  function handleTimeout() {
    // Time ran out: mark as incorrect, reveal the correct answer.
    if (state.answered) return;
    state.answered = true;

    const q = state.questions[state.index];
    const buttons = el.optionsList.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      const idx = parseInt(btn.dataset.index, 10);
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
    });

    state.incorrect++;
    el.nextBtn.disabled = false;
  }

  function nextQuestion() {
    if (state.index < state.questions.length - 1) {
      state.index++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  /* =========================================================
     Results
     ========================================================= */
  function finishQuiz() {
    clearTimer();
    el.progressBar.style.width = "100%";

    const total = state.questions.length;
    const percent = total > 0 ? Math.round((state.correct / total) * 100) : 0;

    el.statScore.textContent = state.correct + "/" + total;
    el.statCorrect.textContent = state.correct;
    el.statIncorrect.textContent = state.incorrect;
    el.percentText.textContent = percent + "%";

    // animate score ring (circumference = 2*pi*52 ~= 326.7)
    const circumference = 326.7;
    const offset = circumference - (percent / 100) * circumference;
    // reset then animate
    el.ringProgress.style.strokeDashoffset = circumference;
    setTimeout(() => {
      el.ringProgress.style.strokeDashoffset = offset;
    }, 100);

    // colour ring + feedback based on performance
    const feedback = getFeedback(percent);
    el.resultEmoji.textContent = feedback.emoji;
    el.resultHeadline.textContent = feedback.headline;
    el.resultMessage.textContent = feedback.message;
    el.ringProgress.style.stroke = feedback.color;

    // high score
    const isRecord = saveHighScore(state.subjectKey, percent);
    el.newRecordBadge.classList.toggle("hidden", !isRecord);

    switchScreen("result");
  }

  function getFeedback(percent) {
    if (percent === 100)
      return { emoji: "\uD83C\uDFC6", headline: "Perfect Score!", message: "Flawless! You answered every question correctly.", color: "#4CAF50" };
    if (percent >= 80)
      return { emoji: "\uD83C\uDF89", headline: "Excellent!", message: "Great job \u2014 you really know your stuff!", color: "#4CAF50" };
    if (percent >= 60)
      return { emoji: "\uD83D\uDC4D", headline: "Well Done!", message: "A solid result. Keep practising to reach the top!", color: "#6366f1" };
    if (percent >= 40)
      return { emoji: "\uD83D\uDCDA", headline: "Not Bad!", message: "You're getting there. A little more study will help.", color: "#f59e0b" };
    return { emoji: "\uD83D\uDCAA", headline: "Keep Trying!", message: "Don't give up \u2014 review the topic and try again.", color: "#F44336" };
  }

  /* =========================================================
     Navigation helpers
     ========================================================= */
  function switchScreen(name) {
    el.startScreen.classList.remove("active");
    el.quizScreen.classList.remove("active");
    el.resultScreen.classList.remove("active");
    if (name === "start") el.startScreen.classList.add("active");
    else if (name === "quiz") el.quizScreen.classList.add("active");
    else if (name === "result") el.resultScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    clearTimer();
    if (state.subjectKey) showHighScore(state.subjectKey);
    switchScreen("start");
  }

  function quitToHome() {
    clearTimer();
    goHome();
  }

  /* =========================================================
     Event bindings
     ========================================================= */
  function bindEvents() {
    el.startBtn.addEventListener("click", startQuiz);
    el.nextBtn.addEventListener("click", nextQuestion);
    el.quitBtn.addEventListener("click", quitToHome);
    el.restartBtn.addEventListener("click", startQuiz);
    el.homeBtn.addEventListener("click", goHome);
    el.themeToggle.addEventListener("click", toggleTheme);

    // keyboard support: 1-4 / A-D to answer, Enter for next
    document.addEventListener("keydown", (e) => {
      if (!el.quizScreen.classList.contains("active")) return;
      const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
      const k = e.key.toLowerCase();
      if (k in keyMap && !state.answered) {
        const btns = el.optionsList.querySelectorAll(".option-btn");
        if (btns[keyMap[k]]) btns[keyMap[k]].click();
      } else if (e.key === "Enter" && !el.nextBtn.disabled) {
        el.nextBtn.click();
      }
    });
  }

  /* ---------- Go ---------- */
  document.addEventListener("DOMContentLoaded", init);
})();
