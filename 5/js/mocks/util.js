
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

export { generateRandomNumber, getRandomElementFromArray };
