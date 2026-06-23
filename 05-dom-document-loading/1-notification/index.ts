import { createElement } from "../../shared/utils/create-element";
import { required } from "../../shared/utils/required";

interface Options {
  duration?: number;
  type?: string;
}

export default class NotificationMessage {
  element: HTMLElement | null = null;
  private timer: number | null = null;
  static activeNotification: NotificationMessage | null = null;

  constructor(private message: string, private options: Options = {}) {
    this.options.type = this.options.type ?? 'success';
    this.options.duration = this.options.duration ?? 2000;

    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    this.render();
    NotificationMessage.activeNotification = this;
  }

  show(target?: HTMLElement): void {
    const elem = target ?? document.body;
    elem.appendChild(required(this.element, 'element'));

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.remove();
    }, this.options.duration);
  }

  remove(): void {
    if (this.element) {
      this.element.remove();
    }

    if (NotificationMessage.activeNotification === this) {
      NotificationMessage.activeNotification = null;
    }
  }

  destroy(): void {
    this.remove();

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.element = null;
  }

  private render(): void {
    this.element = createElement(this.template());
  }

  private template(): string {
    const duration = this.options.duration ?? 2000;

    return `
      <div class="notification ${this.options.type}" style="--value:${duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.options.type}</div>
          <div class="notification-body">${this.message}</div>
        </div>
      </div>
    `;
  }
}