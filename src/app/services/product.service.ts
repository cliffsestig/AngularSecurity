import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product/product.model';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from './auth.service';


@Injectable()
export class ProductService {

	private products: Product[];
	private serverUrl = environment.serverUrl + 'product'; // URL to web api

	productsChanged = new BehaviorSubject<Product[]>(this.products);
	productsChanges = this.productsChanged.asObservable();

	constructor(private http: Http, private authService: AuthService) {
	}

	changeProduct(product) {
		this.productsChanged.next(product);
	}

	public getProducts(): Promise<Product[]> {
		return this.http.get(this.serverUrl, this.authService.jwt())
			.toPromise()
			.then(response => {
				this.products = response.json() as Product[];
				return this.products;
			})
			.catch(error => {
					return this.handleError(error);
				}
			);
	}

	public getProduct(id): Promise<Product> {
		return this.http.get(this.serverUrl + '/' + id, this.authService.jwt())
			.toPromise()
			.then(response => {
				return response.json() as Product;
			})
			.catch(error => {
					return this.handleError(error);
				}
			);
	}

	private handleError(error: any): Promise<any> {
		console.error('handleError');
		return Promise.reject(error.message || error);
	}

	getIndex(id) {
		let result = -1;
		this.products.some(function (item, i) {
			if (item['_id'] === id) {
				result = i;
				return true;
			}
		});
		return result;
	}

	public remove(id) {
		this.http.delete(this.serverUrl + '/' + id, this.authService.jwt())
			.map((response) => response.json())
			.subscribe((result: Product) => {
				this.products.splice(this.getIndex(id), 1);
				this.productsChanged.next(this.products.slice());
			});
	}

	update(id, updatedProduct: Product) {
		updatedProduct.sizes = this.convertObjectToArray(updatedProduct.sizes);
		updatedProduct.colors = this.convertObjectToArray(updatedProduct.colors);

		this.http.put(this.serverUrl + '/' + id, updatedProduct, this.authService.jwt())
			.map((response) => response.json() as Product)
			.subscribe((result: Product) => {
				this.products[this.getIndex(id)] = result;
				this.productsChanged.next(this.products.slice());
			});
	}

	post(updatedProduct: Product) {
		updatedProduct.sizes = this.convertObjectToArray(updatedProduct.sizes);
		updatedProduct.colors = this.convertObjectToArray(updatedProduct.colors);

		this.http.post(this.serverUrl, updatedProduct, this.authService.jwt())
			.map((response) => response.json() as Product)
			.subscribe((result: Product) => {
				this.products.push(result);
				this.productsChanged.next(this.products.slice());
			});
	}

	private convertObjectToArray(obj) {
		const array: string[] = [];

		for (let i = 0; i < obj.length; i++) {
			for (var property in obj[i]) {
				array.push(obj[i][property])
			}
		}
	
		return array;
	}
}
