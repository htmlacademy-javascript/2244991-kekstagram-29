import { generatePhotos } from './mocks/data.js';
import { renderTumbnails } from './thumbnail.js';
import { renderGallery } from './gallery.js';
import { imageFormUpload } from './form.js';

const PICTURES_COUNT = 25;

const photosData = generatePhotos(PICTURES_COUNT);// Генерируем массив из 25 фотографий с помощью функции генерации массива
renderTumbnails(photosData);//генерируем миниатюры фотографий
renderGallery(photosData);//генерируем галерею фотографий
imageFormUpload();//открываем окно с формой загрузки фото
