import moment from 'moment';
import { createElementFromHTML } from './utils';

export default class Timeline {
  constructor(container) {
    this.container = container;
  }

  init() {
    const timelineEl = createElementFromHTML(
      `<div class="timeline">
        <h1 class="timeline-title">Timeline</h1>
        <ul class="timeline-list"></ul>
        <div class="timeline__post">
          <div class="timeline__post-wrapper">
            <textarea class="timeline-textarea" placeholder="Type your message here"></textarea>
            <div class="timeline__post-audio icon"></div>
            <div class="timeline__post-video icon"></div>
          </div>
        </div>            
      </div>`,
    );

    this.timelineListEl = timelineEl.querySelector('.timeline-list');
    this.timelineTextareaEl = timelineEl.querySelector('.timeline-textarea');

    return { timelineEl, timelineTextareaEl: this.timelineTextareaEl };
  }

  addTimelineItem(payload) {
    this.timelineTextareaEl.value = '';

    const { message, latitude, longitude } = payload;
    const timelineItemEl = createElementFromHTML(
      `<li class="timeline-item"> 
        <div class="timeline-item__wrapper">
          <p class="timeline-item__text">${message}</p>
          <span class="timeline-item__geolocation">[${latitude}, ${longitude}]</span> &#128065
        </div>
        <span class="timeline-item__created">${moment().format('DD.MM.YY HH:mm')}</span>
      </li>`,
    );

    this.timelineListEl.append(timelineItemEl);
    this.scrollToLastMessage();
    return { timelineItemEl };
  }

  scrollToLastMessage() {
    const { scrollHeight, clientHeight } = this.timelineListEl;
    this.timelineListEl.scrollTop = scrollHeight - clientHeight;
  }
}
