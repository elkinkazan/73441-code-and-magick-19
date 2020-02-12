'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var CLASS_TO_REMOVE = 'hidden';
var CLASS_NAME = '.setup';
var API_ELEMENT = document;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var SETUP_WIZARD = document.querySelector('.setup-wizard');
var WIZARDS_COAT = SETUP_WIZARD.querySelector('.wizard-coat');
var WIZARDS_EYES = SETUP_WIZARD.querySelector('.wizard-eyes');
var FIREBALL = document.querySelector('.setup-fireball-wrap');
var WIZARD_FORM = document.querySelector('.setup-wizard-form');
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP_CLOSE = document.querySelector('.setup-close');
var USERNAME_INPUT = document.querySelector('.setup-user-name');
var SETUP_FORM = document.querySelector('.setup-wizard-form');
var SETUP_BUTTON = document.querySelector('.setup-submit');


var getRandomInteger = function (max) {
  return Math.floor(Math.random() * max);
};

var removeClass = function (apiElement, className, classToRemoveName) {
  var queryName = apiElement.querySelector(className);
  queryName.classList.remove(classToRemoveName);
};

var addClass = function (apiElement, className, classToRemoveName) {
  var queryName = apiElement.querySelector(className);
  queryName.classList.add(classToRemoveName);
};

var onSetupOpenClick = function () {
  removeClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
};

var onSetupOpenKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    removeClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
  }
};

var onSetupCloseClick = function () {
  addClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
};

var onSetupFormKeydown = function (evt) {
  if ((evt.key === ESC_KEY) && !(evt.target.matches('input'))) {
    addClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
  }
};

var onSetupCloseKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    addClass(API_ELEMENT, CLASS_NAME, CLASS_TO_REMOVE);
  }
};

var onInputInvalid = function (evt) {
  var target = evt.target;
  if (target.validity.tooShort) {
    target.setCustomValidity('Минимальное значение - 2 символа');
  } else if (target.value.length > 25) {
    target.setCustomValidity('Максимальное значение - 25 символов');
  }
};

var onButtonKeydown = function (evt) {
  if (evt.target.matches('.setup-submit')) {
    if (evt.key === ENTER_KEY) {
      WIZARD_FORM.submit();
    }
  }
};

var onButtonClick = function () {
  WIZARD_FORM.submit();
};

var onCoatClick = function () {
  var num = getRandomInteger((COAT_COLORS.length - 1));
  WIZARDS_COAT.style.fill = COAT_COLORS[num];
  document.querySelector('input[name="coat-color"]')
  .value = COAT_COLORS[num];
};

var onEyesClick = function () {
  var num = getRandomInteger((EYES_COLORS.length - 1));
  WIZARDS_EYES.style.fill = EYES_COLORS[num];
  document.querySelector('input[name$="eyes-color"]')
  .value = EYES_COLORS[num];
};

var onFireballClick = function () {
  var num = getRandomInteger((FIREBALL_COLORS.length - 1));
  FIREBALL.style.background = FIREBALL_COLORS[num];
  FIREBALL.querySelector('input[name$="fireball-color"]')
  .value = FIREBALL_COLORS[num];
};

var getCoatColor = function (counter, arrCheck, coatColorLength) {
  var randomColor = COAT_COLORS[getRandomInteger(coatColorLength)];
  var found = false;
  while (!found) {
    for (var i = 0; i < counter; i++) {
      if (arrCheck[i].coatColor === randomColor) {
        randomColor = COAT_COLORS[getRandomInteger(coatColorLength)];
        break;
      }
    }
    if (i === counter) {
      found = true;
    }
  }
  return randomColor;
};

var getEyesColor = function (counter, arrCheck, eyeColorLength) {
  var randomColor = EYES_COLORS[getRandomInteger(eyeColorLength)];
  var found = false;
  while (!found) {
    for (var i = 0; i < counter; i++) {
      if (arrCheck[i].eyesColor === randomColor) {
        randomColor = EYES_COLORS[getRandomInteger(eyeColorLength)];
        break;
      }
    }
    if (i === counter) {
      found = true;
    }
  }
  return randomColor;
};

var generateArrayOfWizards = function () {
  var arr = [];
  var namesLength = NAMES.length;
  var surnamesLength = SURNAMES.length;
  var coatColorsLength = COAT_COLORS.length;
  var eyesColorsLength = EYES_COLORS.length;

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    arr[i] = {
      name: NAMES[getRandomInteger(namesLength)] + ' ' + SURNAMES[getRandomInteger(surnamesLength)],
      coatColor: getCoatColor(i, arr, coatColorsLength),
      eyesColor: getEyesColor(i, arr, eyesColorsLength)
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
  var wizards = generateArrayOfWizards();
  var fragment = document.createDocumentFragment();
  var similarList = document.querySelector('.setup-footer');
  var similarListElement = similarList.querySelector('.setup-similar-list');
  var similarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizards(similarWizard, wizards[i]));
  }
  similarListElement.appendChild(fragment);
  removeClass(similarList, '.setup-similar', 'hidden');
};


SETUP_OPEN.addEventListener('click', onSetupOpenClick);
SETUP_OPEN.addEventListener('keydown', onSetupOpenKeydown);
SETUP_CLOSE.addEventListener('click', onSetupCloseClick);
SETUP_CLOSE.addEventListener('keydown', onSetupCloseKeydown);
SETUP_FORM.addEventListener('keydown', onSetupFormKeydown);
USERNAME_INPUT.addEventListener('invalid', onInputInvalid);
SETUP_BUTTON.addEventListener('click', onButtonClick);
SETUP_BUTTON.addEventListener('keydown', onButtonKeydown);
WIZARDS_COAT.addEventListener('click', onCoatClick);
WIZARDS_EYES.addEventListener('click', onEyesClick);
FIREBALL.addEventListener('click', onFireballClick);

fillTemplate();
