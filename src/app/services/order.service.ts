import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {User} from '../models/user.model';
import {Order} from '../models/order/order.model';
import {AuthService} from './auth.service';
import {ShoppinglistService} from './shoppinglist.service';

@Injectable()
export class OrderService {

	private serverUrl = environment.serverUrl + 'order';
	private error: string = '';

	private orders: Order[];
	orderChanged: Subject<Order[]>;

	constructor(private http: Http,
							private authService: AuthService,
							private shoppinglistService: ShoppinglistService,
							private router: Router) {
		this.orderChanged = new Subject();
	}

	public getOrders(): Promise<Order[]> {
		return this.http.get(this.serverUrl, this.authService.jwt())
			.toPromise()
			.then((response: any) => {
				return response.json() as Order[];
			})
			.catch(error => {
				return error;
			});
	}

	public getOrder(id: string) {
		return this.http.get(this.serverUrl + '/' + id, this.authService.jwt())
			.toPromise()
			.then((response: any) => {
				return response._body as Order;
			})
			.catch(error => {
				return error;
			});
	}

	public createOrder(user: User) {

		const products = this.shoppinglistService.getShoppinglist();

		if (products.length !== 0) {
			const entries = [];

			products.forEach((entry) => {
				entries.push({
					'product': entry._id,
					'productSize': entry.sizes,
					'productColor': entry.colors,
					'quantity': entry.quantity
				});
			});

			const data = {
				'customer': user,
				'entries': entries
			};

			if (this.authService.isAuthenticated) {
				return this.http.post(this.serverUrl, data, this.authService.jwt())
					.toPromise()
					.then((response: any) => {
						return response.json() as Order;
					})
					.catch(error => {;
						return error;
					});
			} else {
				return this.http.post(this.serverUrl, data)
					.toPromise()
					.then((response: any) => {
						return response.json() as Order;
					})
					.catch(error => {
						return error;
					});
			}
		} else {
			return new Promise((resolve, reject) => {
				reject('EmptyShoppingCart');
			});
		}
	}
}
