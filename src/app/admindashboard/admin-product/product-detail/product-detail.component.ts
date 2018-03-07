import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailAdminComponent implements OnInit {
  product: Product;
  id: number;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.productService.getProduct(params['id'])
            .then((rec) => this.product = rec, this.id = params['id'])
            .catch(error => console.error(error));
        }
      );
  }

  onEditproduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProduct() {
    this.productService.remove(this.id);
    this.router.navigate(['/admindashboard/admin-product']);
  }

}
