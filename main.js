/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint no-undef: "error" */
/* eslint-env browser */

// Global variables
let correctAnswer = '';
let currentScore = 0;
let language = '';
let topic = '';
const usedQuestionIndexes = [];

// Variables for HTML elements
const answerColumns = document.getElementById('answer-columns');
const answerOptions = document.querySelectorAll('.answer-option');
const currentQuestion = document.getElementById('current-question');
const langColumns = document.getElementById('language-columns');
const langIcons = document.querySelectorAll('.lang-icon');
const langOptions = document.querySelectorAll('.lang-option');
const questionColumns = document.getElementById('question-columns');
const quizScreen = document.getElementById('quiz-screen');
const topicColumns = document.getElementById('topic-columns');
const topicIcons = document.querySelectorAll('.topic-icon');
const topicOptions = document.querySelectorAll('.topic-option');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');

langColumns.addEventListener('click', e => {
  if (!e.target.matches('.lang-button, .lang-button *')) return;
  language = e.target.closest('.lang-option').id;
  selectedLanguage();
  displayTopics();
});

topicColumns.addEventListener('click', e => {
  if (!e.target.matches('.topic-button, .topic-button *')) return;
  topic = e.target.closest('.topic-option').id;
  selectedTopic();
  displayStartBtn();
});

startBtn.addEventListener('click', () => {
  displayQuizScreen();
  generateQuestion();
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

// When user clicks a language, hide the others
const selectedLanguage = function displayOnlySelectedLanguage() {
  // Only show selected language and show tick alongside
  for (let i = 0; i < langOptions.length; i += 1) {
    if (langOptions[i].id === language) {
      langOptions[i].firstElementChild.classList.add('is-static');
      langIcons[i].classList.remove('is-hidden');
    } else {
      langOptions[i].classList.add('is-hidden');
    }
  }
};

const displayTopics = function displayTopicChoices() {
  topicColumns.classList.remove('is-hidden');
};

const selectedTopic = function displayOnlySelectedTopic() {
  // Only show selected topic and show tick alongside
  for (let i = 0; i < topicOptions.length; i += 1) {
    if (topicOptions[i].id === topic) {
      topicOptions[i].firstElementChild.classList.add('is-static');
      topicIcons[i].classList.remove('is-hidden');
    } else {
      topicOptions[i].classList.add('is-hidden');
    }
  }
};

const displayStartBtn = function displayStartBtnBelowChoices() {
  startBtn.classList.remove('is-hidden');
};

const displayQuizScreen = function changeToQuizScreen() {
  welcomeScreen.classList.add('is-hidden');
  quizScreen.classList.remove('is-hidden');
};

const getRandomIndex = function getRandomQuestionIndex() {
  // Choose a word pair from topic array, check that it has not been used already during the round, and display the target word on screen
  const randomIndexForQuestion = Math.floor(Math.random() * frenchAnimals.length);

  // Repeate function to choose another value if chosen value has already been used
  if (usedQuestionIndexes.includes(randomIndexForQuestion)) return getRandomIndex();

  // Add question index to array so it is not used again during round
  usedQuestionIndexes.push(randomIndexForQuestion);
  return randomIndexForQuestion;
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
  for (let i = 0; i < answerOptions.length; i += 1) {
    if (!answerOptions[i].classList.contains('correct-answer')) {
      let randomIndexForIncorrectOption = Math.floor(
        Math.random() * (frenchAnimals.length - 1)
      );
      // Ensure different incorrect answer shows in each column

      // Ensures that correct answer cannot appear again among options
      if (randomIndexForIncorrectOption >= randomIndex)
        randomIndexForIncorrectOption += 1;
      const incorrectAnswer = frenchAnimals[randomIndexForIncorrectOption];

      console.log(incorrectAnswer);
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
  score.textContent = `Score: ${currentScore}`;
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
