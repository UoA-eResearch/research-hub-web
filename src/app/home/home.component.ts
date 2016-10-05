import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
declare var $:any;

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    services:any[];

    constructor() {

    }

    ngOnInit() {
      $(document).ready(function(){
        $('.parallax').parallax();
      });
    }

}
