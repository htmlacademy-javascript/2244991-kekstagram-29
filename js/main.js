import { generatePhotos } from './mock.js';
import { generatePhoto } from './mock.js';

const PICTURE_COUNT = 25;
const photosData = generatePhotos(PICTURE_COUNT);// Генерируем массив из 25 фотографий с помощью функции генерации массива
// const photosDataArray = Array.from({length: PICTURE_COUNT}, generatePhoto); //генерируем массив из 25 фотографий с помощью метода Array.from
