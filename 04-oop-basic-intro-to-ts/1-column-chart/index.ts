import { createElement } from "../../shared/utils/create-element";

interface Options {
	data?: number[],  
	label?: string,
	value?: number,
	link?: string,
	formatHeading?: (value: number) => string,
}

export default class ColumnChart {
	element!: HTMLElement;
	chartHeight = 50;

  constructor(private options: Options = {}) {
    this.render();
  }

  update(data: number[]): void {
    this.options.data = data;
    const body = this.element.querySelector('[data-element="body"]');
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    if(body) body.innerHTML = data.map(item => `
      <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>
    `).join('');
  }

  remove(): void {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy(): void {
    this.remove();
    this.element = null!;
	}
	
  private render(): void {
    this.element = createElement(this.template());

    if (!this.options.data || this.options.data.length === 0) {
      this.element.classList.add('column-chart_loading');
    }
  }

  private template(): string {
    const maxValue = this.options.data ? Math.max(...this.options.data) : 0;
	 const scale = this.chartHeight / maxValue;
	 const heading = this.options.formatHeading ? this.options.formatHeading(this.options.value ?? 0) : this.options.value

    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.options.label}
          <a href="${this.options.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${heading}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.options.data?.map(item => `
              <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>
            `).join('') ?? ''}
          </div>
        </div>
      </div>
    `;
  }
}
