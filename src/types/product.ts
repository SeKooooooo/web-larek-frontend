export interface IProduct {
	category: string;
	title: string;
	img: string;
	price: number | null;
	description: string;
	id: number;
}

export interface IProductCardModel {
	product: IProduct;
	getProduct(id: number): Promise<IProduct>;
}

export interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getItems(url: string): Promise<IProduct[]>;
}
