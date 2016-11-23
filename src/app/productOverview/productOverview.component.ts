import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ProductService} from "../app.product.service";

@Component({
  selector: 'product-overview',
  templateUrl: './productOverview.component.html',
  styleUrls: ['./productOverview.component.scss']
})
export class ProductOverviewComponent {
  @Input() product:any;

  constructor(private router: Router, private productService: ProductService) {

  }
  
  openProductDetails()
  {
    this.router.navigate(['productList', this.product.type, 'productDetails', this.product.nid]);
  }
}
