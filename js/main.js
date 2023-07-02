import { generatePhotos } from './mocks/data.js';
import { renderTumbnails } from './thumbnail.js';

const PICTURES_COUNT = 25;

const photosData = generatePhotos(PICTURES_COUNT);// Генерируем массив из 25 фотографий с помощью функции генерации массива
renderTumbnails(photosData);//генерируем миниатюры фотографий
