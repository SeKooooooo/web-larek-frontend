import { IOrder, PaymentMethod } from '../../types/order';
import { IProduct } from '../../types/product';
import { EventEmitter } from '../base/events';

export interface IOrderModel extends EventEmitter {
	order: IOrder;
	setProducts(items: IProduct[]): void;
	setAddressAndPayment(address: string, payment: PaymentMethod): void;
	setEmailAndNumber(email: string, number: string): void;
	postOrder(formFields: IOrder): Promise<object>;
}
