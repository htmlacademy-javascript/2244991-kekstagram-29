const MAX_HASHTEG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTEG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальны',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const canselButton = document.querySelector('.img-upload__cancel');

/**
 * подключаем Pristine
 */
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

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
};

/**
 * функция закрытия модального окна
 */
function hideModal () {
  form.reset(); //очищаем форму
  // resetScale();
  // resetEffect();
  pristine.reset(); //сброс ошибок pristine
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

/**
 * функция проверяет валидность хештега, соответствует ли он условиям
 * @param {string} value
 * @returns
 */
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag)); //методом test хэштеги на соотвествие регулярному выражению, и мето  умукн возвращает booley

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
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.tolowerCase());//приводим хэштеги к одному регистру
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


const onformSubmit = (evt) => {
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
  form.addEventListener('submit', onformSubmit);

  // initScaler();
  // initEffect();
};

export { imageFormUpload };

