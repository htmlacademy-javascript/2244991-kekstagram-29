import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect, hideSlider } from './effect.js';

const MAX_HASHTEG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTEG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальны',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const SubmitButtonText = { //текст на кнопке отправить
  UNBLOCK: 'Сохранить',
  BLOCK: 'Сохраняю...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');//форма загрузки
const overlay = form.querySelector('.img-upload__overlay');//подложка
const fileField = form.querySelector('.img-upload__input');//контрол загрузки файла
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const canselButton = document.querySelector('.img-upload__cancel');//кнопка закрыть
const submitButton = form.querySelector('.img-upload__submit'); //кнопка отправить

/**
 * подключаем Pristine
 */
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

/**
 * функция находит элемент в фокусе
 * @return {boolean} - true если попадает в фокус
 */
const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
};

const onInputKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

/**
 * функция открытия модального окна
 */
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  hideSlider();
};

/**
 * функция закрытия модального окна
 */
function hideModal () {
  form.reset(); //очищаем форму
  resetScale();
  resetEffect();
  pristine.reset(); //сброс ошибок pristine
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * Функция по определению хэштега
 * @param {string} tagString
 * @returns {string} обрезаем пробелы, # отсоединяем по пробелу, массив с эл прошедшими проверку
 */
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

/**
 * функция проверяет валидность хештега, соответствует ли он условиям
 * @param {string} value текущее значение
 * перебираем массив на заданные условия, возвращаем true или false
 * .match() возвращает получившиеся совпадения при сопоставлении строки с регулярным выражением
 */
const hasValidTags = (value) => normalizeTags(value).every((tag) => (tag.match(VALID_SYMBOLS)));

/**
 * функция проверяет максимальное количестсво хэштегов
 * @param {string} value
 * @returns
 */
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTEG_COUNT;

/**
 * Функция проверяет хэштеги на уникальность
 * @param {string} value
 * @returns
 */
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());//приводим хэштеги к одному регистру
  return lowerCaseTags.length === new Set(lowerCaseTags).size; // сравниваем длину массива с коллекцией set, в которой указан sise - размер коллекции. если совпадают то коллекция уникальна
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

});

/**
 * закрываем окно кликом по кнопке
 * @returns
 */
const onCancelButtonClick = () => hideModal();

/**
 * открываем окно кликом
 * @returns
 */
const onFileInputChange = () => showModal();


const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  2,
  true
);

const imageFormUpload = () => {
  fileField.addEventListener('change', onFileInputChange);
  canselButton.addEventListener('click', onCancelButtonClick);
  hashtagField.addEventListener('keydown', onInputKeyDown);
  commentField.addEventListener('keydown', onInputKeyDown);
  form.addEventListener('submit', onFormSubmit);

  initScale();
  initEffect();
};

/**
 * функция по блокировке кнопки отправить
 */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;
};

/**
 * функция по разблокировки кнопки отправить
 */
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;
};


/**
 * отправка формы
 * @param {object} cb данные из формы
 */
const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

export { imageFormUpload, hideModal, setOnFormSubmit };


