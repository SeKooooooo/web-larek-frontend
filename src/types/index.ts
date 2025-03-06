export interface IProduct {
	category: string;
	title: string;
	img: string;
	price: number | null;
	description: string;
	id: number;
	isAddedBasket: boolean;
}

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

export interface IBasket {
	items: IProduct[];
	total_price: number;
}

export interface IBasketModel extends IBasket {
	add(product: IProduct): void;
	remove(id: number): void;
}

export interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: number): IProduct;
}

export interface IOrderModel {
	order: IOrder;
	setProducts(items: IProduct[]): void;
	setAddressAndPayment(
		address: string,
		payment: Pick<IOrder, 'payment_method'>
	): void;
	setEmailAndNumber(email: string, number: string): void;
	makeOrder: () => void;
}