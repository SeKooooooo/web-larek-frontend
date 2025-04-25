import { IModal, Modal } from '../../types/modal';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IBasketView {
	_event: EventEmitter;
	templateBasket: HTMLTemplateElement;
	templateItem: HTMLTemplateElement;
	addListener(): void;
	onClickOpen(cartItems: IProduct[], totalPrice: number): void;
	renderBasket(cartItems: IProduct[], totalPrice: number): void;
	renderCount(count: number): void;
	onClose(): void;
}

export class BasketView extends Modal implements IBasketView {
	_event: EventEmitter;
	templateItem: HTMLTemplateElement;
	templateBasket: HTMLTemplateElement;
	constructor(eventEmitter: EventEmitter) {
		super();
		this._event = eventEmitter;
		this.templateItem = document.querySelector(
			'#basket__item'
		) as HTMLTemplateElement;
		this.templateBasket = document.querySelector(
			'#basket'
		) as HTMLTemplateElement;
	}

	onClickOpen(cartItems: IProduct[], totalPrice: number): void {
		const parent = this.templateBasket.content.cloneNode(
			true
		) as DocumentFragment;
		const basket = parent.firstElementChild as HTMLElement;
		const list = basket.querySelector('.basket__list');
		cartItems.forEach((item, index) => {
			const parent = this.templateItem.content.cloneNode(
				true
			) as DocumentFragment;
			const itemBasket = parent.firstElementChild as HTMLElement;
			itemBasket.querySelector('.basket__item-index').textContent = String(
				index + 1
			);
			itemBasket.querySelector('.card__title').textContent = item.title;
			itemBasket.querySelector('.card__price').textContent = String(item.price);
			itemBasket
				.querySelector('.basket__item-delete')
				.addEventListener('click', () => {
					this._event.emit('basketView:delete', item);
				});
			list.appendChild(itemBasket);
		});
		basket.querySelector(
			'.basket__price'
		).textContent = `${totalPrice} синапсов`;
		if (cartItems.length !== 0) {
			basket.querySelector('.button').addEventListener('click', () => {
				this._event.emit('create:click');
			});
		}

		this.render(basket);
	}

	renderBasket(cartItems: IProduct[], totalPrice: number) {
		console.log();
		const list = document.querySelector('.basket__list');
		list.innerHTML = '';
		cartItems.forEach((item, index) => {
			const itemBasket = (
				this.templateItem.content.cloneNode(true) as DocumentFragment
			).firstElementChild as HTMLElement;
			itemBasket.querySelector('.basket__item-index').textContent = String(
				index + 1
			);
			itemBasket.querySelector('.card__title').textContent = item.title;
			itemBasket.querySelector('.card__price').textContent = String(item.price);

			itemBasket
				.querySelector('.basket__item-delete')
				.addEventListener('click', () => {
					this._event.emit('basketView:delete', item);
				});
			list.appendChild(itemBasket);
		});
		document.querySelector(
			'.basket__price'
		).textContent = `${totalPrice} синапсов`;
		if (cartItems.length !== 0) {
			document.querySelector('.button').addEventListener('click', () => {
				this._event.emit('create:click');
			});
		}
	}

	addListener() {
		document.querySelector('.header__basket').addEventListener('click', () => {
			this._event.emit('basket:open');
		});
	}

	renderCount(count: number) {
		document.querySelector('.header__basket-counter').textContent =
			String(count);
	}
}
