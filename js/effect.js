import { sliderEffects } from './data-slider.js';

const sliderEffectsList = document.querySelector('.effects__list'); // список эффектов
const effectValueElement = document.querySelector('.effect-level__value'); // ползунок слайдера для каждой li
const photoPreview = document.querySelector('.img-upload__preview img'); //загруженное фото для обрабоки
const sliderContainer = document.querySelector('.img-upload__effect-level'); //
const sliderElement = document.querySelector('.effect-level__slider');

/**
 * Функция скрывает слайдер
 */
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

/**
 * Функция по изменению фильтров слайдера
 * @param {object} effect имя выбраного фильтра
 * @param {object} value значение ползунока выбраного фильтра
 * @param {object} unit единица измерения выбраного фильтра
 */
const changeSliderFilters = (effect, value, unit) => {
  effectValueElement.value = value;
  photoPreview.style.filter = `${effect}(${value}${unit})`;
};

/**
 * отображение слайдера
 * @param {object} effects
 */
const showSlider = (effects) => {
  const {min, max, step} = effects;
  sliderContainer.classList.remove('hidden'); //показывается слайдер
  noUiSlider.create(sliderElement, {
    range: {
      min: min, //min
      max: max //max значение позунка
    },
    start: max, //при открытии всегда в max позиции
    step: step, //шаг ползунка
    connect: 'lower', //при использовании одной ручкой
  });

  sliderElement.noUiSlider.on('update', () => { //обновление значения ползунка
    const sliderValue = sliderElement.noUiSlider.get();
    changeSliderFilters(effects.name, sliderValue, effects.unit);
  });
};


/**
 * функция по сбросу эффектов
 */
const resetEffect = () => {
  hideSlider(); //скрывается слайдер
  photoPreview.style.filter = null; //сбрасываем параметры у фото
  effectValueElement.value = null; //сбрасываем ползунок

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

/**
 * функция по изменению эффектов при использовании бегунка
 * @param {object} evt объект события
 * @returns
 */
function onClickChangeEffect (evt) {
  resetEffect(); //сброс эффектов слайдера при переключении
  const effects = sliderEffects[evt.target.value];

  if (effects.name === 'none') {
    photoPreview.removeAttribute('style');
    return;
  }
  showSlider(effects);
}

/**
 * инициализация слайдера
 */
const initEffect = () => {
  sliderEffectsList.addEventListener('change', onClickChangeEffect);
};

export {initEffect, hideSlider, resetEffect};
