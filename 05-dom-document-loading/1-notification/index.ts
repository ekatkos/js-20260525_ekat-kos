import { createElement } from "../../shared/utils/create-element";

interface Options {
	duration?: number;
	type?: string;
 }

export default class NotificationMessage {
  element!: HTMLElement;
	private timer?: number;
	static activeNotification: NotificationMessage;

  constructor(private message: string, private options: Options = {}) {
    this.options.type = this.options.type ?? 'success';
	 this.options.duration = this.options.duration ?? 2000;
	  
	  if (NotificationMessage.activeNotification) {
		  NotificationMessage.activeNotification.remove()
	  }
	  
	  this.render();
	  NotificationMessage.activeNotification = this
  }

  show(target?: HTMLElement): void {
    const elem = target ?? document.body;
    elem.appendChild(this.element);

    this.timer = setTimeout(() => {
      this.remove();
    }, this.options.duration);
  }

  remove(): void {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy(): void {
    this.remove();
    clearTimeout(this.timer);
    this.element = null!;
  }

  private render(): void {
    this.element = createElement(this.template());
  }

  private template(): string {
    return `
      <div class="notification ${this.options.type}" style="--value:${this.options.duration! / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.options.type}</div>
          <div class="notification-body">${this.message}</div>
        </div>
      </div>
    `;
  }
}
