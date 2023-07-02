const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
//находим шаблон по идентификатору #picture и обращаемся к шаблону .picture в index.html
const container = document.querySelector('.pictures'); //находим контейнер, куда будет добавлять изображения

/**
 * функция берет готовый шаблон и заполняет его данными
 * @param {object} объект который передает comments, discription, likes, url
 * @returns {Element} thumbnail, заполненный данными
 */

const createthumbnailTemplate = ({ comments, discription, likes, url }) => { //добавляем параметры объекта, которые понадобятся для отрисовки фото с помощью деструктуризации
  const thumbnail = thumbnailTemplate.cloneNode(true); // клонируем шаблон фотографии, укказываем true чтобы скопировались все элементы

  thumbnail.querySelector('.picture__img').src = url; //добавляем ссылку на фото
  thumbnail.querySelector('.picture__img').alt = discription; //описание фотографии
  thumbnail.querySelector('.picture__likes').textContent = likes; // количество лайков
  thumbnail.querySelector('.picture__comments').textContent = comments.length; //количество комментариев, содержимое поля length, длину массива

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
