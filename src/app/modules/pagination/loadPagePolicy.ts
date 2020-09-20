import { PaginationParams } from "./PaginationParams";

export const canLoadNextPage = (params: PaginationParams, total: number) => {
  const loaded = Number(params.page) * Number(params.per_page);
  return total > loaded;
};

export const canLoadPrevPage = (params: PaginationParams, total: number) => {
  return params.page > 1;
};