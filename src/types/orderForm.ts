import { IProduct } from './product';

export interface IOrderForm {
	address: string;
	payment_method: 'online' | 'offline';
	email: string;
	number_telephone: string;
	total_price: number;
}

export interface IOrder extends IOrderForm {
	items: number[];
}

export interface IOrderModel {
	order: IOrder;
	setProducts(items: IProduct[]): void;
	setAddressAndPayment(
		address: string,
		payment: Pick<IOrder, 'payment_method'>
	): void;
	setEmailAndNumber(email: string, number: string): void;
	postOrder(formFields: IOrder): Promise<object>;
}
