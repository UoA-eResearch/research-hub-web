import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {DrupalService} from "../app.drupal.service";
import { ActivatedRoute } from '@angular/router';
import {ProductService} from "../app.product.service";

@Component({
  styleUrls: ['./productDetails.component.scss'],
  templateUrl: './productDetails.component.html',
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product:any;
  productId: string;
  routeParamsSub: any;

  constructor(private route: ActivatedRoute, private drupalService: DrupalService, private productService: ProductService) {

  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.drupalService.getProduct(this.productId).subscribe(
        data => { this.product = data},
        err => console.error(err)
      );
    });
  }

  ngAfterViewInit()
  {
    window.scrollTo(0, 0);
  }
}
