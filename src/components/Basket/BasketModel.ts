import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export type IBasketModel = {
	_items: IProduct[];
	_event: EventEmitter;
	_total_price: number;
	getItems: IProduct[];
	getTotalPrice: number;
	add(product: IProduct): void;
	remove(product: IProduct): void;
	isInBasket(product: IProduct): boolean;
	clear(): void;
};

export class BasketModel implements IBasketModel {
	_event: EventEmitter;
	_items: IProduct[];
	_total_price: number;

	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
		this._items = [];
		this._total_price = 0;
	}

	get getItems() {
		return this._items;
	}

	get getTotalPrice() {
		return this._total_price;
	}

	isInBasket(product: IProduct): boolean {
		return !!this._items.find((item) => item.id === product.id);
	}

	add(product: IProduct): void {
		this._items.push(product);
		this._total_price += product.price;
	}

	remove(product: IProduct): void {
		this._items = this._items.filter((item) => item.id !== product.id) || [];
		this._total_price -= product.price;
	}

	clear(): void {
		this._items = [];
		this._total_price = 0;
	}
}
