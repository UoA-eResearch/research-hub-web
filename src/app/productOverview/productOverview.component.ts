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

  getLogo()
  {
    if(this.product.fields.field_logo && this.product.fields.field_logo.length > 0)
      return "https://researchit.cer.auckland.ac.nz:8080/sites/default/files/" + this.product.fields.field_logo[0].filename;
    return "assets/service.png";
  }

  openProductDetails()
  {
    this.router.navigate(['productList', this.product.type, 'productDetails', this.product.nid]);
  }
}
