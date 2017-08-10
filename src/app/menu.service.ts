import {Injectable} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";


export enum MenuItemType {
  Root = 1,
  All,
  Content,
  Person,
  Guide,
  KnowledgeArticle,
  Policy
}

export class MenuItem {

  public parent: MenuItem;

  constructor(public id: string, public name: string, public icon: string, public type: MenuItemType,
              public contentTypeId: number, public menuItems: [MenuItem]) {

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

  constructor(private breadcrumbService: BreadcrumbService) {
    this.root =
      new MenuItem('', '', '', MenuItemType.Root, null, [
        new MenuItem('all', 'All Categories', '', MenuItemType.All, null, null),
        new MenuItem('support', 'Services & Support', 'help', MenuItemType.Content, 1, null),
        new MenuItem('instrumentsEquipment', 'Instruments & Equipment', 'camera_roll', MenuItemType.Content, 2, null),
        new MenuItem('training', 'Skills Development', 'directions_bike', MenuItemType.Content, 3, null),
        new MenuItem('software', 'Software', 'shop', MenuItemType.Content, 4, null),
        new MenuItem('facilitiesSpaces', 'Facilities & Spaces', 'home', MenuItemType.Content, 5, null),
        new MenuItem('guides', 'Guides', 'language', MenuItemType.Guide, null, null),
        new MenuItem('people', 'People', 'face', MenuItemType.Person, null, null),
        new MenuItem('knowledgeArticle', 'Knowledge Articles & Know-How', 'book', MenuItemType.Content, 6, null),
        new MenuItem('policies', 'Policies', 'account_balance', MenuItemType.Policy, null, null),
      ]);

    this.createMenuItemsDict('', this.root.menuItems);
    this.createFriendlyNames('/browse', this.root.menuItems);
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

  public getMenuItem(menuItemId: string) {
    if (menuItemId === '/') {
      return this.root;
    }

    return this.menuItemsDict[menuItemId];
  }
}
