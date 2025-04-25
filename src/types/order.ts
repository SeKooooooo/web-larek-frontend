export type PaymentMethod = 'online' | 'offline' | undefined;

export interface IOrder {
	address: string;
	payment: PaymentMethod;
	email: string;
	phone: string;
	total: number;
	items: number[];
}
