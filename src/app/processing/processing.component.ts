import {Component, OnInit} from '@angular/core';
import { ProcessingPaymentService } from '../services/processing-payment.service';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { ShoppinglistService } from '../services/shoppinglist.service';

import { TranslateService } from '@ngx-translate/core';

import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
	selector: 'app-processing',
	templateUrl: './processing.component.html',
	styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

	constructor(private processingPaymentService: ProcessingPaymentService, 
				private router: Router,
				private route: ActivatedRoute,
				private shoppinglistService: ShoppinglistService,
		private translate: TranslateService) {
	}

	orderId: string;
	obs: Subscription;
	counter: number = 1;
	message: string;
	status: string;

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.orderId = params['id'];
				}
			)



	this.processingPaymentService.checkStatusPayment(this.orderId)
		.then(() => {
			this.message = this.processingPaymentService.getPaymentResponse();

			this.status = this.processingPaymentService.getPaymentStatus();
			console.log(this.status);
		});

	this.obs = Observable.interval(5000).switchMap(() => this.processingPaymentService.checkStatusPayment(this.orderId))
		.subscribe(() => {

			this.message = this.processingPaymentService.getPaymentResponse();
			this.status = this.processingPaymentService.getPaymentStatus();
			if (this.processingPaymentService.getPaymentStatus() === "paid") { 
				this.obs.unsubscribe();
				this.shoppinglistService.removeShoppingList();
			} else if (this.counter == 12 || this.processingPaymentService.getPaymentStatus() === "failed") {
				this.obs.unsubscribe();
			}

			this.counter++;
		});
	}
}
