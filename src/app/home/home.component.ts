import {Component, OnDestroy} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
declare var $:any;

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  products:any[];
  private searchSubscription: any;

  constructor(private searchService:SearchService) {
    this.products = [{
      id: 1,
      title: 'Research Consul...',
      image: this.dummyImageSrc(),
      body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
      '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
      ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
      'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
      'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
      field_category: 'Guide',
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
    },
      {
        id: 2,
        title: 'Statistical Support',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
        'compliance User acceptance testing', field_eligibility: 'People with money',
        field_requirements: 'Project description and money',
        field_cost: 'Free',
        field_support: 'j.bauer@auckland.ac.nz'
      },
      {
        id: 3,
        title: '3D Printing',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
        'compliance User acceptance testing', field_eligibility: 'People with money',
        field_requirements: 'Project description and money',
        field_cost: 'Free',
        field_support: 'j.bauer@auckland.ac.nz'
      },
      {
        id: 4,
        title: 'Auckland Scien...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
        'compliance User acceptance testing', field_eligibility: 'People with money',
        field_requirements: 'Project description and money',
        field_cost: 'Free',
        field_support: 'j.bauer@auckland.ac.nz'
      },
      {
        id: 5,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 6,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 7,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 8,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 9,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 10,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 11,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      },
      {
        id: 12,
        title: '3D Visualisatio...',
        image: this.dummyImageSrc(),
        body: 'Post-ironic wayfarers squid, heirloom truffaut occupy ugh locavore hammock yuccie intelligentsia ' +
        '3 wolf moon aesthetic. Church-key jean shorts vegan, waistcoat chia brooklyn kogi sartorial. Selvage fap' +
        ' chambray poutine direct trade iPhone. Chicharrones synth gentrify, marfa mlkshk meh viral schlitz photo ' +
        'booth biodiesel. Wolf DIY before they sold out, austin actually pop-up portland forage chicharrones. +1 ' +
        'cred pabst squid. Godard photo booth pitchfork tilde 8-bit.',
        field_category: 'Guide',
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
      }];
  }

  dummyImageSrc()
  {
    let rand = 1;

    for(let i = 0; i < 5; i++)
    {
      rand *= Math.random();
    }

    return "http://lorempixel.com/160/160/business?dummy=".concat(rand.toString());
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchChange.subscribe((value) => {
      console.log('Search value: ' + value);
    });

    $(document).ready(function(){
      $('.parallax').parallax();
    });
  }

  ngOnDestroy()
  {
    console.log('destroy');
    this.searchSubscription.unsubscribe();
  }

}
