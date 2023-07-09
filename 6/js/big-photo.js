const bigPictureElement = document.querySelector('.big-picture'); //модальное окно
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');//список комментариев
const commentListElement = bigPictureElement.querySelector('.social__comment');//один комментарий
const commentLoaderElement = bigPictureElement.querySelector('.comments-loader'); //кнопка загрузить комментарии
const bodyElement = document.querySelector('body');
const cancelDuttonElement = bigPictureElement.querySelector('.big-picture__cancel');//кнопка закрыть комментарии
const commentElement = document.querySelector('.social__comments').document.querySelector('.social__comment');//нет шаблона

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
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.array.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentCountElement.append(fragment);
};

/**
 * функция закрытия модального окна
 */
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden'); // скрываем окно
  bodyElement.classList.remove('modal-open'); // включаем склолл
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
  commentLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown); //добавляем обработчик события при нажатии на клавишу

  renderPictureDetail(data);
  renderComments(data.comments);

};

cancelDuttonElement.addEventListener('click', onCancelButtonClick);

export { showBigPictures };

// Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.

// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>
// Описание фотографии description вставьте строкой в блок .social__caption.

// После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

// После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
