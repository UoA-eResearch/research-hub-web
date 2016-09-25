import {Component, OnInit} from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
