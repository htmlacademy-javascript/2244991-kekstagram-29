import { renderTumbnails } from './thumbnail.js';
import { imageFormUpload, hideModal, setOnFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './messaje.js';

imageFormUpload();//открываем окно с формой загрузки фото


//отправка формы
setOnFormSubmit(async (data) =>{
  try {
    await sendData(data); //отправляем данные
    hideModal(); //закрываем окно
    showSuccessMessage(); //сообщение об успехе
  } catch {
    showErrorMessage(); //сообщение об неудаче
  }
});

try {
  const data = await getData(); //получаем данные
  renderTumbnails(data); //отрисовываем полученные данные
} catch (error) {
  showAlert(error.message); //вывод ошибки
}
