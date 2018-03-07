import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../models/product/product.model';
import {ProductService} from '../../services/product.service';
import {ShoppinglistService} from '../../services/shoppinglist.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css'],
	providers: [ProductService]
})

export class ProductDetailComponent implements OnInit {
	product: Product;
	quantity: number = 1;
	selectedSize: string;
	selectedColor: string;

	constructor(private productService: ProductService,
							private router: Router,
							private route: ActivatedRoute,
							private slService: ShoppinglistService) {
	}

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.productService.getProduct(params['id'])
						.then(product => {
							this.product = product;
							this.selectedSize = product.sizes[0];
							this.selectedColor = product.colors[0];
						})
						.catch(error => console.error(error));
				}
			);
	}

	addToShoppingCart(product: Product) {
		this.slService.addShoppingList(product, this.quantity, this.selectedSize, this.selectedColor);
	}
}
