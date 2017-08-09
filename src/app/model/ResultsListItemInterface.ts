
// export interface ResultsListItem {
//   routePath: string;
//   id: number;
//   avatarUrl: string;
//   title: string;
//   subtitle: string;
// }

// export interface GetResultsListItem {
//   getResultsListItem (): ResultsListItem;
// }

export interface GetResultsListItem {
  getTitle (): string;
  getSubtitle (): string;
  getAvatarUrl (): string;
  getRoutePath (): string;
}


