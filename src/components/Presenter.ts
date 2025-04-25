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
import { PageView } from './PageView';
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
	pageView: PageView;
	initialListeners(): void;
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
	pageView: PageView;
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
		this.pageView = new PageView(this._event);

		this.pageView.basketButtonClick();
		this.productListModel.getItems();

		this.initialListeners();
	}

	initialListeners() {
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
			this.pageView.renderCount(this.basketModel.getItems.length);
		});

		this._event.on('basket:open', () => {
			this.basketView.onClickOpen(
				this.basketModel.getItems,
				this.basketModel.getTotalPrice
			);
		});

		this._event.on('basket:delete', (item: IProduct) => {
			this.basketModel.remove(item);
			this.pageView.renderCount(this.basketModel.getItems.length);
			this.basketView.renderBasket(
				this.basketModel.getItems,
				this.basketModel.getTotalPrice
			);
		});

		this._event.on('create:click', () => {
			this.basketView.onClose();
			this.orderViewFirst.open();
			this.orderModel.clearOrder();
			this.orderModel.setProducts(this.basketModel.getItems);
			this.orderModel.setTotal(this.basketModel.getTotalPrice);
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
		});

		this._event.on('order:created', (data: { id: string; total: number }) => {
			this.basketModel.clear();
			this.orderViewFinal.open(data.total);
			this.pageView.renderCount(0);
		});
	}
}
