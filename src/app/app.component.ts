import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
declare var $:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    router: Router;

    constructor(router: Router)
    {
      this.router = router;
      console.log(this.router);
    }

    ngOnInit() {
        $('.button-collapse').sideNav({
                menuWidth: 260, // Default is 240
                edge: 'left', // Choose the horizontal origin
                closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );

        $(document).ready(function () {
            $('select').material_select();
        });
    }

    setActive()
    {

    }
}
