//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * устранение дребезга
 * @param cb
 * @param {number} timeDelay - задержка в миллисекундах
 * @returns
 */
const debounce = (cb, timeDelay = 500) => {
  let timeoutId; //используем замыкания
  return (...rest) => {
    clearTimeout(timeoutId); //удаляем предыдущий таймаут
    timeoutId = setTimeout(() => cb.apply(this, rest), timeDelay); //устанавливаем новый таймаут с вызовом cb на ту же задержку
  };
};

export { isEscapeKey, debounce };
