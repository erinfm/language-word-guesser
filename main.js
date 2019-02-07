/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint no-undef: "error" */
/* eslint-env browser */

// Global variables
let language = '';
let topic = '';

// Variables for HTML elements
const langColumns = document.getElementById('language-columns');
const langOptions = document.querySelectorAll('.lang-option');
const topicColumns = document.getElementById('topic-columns');
const topicOptions = document.querySelectorAll('.topic-option');
const langIcons = document.querySelectorAll('.lang-icon');
const topicIcons = document.querySelectorAll('.topic-icon');
const startBtn = document.getElementById('start-btn');

// Event listeners
for (let i = 0; i < langOptions.length; i += 1) {
  langOptions[i].addEventListener('click', () => {
    language = langOptions[i].id;
    selectedLanguage();
    displayTopics();
  });
}

for (let i = 0; i < topicOptions.length; i += 1) {
  topicOptions[i].addEventListener('click', () => {
    topic = topicOptions[i].id;
    selectedTopic();
    displayStartBtn();
  });
}

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




