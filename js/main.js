import { generatePhotos } from './mock.js';
import { generatePhoto } from './mock.js';
const photosData = generatePhotos(25);// Генерируем массив из 25 фотографий с помощью функции генерации массива
const photosDataArray = Array.from({length: 25}, generatePhoto); //генерируем массив из 25 фотографий с помощью метода Array.from
