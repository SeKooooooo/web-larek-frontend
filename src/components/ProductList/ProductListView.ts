import { IProduct } from '../../types/product';
import { CDN_URL, typesProduct } from '../../utils/constants';
import { EventEmitter } from '../base/events';

export interface IProductListView {
	_template: HTMLTemplateElement;
	_event: EventEmitter;
	render(products: IProduct[]): void;
}

export class ProductListView implements IProductListView {
	_event: EventEmitter;
	_template: HTMLTemplateElement;

	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
		this._template = document.querySelector(
			'#card-catalog'
		) as HTMLTemplateElement;
	}

	render(products: IProduct[]) {
		const gallery = document.querySelector('.gallery');
		products.forEach((product) => {
			const element = this._template.content.cloneNode(
				true
			) as DocumentFragment;
			const cardElement = element.firstElementChild as HTMLElement;
			cardElement.querySelector('.card__title').textContent = product.title;
			cardElement.querySelector('.card__category').textContent =
				product.category;
			cardElement
				.querySelector('.card__category')
				.classList.add(`card__category_${typesProduct[product.category]}`);
			cardElement.querySelector('img').src = CDN_URL + product.image;
			cardElement.querySelector('.card__price').textContent = product.price
				? `${product.price} синапсов`
				: 'Бесценно';
			cardElement.addEventListener('click', () => {
				this._event.emit('product:click', product);
			});
			gallery.appendChild(cardElement);
		});
	}
}
