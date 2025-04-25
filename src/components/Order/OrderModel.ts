import { IOrder, PaymentMethod } from '../../types/order';
import { IProduct } from '../../types/product';
import { webLarekApi } from '../api';
import { EventEmitter } from '../base/events';

export interface IOrderModel {
	order: IOrder;
	_event: EventEmitter;
	clearOrder(): void;
	setProducts(items: IProduct[]): void;
	setAddress(address: string): void;
	setPayment(payment: PaymentMethod): void;
	setEmail(email: string): void;
	setPhone(phone: string): void;
	setTotal(count: number): void;
	postOrder(): void;
}

export class OrderModel implements IOrderModel {
	_event: EventEmitter;
	order: IOrder;
	constructor(eventEmitter: EventEmitter) {
		this._event = eventEmitter;
		this.order = {
			address: '',
			email: '',
			items: [],
			phone: '',
			payment: undefined,
			total: 0,
		};
	}

	setAddress(address: string): void {
		this.order.address = address;
	}

	setPayment(payment: PaymentMethod): void {
		this.order.payment = payment;
	}

	setEmail(email: string): void {
		this.order.email = email;
	}

	setPhone(phone: string): void {
		this.order.phone = phone;
	}
	setTotal(count: number): void {
		this.order.total = count;
	}

	clearOrder(): void {
		this.order = {
			address: '',
			email: '',
			items: [],
			phone: '',
			payment: undefined,
			total: 0,
		};
	}

	setProducts(items: IProduct[]): void {
		this.order.items = items.map((item) => item.id);
	}

	postOrder = async () => {
		try {
			const response = (await webLarekApi.post('/order', this.order)) as {
				id: string;
				total: number;
			};
			this._event.emit('order:created', response);
		} catch (e) {
			console.error('Error fetching items from API:', e);
		}
	};
}
