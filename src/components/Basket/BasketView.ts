import { IModal } from '../../types/modal';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IBasketView extends IModal, EventEmitter {
	onClickDeleteItem(id: number): void;
	onClickMakeOrder(): void;
	bindListeners(): void;
	render(cartItems: IProduct[], totalPrice: number): void;
}
