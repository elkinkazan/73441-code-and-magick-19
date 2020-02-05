'use strict';

var CLASS_TO_REMOVE = 'hidden';
var CLASS_NAME = '.setup';
var API_ELEMENT = document;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ARRAY_LENGTH = 4;

var getRandomInteger = function (max) {
  return Math.floor(Math.random() * max);
};

var removeClass = function (apiElement, className, classToRemoveName) {
  var queryName = apiElement.querySelector(className);
  queryName.classList.remove(classToRemoveName);
};

var generateArray = function () {
  var arr = [];
  var namesLength = NAMES.length;
  var surnamesLength = SURNAMES.length;
  var coatColorsLength = COAT_COLORS.length;
  var eyesColorsLength = EYES_COLORS.length;

  for (var i = 0; i < ARRAY_LENGTH; i++) {
    arr[i] = {
      name: NAMES[getRandomInteger(namesLength)] + ' ' + SURNAMES[getRandomInteger(surnamesLength)],
      coatColor: COAT_COLORS[getRandomInteger(coatColorsLength)],
      eyesColor: EYES_COLORS[getRandomInteger(eyesColorsLength)]
    };
  }
  return arr;
};

var renderWizards = function (similarWizardEx, wizard) {
  var wizardElementEx = similarWizardEx.cloneNode(true);
  wizardElementEx.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElementEx.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElementEx.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElementEx;
};

var fillTemplate = function () {
  var wizards = generateArray();
  var fragment = document.createDocumentFragment();
  var similarList = document.querySelector('.setup-footer');
  var similarListElement = similarList.querySelector('.setup-similar-list');
  var similarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  for (var i = 0; i < ARRAY_LENGTH; i++) {
    fragment.appendChild(renderWizards(similarWizard, wizards[i]));
  }
  similarListElement.appendChild(fragment);
  removeClass(similarList, '.setup-similar', 'hidden');
};

removeClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
fillTemplate();
