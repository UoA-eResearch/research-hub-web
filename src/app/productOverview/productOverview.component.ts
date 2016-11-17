import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'product-overview',
  templateUrl: './productOverview.component.html',
  styleUrls: ['./productOverview.component.scss']
})
export class ProductOverviewComponent {
  @Input() product:any;

  constructor(private router: Router) {

  }

  openProductDetails()
  {
    this.router.navigate(['productList', this.product.type, 'productDetails', this.product.nid]);
  }
}
