export interface Pagination<T> {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
  data: Array<T>;
}
