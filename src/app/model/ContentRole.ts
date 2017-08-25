// import {GetResultsListItem} from "./ResultsListItemInterface";
// import {Content} from "./Content";
// import {RoleType} from "./RoleType";
//
//
// export class ContentRole implements GetResultsListItem {
//
//   content: Content;
//   roleType: RoleType;
//
//   static fromObjects(objects: [Object]): Array<ContentRole> {
//     const items = new Array<ContentRole>();
//
//     if (objects !== undefined) {
//       for (const object of objects) {
//         items.push(ContentRole.fromObject(object));
//       }
//
//       items.sort((a: ContentRole, b: ContentRole) => {
//         if (a.getTitle() < b.getTitle()) {
//           return -1;
//         } else if (a.getTitle() > b.getTitle()) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//     }
//
//     return items;
//   }
//
//   static fromObject(object: Object): ContentRole {
//     const item = new ContentRole();
//
//     item.content = Content.fromObject(object['content']);
//     item.roleType = RoleType.fromObject(object['roleType']);
//
//     return item;
//   }
//
//   getId(): number {
//     return this.id;
//   }
//
//   getTitle(): string {
//     return this.content.name;
//   }
//
//   getSubtitle(): string {
//     return this.roleType.name;
//   }
//
//   getAvatarUrl(): string {
//     return '';
//   }
//
//   getRouterLink(): [any] {
//     return ['/contentDetails', this.content.id];
//   }
//
//   getHref(): string {
//     return undefined;
//   }
// }
