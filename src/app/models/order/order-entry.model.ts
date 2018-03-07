import {Product} from '../product/product.model';

export class OrderEntry {
	_id: string;
	product: Product;
	productSize: string;
	productColor: string;
	quantity: number;

	constructor(_id: string, product: Product, productSize: string, productColor: string, quantity: number) {
		this._id = _id;
		this.product = product;
		this.productSize = productSize;
		this.productColor = productColor;
		this.quantity = quantity;
	}
}
