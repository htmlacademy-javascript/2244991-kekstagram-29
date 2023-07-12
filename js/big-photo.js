const bigPictureElement = document.querySelector('.big-picture'); //модальное окно
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');//элемент для вывода информации и количества комментариев
const commentListElement = bigPictureElement.querySelector('.social__comments');//список комментариев
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader'); //кнопка загрузить комментарии
const bodyElement = document.querySelector('body');
const cancelDuttonElement = bigPictureElement.querySelector('.big-picture__cancel');//кнопка закрыть комментарии
const commentElement = commentListElement.querySelector('.social__comment');//один комментарий

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
 * @param {array} comments массив с комментариями
 */
const renderComments = (comments) => {
  //inerHTML был тут
  const fragment = document.createDocumentFragment(); //создаем фрагмент
  comments.forEach((item) => { //проходимся методом foreach и наполняем элементами
    const comment = createComment(item);
    fragment.append(comment); //добавляем элемент в фрагмент
  });
  commentListElement.innerHTML = ''; //очищаем список элементов
  commentListElement.append(fragment); // добавляем фрагмент в ДОМ
};

/**
 * функция закрытия модального окна
 */
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden'); // скрываем окно
  bodyElement.classList.remove('modal-open'); // включаем скролл
  document.removeEventListener('keydown', onDocumentKeydown);//обработчик событий при нажатии на клавишу
};

/**
 * функция закрытия модального окна с помощью клавиатуры
 * @param {object} evt объект события
 */
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

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
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

/**
 * функция по открытию модального окна
 * @param {object} data
 */
const showBigPictures = (data) => {
  bigPictureElement.classList.remove('hidden'); //открыть модальное окно
  bodyElement.classList.add('modal-open'); //отключаем скролл под модальным окном
  document.addEventListener('keydown', onDocumentKeydown); //добавляем обработчик события при нажатии на клавишу

  renderPictureDetail(data);
  renderComments(data.comments);

};

cancelDuttonElement.addEventListener('click', onCancelButtonClick);

export { showBigPictures };
