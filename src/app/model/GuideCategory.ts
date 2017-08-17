
import {Content} from "./Content";

export class GuideCategory {
  id: number;
  name: string;
  displayOrder: number;
  summary: string;
  description: string;
  additionalInfo: string;
  icon: string;
  contentItems: Array<Content>;

  static fromObjects(objects: [Object]): Array<GuideCategory> {
    const items = new Array<GuideCategory>();

    if (objects !== undefined) {
      for (const object of objects) {
        items.push(GuideCategory.fromObject(object));
      }

      items.sort((a: GuideCategory, b: GuideCategory) => {
        if (a.displayOrder < b.displayOrder) {
          return -1;
        } else if (a.displayOrder > b.displayOrder) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return items;
  }

  static fromObject(object: Object): GuideCategory {
    const item = new GuideCategory();

    item.id = object['id'];
    item.name = object['name'];
    item.displayOrder = object['displayOrder'];
    item.summary = object['summary'];
    item.description = object['description'];
    item.additionalInfo = object['additionalInfo'];
    item.icon = object['icon'];
    item.contentItems = Content.fromObjects(object['contentItems']);

    return item;
  }
}
