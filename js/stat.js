'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLOR_USER = 'rgba(255, 0, 0, 1)';
var COLOR_CLOUD = '#fff';
var COLOR_CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP = 50;
var INITIAL_X = 130;
var TEXT_GAP = 10;
var FONT_CTX = '16px PTMono';
var COLOR_TEXT = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var findMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function () {
  return Math.floor(Math.random() * 100);
};

var getColor = function (name) {
  if (name === 'Вы') {
    return COLOR_USER;
  } else {
    return 'hsl(240,' + getRandomNumber() + '%, 50%)';
  }
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP, COLOR_CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD);

  ctx.font = FONT_CTX;
  ctx.fillStyle = COLOR_TEXT;
  ctx.fillText('Ура вы победили!', CLOUD_X + 30, CLOUD_Y + 35);
  ctx.fillText('Список результатов: ', CLOUD_X + 30, CLOUD_Y + 55);

  var maxArrElement = findMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    var time = times[i];
    var name = names[i];
    var arrHeight = BAR_HEIGHT * Math.round(time) / maxArrElement;
    var valueX = INITIAL_X + i * GAP + i * BAR_WIDTH;
    var valueY = CLOUD_X + BAR_HEIGHT;

    ctx.fillStyle = getColor(name);
    ctx.fillRect(valueX, valueY, BAR_WIDTH, -arrHeight);
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(Math.round(time), valueX, valueY - arrHeight - TEXT_GAP);
    ctx.fillText(name, valueX, valueY + 20);
  }
};
