// /**Функция для проверки длины строки
// *@param {string} text - изначальная строка
// *@param {number} maxLength - максимум символов в строке для проверки
// *@return {boolean} - истина если строка меньше максимальной длины
// */
// const checkStringlength = (text, maxLength = 150) =>
//   text.length <= maxLength;

// checkStringlength('проверяемая строка', 20);

// /**Функция для проверки, является ли строка палиндромом
// *@param {string} string - строка для проверки
// *@return {boolean} - true если переверонутая строка совпадает с исходной
// */
// const testPalindrome = (string) => {
//   string = string.toLowerCase().replaceAll(' ', '');
//   let string2 = '';

//   for (let i = -1 ; i >= -string.length; i--) {
//     string2 = string2 + string.at(i);
//   }

//   return string === string2;
// };

// testPalindrome('топот');

// /**Функция которая принимает строку и возвращает цифры от 0 до 9 в виде целого положительного числа
//  * @param {string} number - строка
//  * @return {number} - целое положительное число, если в строке нет ни одной цифры, функция должна вернуть NaN
// */
// const letOnlyNumber = (number) => {
//   number = number.replace(/[^\d]/gi, '');
//   const i = parseFloat(number);
//   return (i);
// };

// letOnlyNumber('ECMAScript 2022');


// /**функция для формирования адресов файлов
//  * @param {string} string - исходная строка
//  * @param {number} minLength - минимальная длина строки
//  * @param {string} symbolString - добавочные символы, если изначальной длины строки недостаточно
//  * @return - исходную строку дополненную добавочными символами до указанной длины
//  */

// const makeAdressFile = (string, minLength, symbolString) => {

//   while (string.length < minLength) {
//     if (string.length + symbolString.length > minLength) {
//       symbolString = symbolString.slice(0, minLength - string.length);
//     }
//     string = symbolString + string;
//   }
//   return(string);
// };

// makeAdressFile('q', 4, 'werty');
