import { PaymentMethod } from '../types/order';
import { IProduct } from '../types/product';
import { IBasketModel } from './Basket/BasketModel';
import { IBasketView } from './Basket/BasketView';
import { ICardProductView } from './CardProduct/CardProductView';
import { IOrderModel } from './Order/OrderModel';
import {
	IOrderViewFinal,
	IOrderViewFirst,
	IOrderViewSecond,
} from './Order/OrderView';
import { IProductListModel } from './ProductList/ProductListModel';
import { IProductListView } from './ProductList/ProductListView';

interface Presenter {
	basketModel: IBasketModel;
	basketView: IBasketView;
	orderModel: IOrderModel;
	orderViewFirst: IOrderViewFirst;
	orderViewSecond: IOrderViewSecond;
	orderViewFinal: IOrderViewFinal;
	cardProductView: ICardProductView;
	productListModel: IProductListModel;
	productListView: IProductListView;
	deleteItem(id: number): void;
	makeOrder(): void;
	addItem(product: IProduct): void;
	changePayment(payment: PaymentMethod): void;
	changeAddress(value: string): void;
	changeEmail(value: string): void;
	changeNumber(value: string): void;
}
