import { IProduct } from '../../types/product';
import { webLarekApi } from '../api';
import { EventEmitter } from '../base/events';

export interface IProductListModel {
	_event: EventEmitter;
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getItems(): void;
	getItem(id: number): IProduct;
}

export class ProductListModel implements IProductListModel {
	_event: EventEmitter;
	items: IProduct[];

	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
		this.items = [];
	}

	getItem(id: number): IProduct {
		return;
	}

	getItems = async () => {
		try {
			const response = (await webLarekApi.get('/product/')) as {
				total: number;
				items: IProduct[];
			};
			this.items = response.items;
			console.log(response);
			this._event.emit('product:get', this.items);
		} catch (e) {
			console.error('Error fetching items from API:', e);
		}
	};

	setItems(items: IProduct[]): void {}
}
