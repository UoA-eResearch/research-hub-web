import {Injectable} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";


class Category {

  constructor(public id: string, public name: string, public icon: string, public categories: [Category]) {

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
      new Category('', '', '', [
        new Category('all', 'All Categories', '', null),
        new Category('support', 'Support', 'help', [
          new Category('dataManagement', 'Data Management', '', null),
          new Category('quantitativeMethods', 'Quantitative Methods', '', null),
          new Category('qualitativeMethods', 'Qualitative Methods', '', null)
        ]),
        new Category('training', 'Training', 'directions_bike', null),
        new Category('people', 'People', 'face', null),
        new Category('things', 'Things', 'apps', [
          new Category('instrumentsEquipment', 'Instruments & Equipment', 'camera_roll', null),
          new Category('software', 'Software', 'shop', null),
          new Category('hardware', 'Hardware', 'developer_board', null),
          new Category('dataCollections', 'Data Sources & Special Collections', 'data_usage', null),
          new Category('facilitiesSpaces', 'Facilities & Spaces', 'home', null),
        ]),
        new Category('publications', 'Publications', 'book', null),
        new Category('research', 'Research Advice, Policies & Strategy', 'school', null),
        new Category('guides', 'Guides & Tool Chains', 'language', [
          new Category('quickGuides', 'Quick Guides', 'timelapse', null),
          new Category('topicGuides', 'Topic Guides', 'history', null)
        ]),
        new Category('collaboration', 'Collaboration', 'people', null),
        new Category('events', 'Events & News', 'event', null)
      ]);

    this.createCategoriesDict('', this.root.categories);
    this.createFriendlyNames('/results', this.root.categories);
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
