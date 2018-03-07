import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Order } from '../../../models/order/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

	order: Order
  id: String;
  total: number = 0;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    
    this.route.params
      .subscribe(
        (params: Params) => {
        	this.orderService.getOrder(params['id'])
            .then(a => this.order = JSON.parse(a), this.id = params['id'])
            .then(()=> this.getTotal())
            .catch(error => console.error(error));
        }
      );
  }
  getTotal(){
    for (let i = 0; i < this.order.entries.length; i++) {
      this.total = this.total + this.order.entries[i].quantity as number;
		}
  }
}