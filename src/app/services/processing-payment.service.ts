import {Injectable} from '@angular/core';

import {Order} from '../models/order/order.model';
import {OrderService} from './order.service';

@Injectable()
export class ProcessingPaymentService {

	constructor(private orderService: OrderService) {}
	paymentStatus: string;
	paymentResponse: string;

	public getPaymentResponse(){
		return this.paymentResponse;
	}

	public getPaymentStatus(){
		return this.paymentStatus;
	}

	public checkStatusPayment(orderId) {
		return this.orderService.getOrder(orderId)
			.then(order => {
				switch (JSON.parse(order).status) {
					case "open":
						this.paymentResponse = "Wachtend op betaling";
						this.paymentStatus = "open";
						break;
					case "paid":
						this.paymentResponse = "De betaling is succesvol bedankt voor de aankoop";
						this.paymentStatus = "paid";
						break;
					case "failed":
						this.paymentResponse = "De betaling is niet gelukt";
						this.paymentStatus = "failed";
						break;											
					default:
						this.paymentResponse = "De betaling is niet gelukt";
						this.paymentStatus = "failed";
						break;
				}
			});
	}

}
