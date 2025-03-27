import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IBasketModel extends EventEmitter {
	items: IProduct[];
	total_price: number;
	add(product: IProduct): void;
	remove(id: number): void;
}
