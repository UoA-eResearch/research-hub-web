import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MdCard} from "@angular/material";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  @ViewChild('image') image; // Image always full width of card, need native element for knowing what size card is
  @Input() product: any;

  showAbstract = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.updateShowAbstract();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateShowAbstract();
  }

  updateShowAbstract() {
    this.showAbstract = this.image.nativeElement.offsetWidth > 300;
  }

  openProductDetails() {
    this.router.navigate(['details', this.product.id, this.product.name]);
  }
}
