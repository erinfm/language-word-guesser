/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint no-undef: "error" */
/* eslint-env browser */

// Global variables
let language = '';

// Variables for HTML elements
const langColumns = document.getElementById('language-columns');
const langOptions = document.querySelectorAll('.lang-option');
const topicOptions = document.querySelectorAll('.topic-option');
const langIcons = document.querySelectorAll('.lang-icon');

// Event listeners
for (let i = 0; i < langOptions.length; i += 1) {
  langOptions[i].addEventListener('click', () => {
    const chosenLanguage = langOptions[i];
    language = langOptions[i].id;
    selectedLanguage();
    displayTopics();
  });
}

// When user clicks a language, hide the others
const selectedLanguage = function displayOnlySelectedLanguage() {
  // Show tick next to lang name
  for (let i = 0; i < langIcons.length; i += 1) {
    langIcons[i].classList.remove('is-hidden');
  }
  // Only show selected option
  for (let i = 0; i < langOptions.length; i += 1) {
    if (langOptions[i].id !== language) {
      langOptions[i].classList.add('is-hidden');
    } else {
      langOptions[i].classList.remove('is-fullwidth');
    }
  }
};

const displayTopics = function displayTopicChoices() { };

const selectedTopic = function highlightSelectedTopic() { };
