import { User } from '../user.model';
import { OrderEntry } from './order-entry.model';
import { OrderCustomer } from './order-customer.model';

export class Order {
	_id: string;
	customer: OrderCustomer;
	entries: OrderEntry[];
	totalPrice: number;
	status: string;

	constructor(_id: string, customer: OrderCustomer, entries: OrderEntry[], totalPrice: number, status: string) {
		this._id = _id;
		this.customer = customer;
		this.entries = entries;
		this.totalPrice = totalPrice;
		this.status = status;
	}
}
