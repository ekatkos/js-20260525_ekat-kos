import { createElement } from "../../shared/utils/create-element";
import { required } from "../../shared/utils/required";

interface Options {
  data?: number[],
  label?: string,
  value?: number,
  link?: string,
  formatHeading?: (value: number) => string,
}

export default class ColumnChart {
  element: HTMLElement | null = null;
  chartHeight = 50;

  constructor(private options: Options = {}) {
    this.render();
  }

  update(data: number[]): void {
    this.options.data = data;

    const element = required(this.element, 'element');
    const body = element.querySelector('[data-element="body"]');

    const normalized = data.map(v => Math.max(0, v));
    const maxValue = normalized.length ? Math.max(...normalized) : 0;
    const scale = maxValue === 0 ? 0 : this.chartHeight / maxValue;

    if (body) {
      body.innerHTML = normalized.map(item => `
        <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${maxValue === 0 ? 0 : (item / maxValue * 100).toFixed(0)}%"></div>
      `).join('');
    }

    this.updateLoadingState();
  }

  remove(): void {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy(): void {
    this.remove();
    this.element = null;
  }

  private updateLoadingState(): void {
    if (!this.element) return;

    const isEmpty = !this.options.data || this.options.data.length === 0;
    this.element.classList.toggle('column-chart_loading', isEmpty);
  }

  private render(): void {
    this.element = createElement(this.template());
    this.updateLoadingState();
  }

  private template(): string {
    const data = this.options.data ?? [];
    const normalized = data.map(v => Math.max(0, v));
    const maxValue = normalized.length ? Math.max(...normalized) : 0;
    const scale = maxValue === 0 ? 0 : this.chartHeight / maxValue;
    const heading = this.options.formatHeading
      ? this.options.formatHeading(this.options.value ?? 0)
      : this.options.value;

    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.options.label}
          ${this.options.link ? `<a href="${this.options.link}" class="column-chart__link">View all</a>` : ''}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${heading}</div>
          <div data-element="body" class="column-chart__chart">
            ${normalized.map(item => `
              <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${maxValue === 0 ? 0 : (item / maxValue * 100).toFixed(0)}%"></div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}