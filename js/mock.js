const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Андрей',
  'Антон',
  'Денис',
  'Дмитрий',
  'Николай',
  'Савелий',
];

const DISCRIPTIONS = [
  'Мы на прогулке с семьей',
  'Горы Атая',
  'Озеро в дальнем уголке Карелии',
  'Свадьба сестры',
  'Перелет в Аргнентину',
  'Пальмы и попугаи',
  'Фото гостинной',
  'Пьем мате в парке',
  'Пирог из шпината',
  'Лето в Питере',
];

/**
 * функция по генерации случайного числа
 * @param {number} start с какого числа начинаем генерацию чистел
 * @param {number} end на каком останавливаем генерацию
 * @return {number} случайное число
 */
const generateRandomNumber = (start, end) => {
  const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
  return randomNumber;
};

/**
 * функция берет массив и случайным образом выбирает элемент массива
 * @param {Array} arr массив сообщений
 * @return {string} строку массива, выбранную в случайном порядке
 */

const getRandomElementFromArray = (arr) => {
  const randomIndex = generateRandomNumber(0, arr.length - 1);
  return arr[randomIndex];
};

/**
 * функция по генерации одного комментария
 * @return {object} объект комментария
 */
const generateComment = () => ({
  id: generateRandomNumber(1, 1000), //два параметра от 1 до 1000, функция случайным образом выбирает число методом
  avatar: `img/avatar-${generateRandomNumber(1, 6)}.svg`,
  message: getRandomElementFromArray(MESSAGES),//фукнция берет массив сообщений и случайным образом выбирает элемент массива
  name: getRandomElementFromArray(NAMES),//фукнция берет массив имен и случайным образом выбирает элемент массива
});

/**
 * функция по генерации комментариев (массив объектов)
 * @param {number} count количество комментариев, которые нужно сгенерировать
 * @return {Array} массив объектов комментариев
 */
const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

/**
 * функция по генерации одной фотографии
 * @return {object} объект комментария
 */
const generatePhoto = function () {
  return {
    id: generateRandomNumber(1, 25),
    url: `photos/${generateRandomNumber(1, 25)}.jpg`,
    discription: getRandomElementFromArray(DISCRIPTIONS),
    likes: generateRandomNumber(15, 200),
    comments: generateComments(generateRandomNumber(1, 10)),
  };
};

/**
 * функция по генерации фотографий (массив объектов)
 * @param {number} count количество фотографий, которые нужно сгенерировать
 * @return {Array} массив объектов фотографий
 */
const generatePhotos = (count) => {
  const photos = [];
  for (let i = 0; i < count; i++) {
    photos.push(generatePhoto());
  }
  return photos;
};

export { generatePhotos, generatePhoto };
