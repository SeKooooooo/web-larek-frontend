import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IProductListModel extends EventEmitter {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getItems(url: string): Promise<IProduct[]>;
	getItem(id: number): IProduct;
}
