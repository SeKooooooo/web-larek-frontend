import { EventEmitter } from './base/events';

export interface IPageView {
	_event: EventEmitter;
	basketButtonClick(): void;
	renderCount(count: number): void;
}

export class PageView implements IPageView {
	_event: EventEmitter;
	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
	}

	basketButtonClick() {
		document.querySelector('.header__basket').addEventListener('click', () => {
			this._event.emit('basket:open');
		});
	}

	renderCount(count: number) {
		document.querySelector('.header__basket-counter').textContent =
			String(count);
	}
}
