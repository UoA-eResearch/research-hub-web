
export interface GetResultsListItem {
  getId(): number;
  getTitle (): string;
  getSubtitle (): string;
  getImage (): string;
  getDefaultRouterLink(): [any];
  getHref(): string;
}


