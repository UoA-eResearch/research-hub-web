
export interface GetResultsListItem {
  getId(): number;
  getTitle (): string;
  getSubtitle (): string;
  getAvatarUrl (): string;
  getDefaultRouterLink(): [any];
  getHref(): string;
}


