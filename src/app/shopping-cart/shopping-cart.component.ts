import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product/product.model';
import {ShoppinglistService} from '../services/shoppinglist.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

	products: Product[];
	subscription: Subscription;

	constructor(private slService: ShoppinglistService) {
	}

	ngOnInit() {
		this.subscription = this.slService.productsChanges
			.subscribe(
				(product: Product[]) => {
					this.products = product;
				});
	}

	onChange(quantity, product) {
		product.quantity = quantity.target.value;
		const shoppingList: Product[] = [];
		this.products.forEach(function (prod) {
			if (prod._id === product._id && prod.colors === product.colors && prod.sizes === product.sizes) {
				prod = product;
			}
			shoppingList.push(prod);
		});
		this.products = shoppingList;
		this.slService.updateShoppingList(shoppingList);
	}

	onRemove(id, size, color) {
		this.slService.removeItemShoppingList(id, size, color);
	}
}
