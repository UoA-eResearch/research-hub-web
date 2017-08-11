
export class RoleType {
  id: number;
  name: string;
  description: string;

  static fromObject(object: Object): RoleType {
    const item = new RoleType();

    item.id = object['id'];
    item.name = object['name'];
    item.description = object['description'];

    return item;
  }
}
