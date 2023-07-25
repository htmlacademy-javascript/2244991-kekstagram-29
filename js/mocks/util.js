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
 * функция по генерации уникального id
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @returns уникальный id
 */
const createUniqueRandomIdGenerator = (min, max) => {
  const generatedValues = [];

  return function () {
    let currentValue = generateRandomNumber(min, max);
    if (generatedValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (generatedValues.includes(currentValue)) {
      currentValue = generateRandomNumber(min, max);
    }
    generatedValues.push(currentValue);
    return currentValue;
  };
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

export { generateRandomNumber, getRandomElementFromArray, createUniqueRandomIdGenerator};
