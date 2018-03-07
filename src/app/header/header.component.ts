import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../models/product/product.model';
import { ShoppinglistService } from '../services/shoppinglist.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [ProductService]
})

export class HeaderComponent implements OnInit, OnDestroy {
	productCount: number;
	subscription: Subscription;
	user: User;
	status: boolean = false;

	private shoppingList: Product[] = [];
	products: Product[] = [];
	productMenu: Product[] = [];
	menu: Map<string, string[]> = new Map<string, string[]>();
	keys: any = [];

	ISOCODE: {};

	constructor(private slService: ShoppinglistService,
		private authService: AuthService,
		private userService: UserService,
		private translate: TranslateService,
		private prodService: ProductService) {

			
	}


	ngOnInit() {
		if (localStorage.getItem('currentLang') && localStorage.getItem('currentLang') === 'en') {
			this.ISOCODE = { value: 'en-US' };
		} else {
			this.ISOCODE = { value: 'nl-NL' };
		}
		this.products = this.slService.getShoppinglist();
		const userId = this.authService.getUserId();
		if (userId) {
			this.userService.getUser(userId).then((a) => this.user = JSON.parse(a));
		}
		this.authService.statChanges
			.subscribe(
			() => {
				if (this.authService.isAuthenticated()) {
					this.status = true;
					this.userService.getUser(userId).then((a) => this.user = JSON.parse(a));
				}
				else {
					this.user = null;
					this.status = false;
				}
			});

		this.subscription = this.slService.productsChanges

			.subscribe((products: Product[]) => {
				this.products = products;
				this.getCount();
			});

		this.prodService.getProducts()
			.then(products => this.products = products)
			.then(() => this.productMenu = this.products)
			.then(() => this.createMenu());
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	createMenu() {
		this.productMenu.forEach(product => {
			if (this.menu.has(product.gender)) {
				if (!this.menu.get(product.gender).includes(product.category)) {
					this.menu.get(product.gender).push(product.category);
				}
			} else {
				this.menu.set(product.gender, []);
				this.menu.get(product.gender).push(product.category);
				this.keys.push(product.gender);
			}
		});
	}

	switchLanguage(language: string) {
		localStorage.currentLang = language;
		this.translate.use(language);

		if (localStorage.getItem('currentLang') && localStorage.getItem('currentLang') === 'en-US') {
			this.ISOCODE = { value: 'en-US' };
		} else {
			this.ISOCODE = { value: 'nl-NL' };
		}
	}

	getCount() {
		this.productCount = 0;
		for (let i = 0; i < this.products.length; i++) {
			this.productCount = this.productCount + this.products[i].quantity;
		}
	}
}
