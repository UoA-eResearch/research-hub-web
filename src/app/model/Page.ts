
export interface Page<T> {
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}
