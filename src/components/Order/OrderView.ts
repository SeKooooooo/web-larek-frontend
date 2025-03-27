import { IModal } from '../../types/modal';
import { PaymentMethod } from '../../types/order';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IOrderViewFirst extends IModal, EventEmitter {
	onChangePayment(payment: PaymentMethod): void;
	onChangeAddress(value: string): void;
	onClickNext(): void;
	bindListeners(): void;
	render(payment: PaymentMethod, value: string): void;
}

export interface IOrderViewSecond extends IModal, EventEmitter {
	onChangeEmail(value: string): void;
	onChangeNumber(value: string): void;
	onClickPay(): void;
	bindListeners(): void;
	render(valueEmail: string, valueNumber: string): void;
}

export interface IOrderViewFinal extends IModal, EventEmitter {
	onClickExit(): void;
	bindListeners(): void;
	render(): void;
}
