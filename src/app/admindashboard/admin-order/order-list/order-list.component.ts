import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Order } from '../../../models/order/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

	orders: Order[] = [];

	constructor(private orderService: OrderService) {}

	ngOnInit() {
		this.orderService.getOrders()
			.then((response) => this.orders = response)
			.catch(error => console.error(error));
	}
}
