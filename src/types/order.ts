export type PaymentMethod = 'online' | 'offline';

export interface IOrder {
	address: string;
	payment_method: PaymentMethod;
	email: string;
	number_telephone: string;
	total_price: number;
	items: number[];
}
