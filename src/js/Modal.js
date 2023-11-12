import { createElementFromHTML } from './utils';

export default class Modal {
  static init() {
    const modalEl = createElementFromHTML(
      `<div class="modal">
        <h3 class="modal-title">Что-то пошло не так</h3>
        <p class="modal-text">
          К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введиет координаты вручную.
        </p>
        <form class="form__group" novalidate>
          <label class="form__label" for="geolocation">Широта и долгота через запятую:</label>
          <input class="form__input" type="text" id="geolocation" placeholder="Например: 51.50851, −0.12572" required>
        </form>
        <div class="modal__btns">
          <button class="modal__close" type="button">Отмена</button>
          <button class="modal__ok" type="button">Ок</button>
        </div>         
      </div>`,
    );

    const formGroupEl = modalEl.querySelector('.form__group');
    const formInputEl = modalEl.querySelector('.form__input');
    const modalCloseEl = modalEl.querySelector('.modal__close');
    const modalOkEl = modalEl.querySelector('.modal__ok');

    const onCloseModal = () => {
      formInputEl.value = '';
      modalEl.remove();
    };

    return {
      modalEl,
      formGroupEl,
      formInputEl,
      modalCloseEl,
      modalOkEl,
      onCloseModal,
    };
  }
}
