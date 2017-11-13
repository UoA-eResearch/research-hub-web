import {Injectable} from '@angular/core';


export enum OptionType {
  ResearchActivity = 1,
  Category,
  Menu
}

export enum ContentTypeId {
  Support = 1,
  Equipment,
  Training,
  Software,
  Facilities,
  KnowledgeArticle,
  Guide
}

export enum ResearchActivityId {
  PlanDesign = 1,
  CreateCollectCapture,
  AnalyzeInterpret,
  PublishReport,
  DiscoverReuse
}

export enum CategoryId {
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
  public contentTypeMap: any;

  constructor() {
    this.contentTypeMap = {};
    this.contentTypeMap[CategoryId.Support] = [ContentTypeId.Support];
    this.contentTypeMap[CategoryId.Equipment] = [ContentTypeId.Equipment];
    this.contentTypeMap[CategoryId.Training] = [ContentTypeId.Training];
    this.contentTypeMap[CategoryId.Software] = [ContentTypeId.Software];
    this.contentTypeMap[CategoryId.Facilities] = [ContentTypeId.Facilities];
    this.contentTypeMap[CategoryId.Guide] = [ContentTypeId.Guide, ContentTypeId.KnowledgeArticle];

    this.categoryOptions = [
      {id: CategoryId.All, name: 'All Categories', icon: '', type: OptionType.Category},
      {id: CategoryId.Support, name: 'Services & Support', icon: 'escalator', type: OptionType.Category},
      {id: CategoryId.Equipment, name: 'Equipment', icon: 'math-compass', type: OptionType.Category},
      {id: CategoryId.Training, name: 'Training', icon: 'bike', type: OptionType.Category},
      {id: CategoryId.Software, name: 'Software', icon: 'laptop-windows', type: OptionType.Category},
      {id: CategoryId.Facilities, name: 'Facilities', icon: 'castle', type: OptionType.Category},
      {id: CategoryId.Guide, name: 'Guides', icon: 'book-open-variant', type: OptionType.Category},
      {id: CategoryId.Person, name: 'People', icon: 'face', type: OptionType.Category},
      {id: CategoryId.Policies, name: 'Policies', icon: 'bank', type: OptionType.Category}
    ];

    this.researchActivityOptions = [
      {
        id: ResearchActivityId.PlanDesign,
        name: 'Plan & Design',
        icon: 'mdi-timetable',
        className: 'plan',
        type: OptionType.ResearchActivity
      },
      {
        id: ResearchActivityId.CreateCollectCapture,
        name: 'Create, Collect & Capture',
        icon: 'mdi-google-circles-extended',
        className: 'create',
        type: OptionType.ResearchActivity
      },
      {
        id: ResearchActivityId.AnalyzeInterpret,
        name: 'Analyze & Interpret',
        icon: 'mdi-chart-areaspline',
        className: 'analyze',
        type: OptionType.ResearchActivity
      },
      {
        id: ResearchActivityId.PublishReport,
        name: 'Publish & Report',
        icon: 'mdi-cube-send',
        className: 'publish',
        type: OptionType.ResearchActivity
      },
      {
        id: ResearchActivityId.DiscoverReuse,
        name: 'Discover & Reuse',
        icon: 'mdi-sync',
        className: 'discover',
        type: OptionType.ResearchActivity
      }
    ];

    this.menuOptions = [
      {name: 'Search', icon: 'search', routerLink: '/search', type: OptionType.Menu},
      {name: 'Browse', icon: 'view_list', routerLink: '', sublist: this.categoryOptions, type: OptionType.Menu},
      {
        name: 'Research Activities',
        icon: 'school',
        routerLink: '',
        sublist: this.researchActivityOptions,
        type: OptionType.Menu
      },
      {name: 'Join User Study', icon: 'people', routerLink: '/feedback', type: OptionType.Menu},
      {name: 'Provide Feedback', icon: 'thumbs_up_down', routerLink: '/feedback', type: OptionType.Menu},
      {name: 'Contact Us', icon: 'phone', routerLink: '/contact', type: OptionType.Menu},
      {name: 'About Us', icon: 'info', routerLink: '/about', type: OptionType.Menu}
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