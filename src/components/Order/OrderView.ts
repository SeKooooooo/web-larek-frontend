import { IModal, Modal } from '../../types/modal';
import { PaymentMethod } from '../../types/order';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IOrderViewFirst {
	_event: EventEmitter;
	template: HTMLTemplateElement;
	open(): void;
	renderButtonSubmit(disabled: boolean): void;
	renderButtons(value: PaymentMethod): void;
	onClose(): void;
}

export class OrderViewFirst extends Modal implements IOrderViewFirst {
	_event: EventEmitter;
	template: HTMLTemplateElement;

	constructor(eventEmitter: EventEmitter) {
		super();
		this._event = eventEmitter;
		this.template = document.querySelector('#order') as HTMLTemplateElement;
	}

	open() {
		const parent = this.template.content.cloneNode(true) as DocumentFragment;
		const order = parent.firstElementChild as HTMLElement;
		order.querySelector('#address').addEventListener('input', (e) => {
			this._event.emit('address:change', e.target as HTMLInputElement);
		});
		order.querySelector('#online').addEventListener('click', () => {
			this._event.emit('paymentOnline:change', { value: 'online' });
		});
		order.querySelector('#cash').addEventListener('click', () => {
			this._event.emit('paymentOffline:change', { value: 'offline' });
		});
		order.querySelector('.order__button').addEventListener('click', () => {
			this._event.emit('order:next');
		});
		this.render(order);
	}

	renderButtonSubmit(disabled: boolean) {
		if (disabled) {
			document.querySelector('.order__button').setAttribute('disabled', '');
		} else {
			document.querySelector('.order__button').removeAttribute('disabled');
		}
	}

	renderButtons(value: PaymentMethod) {
		if (value === 'online') {
			document.querySelector('#online').classList.add('button_alt-active');
			document.querySelector('#cash').classList.remove('button_alt-active');
		} else if (value === 'offline') {
			document.querySelector('#cash').classList.add('button_alt-active');
			document.querySelector('#online').classList.remove('button_alt-active');
		}
	}
}

export interface IOrderViewSecond {
	_event: EventEmitter;
	template: HTMLTemplateElement;
	open(): void;
	renderButtonSubmit(disabled: boolean): void;
	onClose(): void;
}

export class OrderViewSecond extends Modal implements IOrderViewSecond {
	_event: EventEmitter;
	template: HTMLTemplateElement;

	constructor(eventEmitter: EventEmitter) {
		super();
		this._event = eventEmitter;
		this.template = document.querySelector('#contacts') as HTMLTemplateElement;
	}

	open() {
		const parent = this.template.content.cloneNode(true) as DocumentFragment;
		const contacts = parent.firstElementChild as HTMLElement;
		contacts.querySelector('#email').addEventListener('input', (e) => {
			this._event.emit('email:change', e.target as HTMLInputElement);
		});
		contacts.querySelector('#phone').addEventListener('input', (e) => {
			this._event.emit('phone:change', e.target as HTMLInputElement);
		});
		contacts.querySelector('#pay').addEventListener('click', () => {
			this._event.emit('contacts:next');
		});
		this.render(contacts);
	}

	renderButtonSubmit(disabled: boolean) {
		if (disabled) {
			document.querySelector('#pay').setAttribute('disabled', '');
		} else {
			document.querySelector('#pay').removeAttribute('disabled');
		}
	}
}

export interface IOrderViewFinal {
	_event: EventEmitter;
	template: HTMLTemplateElement;
	open(total: number): void;
}

export class OrderViewFinal extends Modal implements IOrderViewFinal {
	_event: EventEmitter;
	template: HTMLTemplateElement;

	constructor(eventEmitter: EventEmitter) {
		super();
		this._event = eventEmitter;
		this.template = document.querySelector('#success') as HTMLTemplateElement;
	}

	open(total: number) {
		const parent = this.template.content.cloneNode(true) as DocumentFragment;
		const success = parent.firstElementChild as HTMLElement;
		success
			.querySelector('.order-success__close')
			.addEventListener('click', () => {
				this.onClose();
			});
		success.querySelector(
			'.order-success__description'
		).textContent = `Списано ${total} синапсов`;
		this.render(success);
	}
}
