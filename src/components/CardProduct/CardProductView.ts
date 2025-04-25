import { IModal, Modal } from '../../types/modal';
import { IProduct } from '../../types/product';
import { CDN_URL, typesProduct } from '../../utils/constants';
import { EventEmitter } from '../base/events';

export interface ICardProductView {
	_event: EventEmitter;
	template: HTMLTemplateElement;
	onClickOpen(product: IProduct, isInBasket: boolean): void;
	renderButton(): void;
}

export class CardProductView extends Modal implements ICardProductView {
	_event: EventEmitter;
	template: HTMLTemplateElement;
	constructor(eventEmitter: EventEmitter) {
		super();
		this._event = eventEmitter;
		this.template = document.querySelector(
			'#card-preview'
		) as HTMLTemplateElement;
	}

	onClickOpen(product: IProduct, isInBasket: boolean): void {
		const element = this.template.content.cloneNode(true) as HTMLElement;
		element.querySelector('.card__title').textContent = product.title;
		element.querySelector('.card__category').textContent = product.category;
		element
			.querySelector('.card__category')
			.classList.add(`card__category_${typesProduct[product.category]}`);
		element.querySelector('img').src = CDN_URL + product.image;
		element.querySelector('.card__price').textContent = product.price
			? `${product.price} синапсов`
			: 'Бесценно';
		if (isInBasket) {
			element.querySelector('button').setAttribute('disabled', '');
		} else {
			element.querySelector('button').addEventListener('click', () => {
				this._event.emit('addButton:click', product);
			});
		}
		this.renderModal(element);
	}

	renderButton() {
		document.querySelector('.button').setAttribute('disabled', '');
	}
}
