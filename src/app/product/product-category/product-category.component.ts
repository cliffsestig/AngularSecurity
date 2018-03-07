import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product/product.model';
import {ProductService} from '../../services/product.service';

@Component({
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

	products: Product[] = [];
	filteredProducts: Product[] = [];
	subscription: Subscription;
	gender: string;
	category: string;

	constructor(private productService: ProductService,
							private router: Router,
							private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.subscription = this.productService.productsChanges
			.subscribe(
				(products: Product[]) => {
					if (products !== undefined) {
						this.filteredProducts = products;
					}
				}
			);
		this.productService.getProducts()
			.then(products => this.products = products)
			.then(() => this.filterProducts())
			.catch(error => console.error(error));

		this.route.params
			.subscribe(
				(params: Params) => {
					this.gender = params['gender'];
					this.category = params['category'];
					if (this.filteredProducts.length !== 0) {
						this.filterProducts();
					}
				}
			);
		this.productService.changeProduct(this.filteredProducts);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	filterProducts() {
		if (this.filteredProducts.length > 0) {
			this.filteredProducts.length = 0;
		}
		if (this.products) {
			this.products.forEach(prod => {
				if (prod.gender.toLowerCase() === this.gender) {
					if ( this.category !== undefined && prod.category.toLowerCase() === this.category) {
						this.filteredProducts.push(prod);
					} else if ( this.category === undefined ) {
						this.filteredProducts.push(prod);
					}

				}
			});

			this.productService.changeProduct(this.filteredProducts);
		}
	}
}
