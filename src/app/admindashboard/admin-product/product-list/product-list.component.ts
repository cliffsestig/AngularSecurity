import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../models/product/product.model';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productService.getProducts()
    .then(ing => this.products = ing)
    .catch(error => console.error(error));
  this.subscription = this.productService.productsChanged
    .subscribe(
      (a: Product[]) => {
        this.products = a;
      }
    );
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
