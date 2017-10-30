
export interface GetResultsListItem {
  getId(): number;
  getType(): string;
  getTitle (): string;
  getSubtitle (): string;
  getImage (): string;
  getRouterLink(): any[];
  getHref(): string;
}

export function getItemRouterLink(result: GetResultsListItem): any[] {
  const route = ['/']; // Makes an absolute change to the route
  route.push(result.getType());
  route.push(result.getId().toString());
  return route;
}
