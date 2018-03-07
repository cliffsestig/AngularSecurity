import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product/product.model';
import {ShoppinglistService} from '../../services/shoppinglist.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-shopping-cart-dropdown',
	templateUrl: './shopping-cart-dropdown.component.html',
	styleUrls: ['./shopping-cart-dropdown.component.css'],
})
export class ShoppingCartDropdownComponent implements OnInit, OnDestroy {
	totalPrice: any;
	subscription: Subscription;
	products: Product[] = [];

	constructor(private slService: ShoppinglistService) {
	}


	ngOnInit() {
		this.subscription = this.slService.productsChanges
			.subscribe(
				(products: Product[]) => {
					this.products = products;
					this.totalPrice = this.products.reduce((a, b) => a + (b.price * b.quantity), 0).toFixed(2);
				});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
