import { IModal } from '../../types/modal';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface ICardProductView extends IModal, EventEmitter {
	onClickAddInBasket(id: number): void;
	bindListeners(): void;
	render(product: IProduct): void;
}
