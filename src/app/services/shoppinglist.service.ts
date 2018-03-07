import {Product} from '../models/product/product.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';

import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {User} from '../models/user.model';

@Injectable()
export class ShoppinglistService {

	private serverUrl = environment.serverUrl + 'order';
	private products: Product[] = [];
	productsChanged = new BehaviorSubject<Product[]>(this.products);
	productsChanges = this.productsChanged.asObservable();

	constructor(private http: Http, private authService: AuthService, private userService: UserService) {
	}

	public getShoppinglist() {
		const storage = localStorage.getItem('cart');
		if (storage != null) {
			this.products = JSON.parse(storage);
		}
		this.productsChanged.next(this.products.slice());
		return this.products;
	}

	public addShoppingList(product: Product, quantity, size, color) {
		const storage = localStorage.getItem('cart');
		let products: Product[] = [];

		if (storage != null) {
			products = JSON.parse(storage);
		}

		let q = quantity;
		let prod: Product;
		prod = new Product(product._id, product.name, product.category, product.gender, product.price, size, color, product.imageUrl, quantity);


		for (let i = 0; i < products.length; i++) {
			if (products[i]['_id'] === prod._id && products[i]['sizes'] === size && products[i]['colors'] === color) {
				q = products[i]['quantity'] + quantity;
				const index = products.indexOf(products[i]);
				products.splice(index, 1);
			}
		}

		prod.quantity = q;
		products.push(prod);
		localStorage.setItem('cart', JSON.stringify(products));
		this.products = products;
		this.productsChanged.next(this.products.slice());
	}

	public removeItemShoppingList(id, size, color) {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i]['_id'] === id && this.products[i]['sizes'] === size && this.products[i]['colors'] === color) {
				const index = this.products.indexOf(this.products[i]);
				if (index !== -1) {
					this.products.splice(index, 1);
					this.productsChanged.next(this.products.slice());
					localStorage.setItem('cart', JSON.stringify(this.products));
				}
			}
		}
	}

	public updateShoppingList(sList) {
		localStorage.setItem('cart', JSON.stringify(sList));
	}

	public removeShoppingList() {
		this.productsChanged.next([]);
		localStorage.removeItem('cart');
	}

	public sendToMollie(id) {
		if ( id ) {
			const body = {'orderId': id, 'redirectUrl': environment.redirectUrl + '/' + id};

			return this.http.post(environment.serverUrl + 'payment', body, this.authService.jwt())
				.toPromise()
				.then(response => {
					window.location.href = JSON.parse(response['_body']).url;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}
