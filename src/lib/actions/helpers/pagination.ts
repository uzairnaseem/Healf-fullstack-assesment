import { PER_PAGE_LIMIT } from '@/lib/constants';
import { Pagination } from '@/lib/actions/types/pagination';

/**
 * Will paginate the data
 * @template T - Type of data to paginate
 * @param data - Data to paginate
 * @param page - Page number
 * @param limit - Limit of items per page
 * @returns Paginated data
 */
export function willPaginate<T>(
  data: T[],
  page: number = 1,
  limit: number = PER_PAGE_LIMIT
): Pagination<T> {
  const paginatedData = data.slice((page - 1) * limit, page * limit);
  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / limit);
  const hasMore = page * limit < totalCount;

  return { data: paginatedData, totalCount, totalPages, page, limit, hasMore };
}
