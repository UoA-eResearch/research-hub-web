import {Injectable} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import { Location } from '@angular/common';


export enum MenuItemType {
  Root = 1,
  All,
  Content,
  Person,
  Guide,
  Policy
}

export class MenuItem {

  public parent: MenuItem;

  constructor(public id: string, public name: string, public icon: string, public type: MenuItemType,
              public contentTypeId: number, public menuItems: [MenuItem], public image: string, public description:string) {

    // Set this menuItem as the parent
    if (menuItems != null) {
      for (const child of menuItems) {
        child.parent = this;
      }
    }
  }

  public isLeaf() {
    return this.menuItems == null;
  }
}


@Injectable()
export class MenuService {

  public contentTypeIdSupport = 1;
  public contentTypeIdInstrumentsEquipment = 2;
  public contentTypeIdTraining = 3;
  public contentTypeIdSoftware = 4;
  public contentTypeIdFacilitiesSpaces = 5;
  public contentTypeIdKnowledgeArticle = 6;
  public contentTypeIdGuide = 7;
  public nameAll = 'All Categories';
  public nameSupport = 'Services & Support';
  public nameInstrumentsEquipment = 'Instruments & Equipment';
  public nameTraining = 'Skills Development';
  public nameSoftware = 'Software';
  public nameFacilitiesSpaces = 'Facilities & Spaces';
  public nameGuides = 'Guides';
  public namePeople = 'People';
  public nameKnowledgeArticle = 'Knowledge Articles & Know-How';
  public namePolicies = 'Policies';

  private root: MenuItem;
  private menuItemsDict = {};

  public static getMenuItemId(params: [string]) {
    const notNulls = [];

    for (const id of params) {
      if (id != null) {
        notNulls.push(id);
      }
    }
    return '/' + notNulls.join('/');
  }

  constructor(private breadcrumbService: BreadcrumbService, private location: Location) {
    this.root =
      new MenuItem('', '', '', MenuItemType.Root, null, [
        new MenuItem('all', this.nameAll, '', MenuItemType.All, null, null, null, ""),
        new MenuItem('support', this.nameSupport, 'help', MenuItemType.Content, this.contentTypeIdSupport, null, 'page-elements/483_Pacific_28Sep10_1680x220_BW.jpg', "<p>Specialised, technical, or IT support that can assist your research. Find out who you can speak to, and what services and resources are available from across the University to enable and accelerate your work.</p>"),
        new MenuItem('instrumentsEquipment', this.nameInstrumentsEquipment, 'camera_roll', MenuItemType.Content, this.contentTypeIdInstrumentsEquipment, null, 'page-elements/20160126-Engineering-Profile-004_1680x220_BW.jpg', "<p>Large scale and specialist equipment available across the University that can help you answer your research questions or produce creative works.</p>"),
        new MenuItem('training', this.nameTraining, 'directions_bike', MenuItemType.Content, this.contentTypeIdTraining, null, 'page-elements/Violin_1680x220_BW.jpg', "<p>Workshops, seminars, or training opportunities where you can upskill in a broad range of areas to learn new techniques or improve your research and expertise.</p>"),
        new MenuItem('software', this.nameSoftware, 'shop', MenuItemType.Content, this.contentTypeIdSoftware, null, 'page-elements/20130930_UoA_Details_031_1680x220_BW.jpg', "<p>Applications and software services that can help you communicate, collaborate, create, or analyse.</p>"),
        new MenuItem('facilitiesSpaces', this.nameFacilitiesSpaces, 'home', MenuItemType.Content, this.contentTypeIdFacilitiesSpaces, null, 'page-elements/Business_1680x220_BW.jpg', "<p>Places, locations, or specialised infrastructure you can make use of for your research.</p>"),
        new MenuItem('guides', this.nameGuides, 'language', MenuItemType.Content, this.contentTypeIdGuide, null, 'page-elements/1483_UoA_13Oct09_1680x220_BW.jpg', "<p>Find the key resources and support for specialised topics, including best practice and related tools or workflows for a given task or subject area.</p>"),
        new MenuItem('people', this.namePeople, 'face', MenuItemType.Person, null, null, 'page-elements/DSC_0192_1680x220_BW.jpg', "<p>He tāngata. He tāngata. He tāngata. Find people with the skills and knowledge related to support offerings who can help you make things happen.</p>"),
        new MenuItem('knowledgeArticle', this.nameKnowledgeArticle, 'book', MenuItemType.Content, this.contentTypeIdKnowledgeArticle, null, 'page-elements/58_Arts_20March2010_1680x220_BW.jpg', "<p>Short articles and useful information on a broad range of topics that can help your research and creative endeavours at the University of Auckland.</p>"),
        new MenuItem('policies', this.namePolicies, 'account_balance', MenuItemType.Policy, null, null, 'page-elements/UniAkl_9369_1680x220_BW.jpg', "<p>This area provides quick links to selected policies, standards, or guidelines that may apply to research activities or the use of some services. Please note the list is not comprehensive, but provided as a convenience. <a href='https://www.auckland.ac.nz/en/about/the-university/how-university-works/policy-and-administration.html'>The Policy Hub</a> is the authoritative source for all University policy and related documents.</p>"),
      ], null, "");

    this.createMenuItemsDict('', this.root.menuItems);
    this.createFriendlyNames('/browse', this.root.menuItems);
    this.createFriendlyNames('/search', this.root.menuItems);
    this.breadcrumbService.addFriendlyNameForRoute('/orgUnits', 'Organisational Units');
    this.breadcrumbService.addFriendlyNameForRoute('/people', 'People');
    this.breadcrumbService.addFriendlyNameForRoute('/resources', 'Resources');
    this.breadcrumbService.addFriendlyNameForRoute('/guides', 'Guides');
  }

  private createMenuItemsDict(parentId: string, menuItems: [MenuItem]) {
    for (const menuItem of menuItems) {
      const childId = parentId + '/' + menuItem.id;
      this.menuItemsDict[childId] = menuItem;

      if (!menuItem.isLeaf()) {
        this.createMenuItemsDict(childId, menuItem.menuItems);
      }
    }
  }

  private createFriendlyNames(parentRoute: string, menuItems: [MenuItem]) {
    for (const menuItem of menuItems) {
      const childRoute = parentRoute + '/' + menuItem.id;
      this.breadcrumbService.addFriendlyNameForRoute(childRoute, menuItem.name);

      if (!menuItem.isLeaf()) {
        this.createFriendlyNames(childRoute, menuItem.menuItems);
      }
    }
  }

  public getCurrentPath() {
    const currentPath = this.location.path().split('/').slice(1);
    currentPath[0] = '/' + currentPath[0];
    return currentPath;
  }

  public getMenuItem(menuItemId: string) {
    if (menuItemId === '/') {
      return this.root;
    }

    return this.menuItemsDict[menuItemId];
  }
}
