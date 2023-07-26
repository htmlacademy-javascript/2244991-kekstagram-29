import { generateRandomNumber, getRandomElementFromArray, createUniqueRandomIdGenerator } from './util.js';

const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;

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
 * функция по генерации одного комментария
 * @return {object} объект комментария
 */
const generateComment = () => ({
  id: createUniqueRandomIdGenerator(1, COMMENT_COUNT), //генерируем уникальные id
  avatar: `img/avatar-${generateRandomNumber(1, AVATAR_COUNT)}.svg`,
  message: getRandomElementFromArray(MESSAGES),//фукнция берет массив сообщений и случайным образом выбирает элемент массива
  name: getRandomElementFromArray(NAMES),//фукнция берет массив имен и случайным образом выбирает элемент массива
});

/**
 * функция по генерации комментариев (массив объектов)
 * @param {number} count количество комментариев, которые нужно сгенерировать
 * @return {Array} массив объектов комментариев
 */
const generateComments = () => Array.from(
  { length: generateRandomNumber(0, COMMENT_COUNT) },
  (_, pictureIndex) => generateComment(pictureIndex + 1));

/**
 * функция по генерации одной фотографии
 * @return {object} объект комментария
 */
const generatePhoto = function (index) { //генерируем уникальные id url по индексу
  return {
    id: index,
    url: `photos/${index}.jpg`,
    discription: getRandomElementFromArray(DISCRIPTIONS),
    likes: generateRandomNumber(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: generateComments(createUniqueRandomIdGenerator(1, COMMENT_COUNT)),
  };
};

/**
 * функция по генерации фотографий (массив объектов)
 * @param {number} count количество фотографий, которые нужно сгенерировать
 * @return {Array} массив объектов фотографий
 */
const generatePhotos = (count) => Array.from(
  { length: count },
  (_, pictureIndex) => generatePhoto(pictureIndex + 1));

export { generatePhotos };
