const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
//находим шаблон по идентификатору #picture и обращаемся к шаблону .picture в index.html
const container = document.querySelector('.pictures'); //находим контейнер, куда будет добавлять изображения

/**
 * функция берет готовый шаблон и заполняет его данными
 * @param {object} объект который передает comments, discription, likes, url
 * @returns {Element} thumbnail, заполненный данными
 */

const createthumbnailTemplate = ({ comments, discription, likes, url, id }) => { //добавляем параметры объекта, которые понадобятся для отрисовки фото с помощью деструктуризации
  const thumbnail = thumbnailTemplate.cloneNode(true); // клонируем шаблон фотографии, укказываем true чтобы скопировались все элементы

  const imageThumbnail = thumbnail.querySelector('.picture__img'); //выносим поиск querySelector в константы
  const likesThumbnail = thumbnail.querySelector('.picture__likes');
  const commentsThumbnail = thumbnail.querySelector('.picture__comments');


  imageThumbnail.src = url; //добавляем ссылку на фото
  imageThumbnail.alt = discription; //описание фотографии
  likesThumbnail.textContent = likes; // количество лайков
  commentsThumbnail.textContent = comments.length; //количество комментариев, содержимое поля length, длину массива
  thumbnail.dataset.thumbnailId = id;//добвляем  id чтобы мы погли связать миниатюру фото с большой фотографией

  return(thumbnail);
};

/**
 * функция отрисовывает миниатюры фотографий
 * @param {Array} pictures - массив фотографий, который содержит все необходимые данные для отрисовки фотографий
 * @return {Element} возвращает готовый элемент, который можно вставить в DOM
 */

const renderTumbnails = (pictures) => {
  const fragment = document.createDocumentFragment(); // создаем контейнер
  pictures.forEach((picture) => { //с помощью метода forEach вызывается функция callBack createthumbnailTemplate
    const thumbnail = createthumbnailTemplate(picture); //функция вызывается для каждого элемента массива и заполняет данными
    fragment.append(thumbnail); //все созданные элементы добавляем в контейнер fragment
  });
  container.append(fragment); // разово добавляем fragment в DOM, не перерисовывая его
};

export { renderTumbnails };

