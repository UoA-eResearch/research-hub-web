

export class Page<T> {
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;

  static fromObject<T>(src: Object, contentConverterFunction) {
    const obj = new Page<T>();

    obj.content = contentConverterFunction(src['content']);
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

  clear() {
    this.content.length = 0;
    this.last = false;
    this.totalPages = 0;
    this.totalElements = 0;
    this.first = true;
    this.numberOfElements = 0;
    this.size = 0;
    this.number = 0;
  }
}
