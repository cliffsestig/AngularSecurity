import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-shopping-cart-confirmation',
	templateUrl: './shopping-cart-confirmation.component.html',
	styleUrls: ['./shopping-cart-confirmation.component.css']
})
export class ShoppingCartConfirmationComponent implements OnInit {

	authenticated: boolean = false;

	constructor(private authService: AuthService) {
	}

	ngOnInit() {
		if (this.authService.isAuthenticated()) {
			this.authenticated = true;
		}
	}

}
