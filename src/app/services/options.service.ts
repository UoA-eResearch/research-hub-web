import {Injectable} from '@angular/core';


export enum OptionTypes {
  ResearchActivity = 1,
  Category,
  Menu
}

export enum ResearchActivityIds {
  PlanDesign = 1,
  CreateCollectCapture,
  AnalyzeInterpret,
  PublishReport,
  DiscoverReuse
}

export enum CategoryIds {
  All = 1,
  Support,
  Equipment,
  Training,
  Software,
  Facilities,
  Guide,
  Person,
  Policies
}


@Injectable()
export class OptionsService {

  private coverImages = [
    '20151005_Science Detail_001_1680x220_BW.jpg',
    '483_Pacific_28Sep10_1680x220_BW.jpg',
    '20130930_UoA_Details_225_1680x220_BW.jpg'
  ];
  public categoryOptions: any[];
  public researchActivityOptions: any[];
  public menuOptions: any[];
  public pageInfo: any;

  constructor() {
    this.categoryOptions = [
      {id: CategoryIds.All, name: 'All Categories', icon: '', type: OptionTypes.Category},
      {id: CategoryIds.Support, name: 'Services & Support', icon: 'escalator', type: OptionTypes.Category},
      {id: CategoryIds.Equipment, name: 'Equipment', icon: 'math-compass', type: OptionTypes.Category},
      {id: CategoryIds.Training, name: 'Training', icon: 'bike', type: OptionTypes.Category},
      {id: CategoryIds.Software, name: 'Software', icon: 'laptop-windows', type: OptionTypes.Category},
      {id: CategoryIds.Facilities, name: 'Facilities', icon: 'castle', type: OptionTypes.Category},
      {id: CategoryIds.Guide, name: 'Guides', icon: 'book-open-variant', type: OptionTypes.Category},
      {id: CategoryIds.Person, name: 'People', icon: 'face', type: OptionTypes.Category},
      {id: CategoryIds.Policies, name: 'Policies', icon: 'bank', type: OptionTypes.Category}
    ];

    this.researchActivityOptions = [
      {
        id: ResearchActivityIds.PlanDesign,
        name: 'Plan & Design',
        icon: 'mdi-timetable',
        color: '#60388B',
        type: OptionTypes.ResearchActivity
      },
      {
        id: ResearchActivityIds.CreateCollectCapture,
        name: 'Create, Collect & Capture',
        icon: 'mdi-google-circles-extended',
        color: '#3097CB',
        type: OptionTypes.ResearchActivity
      },
      {
        id: ResearchActivityIds.AnalyzeInterpret,
        name: 'Analyze & Interpret',
        icon: 'mdi-chart-areaspline',
        color: '#359737',
        type: OptionTypes.ResearchActivity
      },
      {
        id: ResearchActivityIds.PublishReport,
        name: 'Publish & Report',
        icon: 'mdi-cube-send',
        color: '#F3961C',
        type: OptionTypes.ResearchActivity
      },
      {
        id: ResearchActivityIds.DiscoverReuse,
        name: 'Discover & Reuse',
        icon: 'mdi-sync',
        color: '#CC3333',
        type: OptionTypes.ResearchActivity
      }
    ];

    this.menuOptions = [
      {name: 'Search', icon: 'search', routerLink: '/search', type: OptionTypes.Menu},
      {name: 'Browse', icon: 'view_list', routerLink: '', sublist: this.categoryOptions, type: OptionTypes.Menu},
      {
        name: 'Research Activities',
        icon: 'school',
        routerLink: '',
        sublist: this.researchActivityOptions,
        type: OptionTypes.Menu
      },
      {name: 'Join User Study', icon: 'people', routerLink: '/feedback', type: OptionTypes.Menu},
      {name: 'Provide Feedback', icon: 'thumbs_up_down', routerLink: '/feedback', type: OptionTypes.Menu},
      {name: 'Contact Us', icon: 'phone', routerLink: '/contact', type: OptionTypes.Menu},
      {name: 'About Us', icon: 'info', routerLink: '/about', type: OptionTypes.Menu}
    ];

    this.pageInfo = {
      home: {
        title: 'Welcome to the Research Hub',
        description: 'The Research Hub connects you with people, resources, and services from across the University to enhance and accelerate your research.',
        imageUrl: 'page-elements/' + this.coverImages[Math.floor(Math.random() * 3)], // Generate a random number between 1 and 3 and
        isHeaderVisible: true,
        isSearchBarVisible: true
      },
      search: {isHeaderVisible: false, isSearchBarVisible: true},
      feedback: {
        title: 'Feedback',
        description: 'We appreciate your visit to the beta-version of the Research Hub, our platform for research support.',
        isHeaderVisible: true,
        isSearchBarVisible: false
      },
      about: {
        title: 'About us',
        description: 'The Centre for eResearch comprises a team of highly qualified research and technical staff dedicated to the delivery of advanced computational solutions to help power the University\'s research mission.',
        isHeaderVisible: true,
        isSearchBarVisible: false
      },
      contact: {title: 'Contact us', isHeaderVisible: true, isSearchBarVisible: false},
      orgUnit: {isHeaderVisible: false, isSearchBarVisible: false},
      person: {isHeaderVisible: false, isSearchBarVisible: false},
      content: {isHeaderVisible: false, isSearchBarVisible: false},
      guide: {isHeaderVisible: false, isSearchBarVisible: false},
      guideCategory: {isHeaderVisible: false, isSearchBarVisible: false},
      requestVm: {isHeaderVisible: false, isSearchBarVisible: false}
    };
  }
}
