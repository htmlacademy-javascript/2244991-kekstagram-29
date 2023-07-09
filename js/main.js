import { generatePhotos } from './mocks/data.js';
import { renderTumbnails } from './thumbnail.js';
import { renderGallery } from './gallery.js';

const PICTURES_COUNT = 25;

const photosData = generatePhotos(PICTURES_COUNT);// Генерируем массив из 25 фотографий с помощью функции генерации массива
renderTumbnails(photosData);//генерируем миниатюры фотографий
renderGallery(photosData);//генерируем галерею фотографий
