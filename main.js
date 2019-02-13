/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint no-undef: "error" */
/* eslint-env browser */

// Global variables
let correctAnswer = '';
let currentScore = 0;
let language = '';
let myInterval = '';
let topic = '';

const usedQuestionIndexes = [];

// Variables for HTML elements
const answerColumns = document.getElementById('answer-columns');
const answerOptions = document.querySelectorAll('.answer-option');
const currentQuestion = document.getElementById('current-question');
const finalScore = document.getElementById('final-score');
const finalScoreDisplay = document.getElementById('final-score-display');
const langColumns = document.getElementById('language-columns');
const langIcons = document.querySelectorAll('.lang-icon');
const langOptions = document.querySelectorAll('.lang-option');
const playAgainBtn = document.getElementById('play-again-btn');
const questionColumns = document.getElementById('question-columns');
const quizScreen = document.getElementById('quiz-screen');
const resetBtn = document.getElementById('reset-btn');
const timer = document.getElementById('timer');
const titleSubtitle = document.getElementById('title-subtitle');
const topicColumns = document.getElementById('topic-columns');
const topicIcons = document.querySelectorAll('.topic-icon');
const topicOptions = document.querySelectorAll('.topic-option');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');

langColumns.addEventListener('click', e => {
  if (!e.target.matches('.lang-button, .lang-button *')) return;
  language = e.target.closest('.lang-option').id;
  toggleLangOptions();
  toggleTopics();
});

topicColumns.addEventListener('click', e => {
  if (!e.target.matches('.topic-button, .topic-button *')) return;
  topic = e.target.closest('.topic-option').id;
  toggleSelectedTopic();
  toggleStartBtn();
});

startBtn.addEventListener('click', () => {
  toggleQuizScreen();
  generateQuestion();
  startTimer();
});

answerColumns.addEventListener('click', e => {
  if (!e.target.matches('.answer-option')) return;
  if (e.target.matches('.correct-answer')) {
    correctAnswerChosen(e);
    incrementScore();
    setTimeout(resetOptionClasses, 1000);
    setTimeout(generateQuestion, 1000);
  } else {
    incorrectAnswerChosen(e);
    showCorrectAnswer();
    setTimeout(resetOptionClasses, 1000);
    setTimeout(generateQuestion, 1000);
  }
});

playAgainBtn.addEventListener('click', () => {
  quizScreen.classList.toggle('is-hidden');
  titleSubtitle.classList.toggle('is-hidden');
  finalScore.classList.toggle('is-hidden');
  resetQuiz();
});

resetBtn.addEventListener('click', () => {
  resetQuiz();
});

// When user clicks a language, hide the others
const toggleLangOptions = function toggleSelectedLangOptions() {
  // Only show selected language and show tick alongside
  for (let i = 0; i < langOptions.length; i += 1) {
    if (langOptions[i].id === language) {
      langOptions[i].firstElementChild.classList.toggle('is-static');
      langIcons[i].classList.toggle('is-hidden');
    } else {
      langOptions[i].classList.toggle('is-hidden');
    }
  }
};

const toggleTopics = function toggleTopicChoices() {
  topicColumns.classList.toggle('is-hidden');
};

const toggleSelectedTopic = function toggleSelectedTopicDisplay() {
  // Only show selected topic and show tick alongside
  for (let i = 0; i < topicOptions.length; i += 1) {
    if (topicOptions[i].id === topic) {
      topicOptions[i].firstElementChild.classList.toggle('is-static');
      topicIcons[i].classList.toggle('is-hidden');
    } else {
      topicOptions[i].classList.toggle('is-hidden');
    }
  }
};

const toggleStartBtn = function displayStartBtnBelowChoices() {
  startBtn.classList.toggle('is-hidden');
};

const toggleQuizScreen = function changeToQuizScreen() {
  welcomeScreen.classList.toggle('is-hidden');
  quizScreen.classList.toggle('is-hidden');
};

const getRandomIndex = function getRandomQuestionIndex() {
  // Choose a word pair from topic array, check that it has not been used already during the round, and display the target word on screen
  const indexForQuestion = Math.floor(Math.random() * frenchAnimals.length);

  // Repeate function to choose another value if chosen value has already been used
  if (usedQuestionIndexes.includes(indexForQuestion)) return getRandomIndex();

  // Add question index to array so it is not used again during round
  usedQuestionIndexes.push(indexForQuestion);
  return indexForQuestion;
};

const generateQuestion = function generateQuestionAndPossibleAnswers() {
  const randomIndex = getRandomIndex();

  const chosenQuestion = frenchAnimals[randomIndex];

  correctAnswer = Object.keys(chosenQuestion)[0];
  currentQuestion.textContent = Object.values(chosenQuestion)[0];

  // Choose one of the three answer columns at random and display correct answer inside
  const correctAnswerColumn = document.getElementById(
    `a-column-${Math.floor(Math.random() * 3)}`
  );
  correctAnswerColumn.classList.add('correct-answer');
  correctAnswerColumn.textContent = correctAnswer;

  // Display different incorrect answer options in other two answers columns
  const indexArray = [];
  for (let i = 0; i < answerOptions.length; i += 1) {
    if (!answerOptions[i].classList.contains('correct-answer')) {
      let indexForIncorrectOption = Math.floor(
        Math.random() * (frenchAnimals.length - 2)
      );
      // Ensure different incorrect answer shows in each column
      if (indexArray.includes(indexForIncorrectOption)) indexForIncorrectOption += 1;
      indexArray.push(indexForIncorrectOption);

      // Ensures that correct answer cannot appear again among options
      if (indexForIncorrectOption >= randomIndex) indexForIncorrectOption += 1;
      const incorrectAnswer = frenchAnimals[indexForIncorrectOption];

      answerOptions[i].textContent = Object.keys(incorrectAnswer)[0];
    }
  }
};

const correctAnswerChosen = function correctAnswerTurnsGreen(e) {
  e.target.classList.add('is-success');
};

const incorrectAnswerChosen = function incorrectAnswerTurnsRed(e) {
  e.target.classList.add('is-danger');
};

const incrementScore = function incrementScoreByOne() {
  currentScore += 1;
  scoreDisplay.textContent = `Score: ${currentScore}`;
};

// Highlights correct answer in green when incorrect answer chosen
const showCorrectAnswer = function showCorrectAnswerInGreen() {
  for (let i = 0; i < answerOptions.length; i += 1) {
    if (answerOptions[i].classList.contains('correct-answer')) {
      answerOptions[i].classList.add('is-success');
    }
  }
};

const resetOptionClasses = function resetOptionClassesAfterQ() {
  for (let i = 0; i < answerOptions.length; i += 1) {
    if (answerOptions[i].classList.contains('is-success')) {
      answerOptions[i].classList.remove('correct-answer', 'is-success');
    } else answerOptions[i].classList.remove('is-danger');
  }
};

const startTimer = function startTimerCountdown() {
  const maxTicks = 59;
  let tickCount = -1;
  const tick = () => {
    if (tickCount >= maxTicks) {
      // Stops the interval.
      clearInterval(myInterval);
      // End the round
      stopQuiz();
      return;
    }
    const timeRemaining = maxTicks - tickCount;
    if (timeRemaining < 10) timer.textContent = `Time Remaining: 0${timeRemaining}`;
    else timer.textContent = `Time Remaining: ${timeRemaining}`;

    tickCount += 1;
  };

  // Call tick function every second.
  myInterval = setInterval(tick, 1000);
};

const stopTimer = function stopTimerFunction() {
  clearInterval(myInterval);
  timer.textContent = `Time Remaining: 60`;
};

const resetAnswers = function resetAnswersToDefault() {
  for (let i = 0; i < answerOptions.length; i += 1) {
    if (!answerOptions[i].classList.contains('correct-answer')) {
      answerOptions[i].classList.remove('correct-answer');
    }
  }
};

const resetScore = function resetScoreToZero() {
  currentScore = 0;
  scoreDisplay.textContent = `Score: ${currentScore}`;
}

const resetQuiz = function resetQuizProgress() {
  stopTimer();
  resetAnswers();
  resetOptionClasses();
  resetScore();
  toggleLangOptions();
  toggleSelectedTopic();
  toggleTopics();
  toggleStartBtn();
  toggleQuizScreen();
};

const stopQuiz = function stopQuizWhenRoundEnds() {
  console.log('end of quiz!');
  finalScoreDisplay.textContent = `Your Score is ${currentScore}`;
  quizScreen.classList.toggle('is-hidden');
  titleSubtitle.classList.toggle('is-hidden');
  finalScore.classList.toggle('is-hidden');
};
