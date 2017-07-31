

export class Page {
  content: [any];
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;

  static fromObject(src: Object) {
    const obj = new Page();

    obj.content = src['content'];
    obj.last = src['last'];
    obj.totalPages = src['totalPages'];
    obj.totalElements = src['totalElements'];
    // obj.sort = src['sort'];
    obj.first = src['first'];
    obj.numberOfElements = src['numberOfElements'];
    obj.size = src['size'];
    obj.number = src['number'];

    return obj;
  }
}
