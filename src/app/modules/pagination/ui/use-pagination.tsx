import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "app/modules/navigation/use-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import React, { useEffect, useCallback } from "react";
import Bar from "./components/pagination-bar";

export type UsePaginationOptions = {
  allowedQueryParams: string[],
  defaultParams?: any
}

const getPageInitialParams = (query: any, allowed: any, loadParams: any, defaultParams: any) => {
  const allowedParams = Object.keys(query).reduce((result: any, paramName) => {
    if (allowed.includes(paramName)) {
      result[paramName] = query[paramName];
    }
    return result;
  }, {});
  return { ...loadParams, ...allowedParams, ...defaultParams};
};

export function usePagination(indexStore: any, options: UsePaginationOptions) {
  const dispatch = useDispatch();

  const loadParams = useSelector(indexStore.selectors.indexLoadParamsSelector);
  const queryParams = useQuery();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    const initialLoadParams = getPageInitialParams(queryParams, options.allowedQueryParams, loadParams, options.defaultParams);
    dispatch(indexStore.actions.load(initialLoadParams));
  }, []);

  const perPage: number = useSelector(indexStore.selectors.indexPerPageSelector);
  const page: number = useSelector(indexStore.selectors.indexPageSelector);
  const total: number = useSelector(indexStore.selectors.indexTotalSelector);

  const onPageChange = useCallback((page: number) => {
    dispatch(indexStore.actions.changePage({ page, history, match }));
  }, []);

  const onPerPageChange = useCallback((perPage: number) => {
    dispatch(indexStore.actions.changePerPage({ perPage, history, match }));
  }, []);

  const sync = useCallback(() => {
    dispatch(indexStore.actions.sync());
  }, []);

  const PaginationBar = (total != 0 || total != null) ? (
    <Bar
      total={total}
      page={page}
      perPage={perPage}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange} />
  ) : null;

  return { PaginationBar, sync };

}