import { PaymentMethod } from '../types/order';
import { IProduct } from '../types/product';
import { EventEmitter } from './base/events';
import { BasketModel, IBasketModel } from './Basket/BasketModel';
import { BasketView, IBasketView } from './Basket/BasketView';
import {
	CardProductView,
	ICardProductView,
} from './CardProduct/CardProductView';
import { IOrderModel, OrderModel } from './Order/OrderModel';
import {
	IOrderViewFinal,
	IOrderViewFirst,
	IOrderViewSecond,
	OrderViewFinal,
	OrderViewFirst,
	OrderViewSecond,
} from './Order/OrderView';
import {
	IProductListModel,
	ProductListModel,
} from './ProductList/ProductListModel';
import {
	IProductListView,
	ProductListView,
} from './ProductList/ProductListView';

interface IPresenter {
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

export class Presenter implements IPresenter {
	basketModel: IBasketModel;
	basketView: IBasketView;
	orderModel: IOrderModel;
	orderViewFirst: IOrderViewFirst;
	orderViewSecond: IOrderViewSecond;
	orderViewFinal: IOrderViewFinal;
	cardProductView: ICardProductView;
	productListModel: IProductListModel;
	productListView: IProductListView;
	_event: EventEmitter;

	constructor() {
		this._event = new EventEmitter();
		this.productListView = new ProductListView(this._event);
		this.cardProductView = new CardProductView(this._event);
		this.productListModel = new ProductListModel(this._event);
		this.basketModel = new BasketModel(this._event);
		this.basketView = new BasketView(this._event);
		this.orderViewFirst = new OrderViewFirst(this._event);
		this.orderViewSecond = new OrderViewSecond(this._event);
		this.orderModel = new OrderModel(this._event);
		this.orderViewFinal = new OrderViewFinal(this._event);

		this._event.on('product:get', (items: IProduct[]) =>
			this.productListView.render(items)
		);
		this._event.on('product:click', (product: IProduct) => {
			const isInBasket = this.basketModel.isInBasket(product);
			this.cardProductView.onClickOpen(product, isInBasket);
		});

		this._event.on('addButton:click', (product: IProduct) => {
			this.basketModel.add(product);
			this.cardProductView.renderButton();
			this.basketView.renderCount(this.basketModel.items.length);
		});

		this._event.on('basket:open', () => {
			const products = this.basketModel.items;
			const total_price = this.basketModel.total_price;
			this.basketView.onClickOpen(products, total_price);
		});

		this._event.on('basketView:delete', (item: IProduct) => {
			this.basketModel.remove(item);
			this.basketView.renderCount(this.basketModel.items.length);
		});

		this._event.on(
			'basketModel:delete',
			(data: { items: IProduct[]; totalPrice: number }) => {
				this.basketView.renderBasket(data.items, data.totalPrice);
			}
		);

		this._event.on('create:click', () => {
			this.basketView.onClose();
			this.orderViewFirst.open();
			this.orderModel.clearOrder();
			this.orderModel.setProducts(this.basketModel.items);
			this.orderModel.setTotal(this.basketModel.total_price);
		});

		this._event.on('address:change', (target: HTMLInputElement) => {
			this.orderModel.setAddress(target.value);
			const order = this.orderModel.order;
			this.orderViewFirst.renderButtonSubmit(!(order.address && order.payment));
		});

		this._event.on('paymentOnline:change', (data: { value: PaymentMethod }) => {
			this.orderModel.setPayment(data.value);
			const order = this.orderModel.order;
			this.orderViewFirst.renderButtonSubmit(!(order.address && order.payment));
			this.orderViewFirst.renderButtons(data.value);
		});

		this._event.on(
			'paymentOffline:change',
			(data: { value: PaymentMethod }) => {
				this.orderModel.setPayment(data.value);
				const order = this.orderModel.order;
				this.orderViewFirst.renderButtonSubmit(
					!(order.address && order.payment)
				);
				this.orderViewFirst.renderButtons(data.value);
			}
		);

		this._event.on('order:next', () => {
			this.orderViewFirst.onClose();
			this.orderViewSecond.open();
		});

		this._event.on('email:change', (target: HTMLInputElement) => {
			this.orderModel.setEmail(target.value);
			const order = this.orderModel.order;
			this.orderViewSecond.renderButtonSubmit(!(order.email && order.phone));
		});

		this._event.on('phone:change', (target: HTMLInputElement) => {
			this.orderModel.setPhone(target.value);
			const order = this.orderModel.order;
			this.orderViewSecond.renderButtonSubmit(!(order.email && order.phone));
		});

		this._event.on('contacts:next', () => {
			this.orderViewSecond.onClose();
			this.orderModel.postOrder();
			//this.orderViewSecond.open();
		});

		this._event.on('order:created', (data: { id: string; total: number }) => {
			this.basketModel.items = [];
			this.orderViewFinal.open(data.total);
		});

		this.basketView.addListener();
		this.productListModel.getItems();
	}
	addItem(product: IProduct): void {}

	changeEmail(value: string): void {}

	changeAddress(value: string): void {}

	changeNumber(value: string): void {}

	changePayment(payment: PaymentMethod): void {}

	deleteItem(id: number): void {}

	makeOrder(): void {}
}
