
export interface GetResultsListItem {
  getId(): number;
  getType(): string;
  getTitle (): string;
  getSubtitle (): string;
  getImage (): string;
  getDefaultRouterLink(): [any];
  getHref(): string;
}


