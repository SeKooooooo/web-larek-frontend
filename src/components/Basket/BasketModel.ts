import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IBasketModel {
	items: IProduct[];
	_event: EventEmitter;
	total_price: number;
	add(product: IProduct): void;
	remove(product: IProduct): void;
	isInBasket(product: IProduct): boolean;
}

export class BasketModel implements IBasketModel {
	_event: EventEmitter;
	items: IProduct[];
	total_price: number;

	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
		this.items = [];
		this.total_price = 0;
	}

	isInBasket(product: IProduct): boolean {
		return !!this.items.find((item) => item.id === product.id);
	}

	add(product: IProduct): void {
		this.items.push(product);
		this.total_price += product.price;
	}

	remove(product: IProduct): void {
		this.items = this.items.filter((item) => item.id !== product.id) || [];
		this.total_price -= product.price;
		this._event.emit('basketModel:delete', {
			items: this.items,
			totalPrice: this.total_price,
		});
	}
}
