import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  @Input() product: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openProductDetails() {
    this.router.navigate(['details', this.product.id, this.product.name]);
  }
}
