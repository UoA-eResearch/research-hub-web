import {Injectable} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";


export enum CategoryType {
  Root = 1,
  Category,
  Subcategory
}

export class Category {

  public parent: Category;

  constructor(public id: string, public name: string, public icon: string, public type: CategoryType,
              public categoryId: number, public categories: [Category]) {

    // Set this category as the parent
    if (categories != null) {
      for (const child of categories) {
        child.parent = this;
      }
    }
  }

  public isLeaf() {
    return this.categories == null;
  }
}


@Injectable()
export class NavigationService {

  private root: Category;
  private categoriesDict = {};

  public static getCategoryId(params: [string]) {
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
      new Category('', '', '', CategoryType.Root, null, [
        new Category('all', 'All Categories', '', CategoryType.Category, 8, null),
        new Category('support', 'Support', 'help', CategoryType.Category, 1, [
          new Category('dataManagement', 'Data Management', 'settings_system_daydream', CategoryType.Subcategory, 1, null),
          new Category('quantitativeMethods', 'Quantitative Methods', 'equalizer', CategoryType.Subcategory, 9, null),
          new Category('qualitativeMethods', 'Qualitative Methods', 'insert_photo', CategoryType.Subcategory, 10, null)
        ]),
        new Category('training', 'Training', 'directions_bike', CategoryType.Category, 2, null),
        new Category('people', 'People', 'face', CategoryType.Category, 9, null),
        new Category('things', 'Things', 'apps', CategoryType.Category, 3, [
          new Category('instrumentsEquipment', 'Instruments & Equipment', 'camera_roll', CategoryType.Subcategory, 2, null),
          new Category('software', 'Software', 'shop', CategoryType.Subcategory, 3, null),
          new Category('hardware', 'Hardware', 'developer_board', CategoryType.Subcategory, 4, null),
          new Category('dataCollections', 'Data Sources & Special Collections', 'data_usage', CategoryType.Subcategory, 5, null),
          new Category('facilitiesSpaces', 'Facilities & Spaces', 'home', CategoryType.Subcategory, 6, null),
        ]),
        new Category('publications', 'Publications', 'book', CategoryType.Category, 4, null),
        new Category('research', 'Research Advice, Policies & Strategy', 'school', CategoryType.Category, 5, null),
        new Category('guides', 'Guides & Tool Chains', 'language', CategoryType.Category, 6, [
          new Category('quickGuides', 'Quick Guides', 'timelapse', CategoryType.Subcategory, 7, null),
          new Category('topicGuides', 'Topic Guides', 'history', CategoryType.Subcategory, 8, null)
        ]),
        new Category('collaboration', 'Collaboration', 'people', CategoryType.Category, 10, null),
        new Category('events', 'Events & News', 'event', CategoryType.Category, 7, null)
      ]);

    this.createCategoriesDict('', this.root.categories);
    this.createFriendlyNames('/browse', this.root.categories);
  }

  private createCategoriesDict(parentId: string, categories: [Category]) {
    for (const category of categories) {
      const childId = parentId + '/' + category.id;
      this.categoriesDict[childId] = category;

      if (!category.isLeaf()) {
        this.createCategoriesDict(childId, category.categories);
      }
    }
  }

  private createFriendlyNames(parentRoute: string, categories: [Category]) {
    for (const category of categories) {
      const childRoute = parentRoute + '/' + category.id;
      this.breadcrumbService.addFriendlyNameForRoute(childRoute, category.name);

      if (!category.isLeaf()) {
        this.createFriendlyNames(childRoute, category.categories);
      }
    }
  }

  public getCategory(categoryId: string) {
    if (categoryId === '/') {
      return this.root;
    }

    return this.categoriesDict[categoryId];
  }
}
