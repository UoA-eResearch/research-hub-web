
export interface ResultsListItem {
  avatarUrl: string;
  title: string;
  subtitle: string;
}

export interface GetResultsListItem {
  getResultsListItem (): ResultsListItem;
}

export const getResultsListItems = (items: Array<GetResultsListItem>) => {
  const results = new Array<ResultsListItem>();

  for (const item of items) {
    results.push(item.getResultsListItem());
  }

  return results;
};
