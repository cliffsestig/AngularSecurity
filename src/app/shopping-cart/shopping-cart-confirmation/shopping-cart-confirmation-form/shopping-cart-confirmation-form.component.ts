import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { ShoppinglistService } from '../../../services/shoppinglist.service';

@Component({
	selector: 'app-shopping-cart-confirmation-form',
	templateUrl: './shopping-cart-confirmation-form.component.html',
	styleUrls: ['./shopping-cart-confirmation-form.component.css']
})
export class ShoppingCartConfirmationFormComponent implements OnInit {

	userForm: FormGroup;
	error: string;

  constructor(private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private shoppingListService: ShoppinglistService) {
  }

	ngOnInit() {
		this.initForm();
	}

	private initForm() {

    this.userForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'province': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required)
    });

		if (this.authService.isAuthenticated()) {
			this.userService.getUser(this.authService.getUserId()).then((user) => {
				user = JSON.parse(user);

				this.userForm.setValue({
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					address: user.address,
					city: user.city,
					province: user.province,
					postalCode: user.postalCode,
					country: user.country
				});
			});
		}
	}

  onSubmit() {
		if (this.authService.isAuthenticated()) {
			this.userService.updateUser(this.userForm.value);
		}
    
    this.orderService.createOrder(this.userForm.value)
      .then((order) => {
			this.shoppingListService.sendToMollie(order._id);
      })
      .catch(error => {
			console.error(error);
			this.error = error;
		});
  }
}
