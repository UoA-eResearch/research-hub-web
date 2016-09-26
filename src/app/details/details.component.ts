import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
    templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
    product:any;

    constructor() {
        this.product = {
            id: 1,
            title: 'Research Consulting',
            image: this.dummyImageSrc(),
            body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
            '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
            ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
            'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
            'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
            field_category: 'Service',
            field_limitations: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie ' +
            'intelligentsia 3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi ' +
            'sartorial. Selvage fap chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa ' +
            'mlkshk meh viral schlitz photo booth biodiesel. Wolf DIY before they sold out, austin actually ' +
            'pop-up portland forage chicharrones. +1 cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
            field_considerations: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock ' +
            'yuccie intelligentsia 3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn' +
            ' kogi sartorial. Selvage fap chambray poutine direct trade iPhone. Chicharrones synth gentrify, ' +
            'marfa mlkshk meh viral schlitz photo booth biodiesel. Wolf DIY before they sold out, austin actually' +
            ' pop-up portland forage chicharrones. +1 cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
            field_features: 'Test planning and management (support and consultation or $ service) Load testing ' +
            '(LoadUI) Functional testing (SOAPUI, Cucumber/gerkin, ) Performance testing (Jmeter) Browser and ' +
            'device testing (browserstack) Integration testing Consultation (best practice, tuition, assitance ' +
            'to turn business rules into automated tests) UNICODE testing Accessibility support and WCAG 2.0 ' +
            'compliance User acceptance testing',
            field_eligibility: 'People with money',
            field_requirements: 'Project description and money',
            field_cost: 'Free',
            field_support: 'j.bauer@auckland.ac.nz'
        };
    }

    dummyImageSrc()
    {
        let rand = 1;

        for(let i = 0; i < 5; i++)
        {
            rand *= Math.random();
        }

        return "http://lorempixel.com/400/200/technics?dummy=".concat(rand.toString());
    }

    ngOnInit() {

    }
}
