import { IProduct } from './product';

export interface IBasketModel {
	items: IProduct[];
	total_price: number;
	add(product: IProduct): void;
	remove(id: number): void;
}
