import Modal from './Modal';
import Timeline from './Timeline';
import { validator } from './utils';

export default class Controller {
  constructor(container) {
    this.container = container;
    this.timeline = new Timeline();
    this.modal = new Modal();
  }

  init() {
    this.timelineInit = this.timeline.init();
    this.modalInit = Modal.init();

    this.container.append(this.timelineInit.timelineEl);
    this.registerEvents();
  }

  registerEvents() {
    this.timelineInit.timelineTextareaEl.addEventListener('keydown', this.onKeydownTimelineTextarea);
    this.modalInit.formInputEl.addEventListener('keydown', Controller.onKeydownFormInput);
    this.modalInit.modalCloseEl.addEventListener('click', this.onClickModalClose);
    this.modalInit.modalOkEl.addEventListener('click', this.onClickModalOk);
  }

  onKeydownTimelineTextarea = (e) => {
    if (e.keyCode !== 13 || !e.target.value.trim() || e.shiftKey) {
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;

        const payload = {
          message: e.target.value,
          latitude,
          longitude,
        };
        this.timeline.addTimelineItem(payload);
      },
      () => {
        this.container.append(this.modalInit.modalEl);
        this.modalInit.formInputEl.focus();
        this.timeline.timelineTextareaEl.disabled = true;
      },
      { enableHighAccuracy: true },
    );
  };

  static onKeydownFormInput = (e) => { e.keyCode === 13 && e.preventDefault(); };

  onClickModalClose = () => {
    this.modalInit.onCloseModal();
    this.timeline.timelineTextareaEl.disabled = false;
  };

  onClickModalOk = () => {
    const { value } = this.modalInit.formInputEl;

    const { error, latitude, longitude } = validator(value);
    if (error) {
      this.modalInit.formGroupEl.reportValidity();
      this.modalInit.formInputEl.setCustomValidity(error);
      return;
    }

    const payload = {
      message: this.timeline.timelineTextareaEl.value,
      latitude,
      longitude,
    };

    this.timeline.addTimelineItem(payload);
    this.modalInit.onCloseModal();

    this.timeline.timelineTextareaEl.disabled = false;
  };
}
