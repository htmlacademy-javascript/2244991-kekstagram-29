import { isEscapeKey } from './util.js';

const COMMENT_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture'); //модальное окно
const commentShowCountElement = bigPictureElement.querySelector('.social__comment-count');//элемент для вывода информации и количества комментариев
const commentListElement = bigPictureElement.querySelector('.social__comments');//список комментариев
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader'); //кнопка загрузить комментарии
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');//кнопка закрыть комментарии
const commentElement = commentListElement.querySelector('.social__comment');//один комментарий

let commentsShown = 0;
let comments = [];

/**
 * функция по созданию живой строки
 */
const fillCommentsCounter = () => {
  commentShowCountElement.innerHTML = `${commentsShown} из <span class="comment-count">${comments.length}</span> комментариев`;
};

/**
 * Функция по отрисовке одного комментария
 * @param {object} -детруктуризация параметров объекта: avatar, name, message
 * @returns шаблон одного комментария
 */
const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

/**
 * функция по отрисовке комментариев
 * @param {array} массив с комментариями
 */
const renderComments = () => {
  commentsShown += COMMENT_PER_PORTION; //переменная показывает сколько комментариев показано и меняется кратно COMMENT_PER_PORTION

  if (commentsShown >= comments.length) {
    commentLoaderElement.classList.add('hidden'); // скрываем кнопку загрузить еще
    commentsShown = comments.length; // указываем общее количество комментариев
  } else {
    commentLoaderElement.classList.remove('hidden'); // показываем кнопку
  }

  const fragment = document.createDocumentFragment(); //создаем фрагмент
  for (let i = 0; i < commentsShown; i++) { //создаем новые комментарии
    const comment = createComment(comments[i]);
    fragment.append(comment); //добавляем элемент в фрагмент
  }

  commentListElement.innerHTML = ''; //очищаем список элементов
  commentListElement.append(fragment); // добавляем фрагмент в ДОМ
  commentShowCountElement.textContent = commentsShown;//
  fillCommentsCounter(comments);//указываем количество показанных комментариев
};


/**
 * функция закрытия модального окна
 */
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden'); // скрываем окно
  bodyElement.classList.remove('modal-open'); // включаем скролл
  document.removeEventListener('keydown', onDocumentKeydown);//обработчик событий при нажатии на клавишу
  commentsShown = 0;
};

/**
 * функция закрытия модального окна с помощью клавиатуры
 * @param {object} evt объект события
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

/**
 *функция для запуска renderComments по параметрам
 * @returns
 */
const onCommentsLoaderClick = () => renderComments(comments);

/**
 * функция закрытия модального окна с помощью клавиатуры
 */
const onCancelButtonClick = () => {
  hideBigPicture();
};

/**
 * функция по заполнению модального окна с картинкой данными
 * @param {object} url, likes, description
 */
const renderPictureDetail = ({ url, likes, description }) => {
  const bigPhoto = bigPictureElement.querySelector('.big-picture__img img');
  bigPhoto.src = url;//адрес изображения
  bigPhoto.alt = description;//описание фото
  bigPictureElement.querySelector('.likes-count').textContent = likes;//лайки
  bigPictureElement.querySelector('.social__caption').textContent = description; //описание фото
};

/**
 * функция по открытию модального окна
 * @param {object} dataPicture
 */
const showBigPicture = (dataPicture) => {
  comments = dataPicture.comments;
  bigPictureElement.classList.remove('hidden'); //открыть модальное окно
  bodyElement.classList.add('modal-open'); //отключаем скролл под модальным окном
  document.addEventListener('keydown', onDocumentKeydown); //добавляем обработчик события при нажатии на клавишу

  renderPictureDetail(dataPicture);
  renderComments(dataPicture.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };

