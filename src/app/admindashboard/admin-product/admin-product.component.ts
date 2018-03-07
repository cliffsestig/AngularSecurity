import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
  providers: [ProductService]
})
export class AdminProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
