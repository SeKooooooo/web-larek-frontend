import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IProductListView extends EventEmitter {
	onClickProduct(id: number): void;
	bindListeners(): void;
	render(product: IProduct[]): void;
}
