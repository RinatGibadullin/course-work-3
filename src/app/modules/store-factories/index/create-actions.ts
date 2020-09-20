import { createAsyncThunk } from "@reduxjs/toolkit";
import { ListResponse } from "app/modules/core/interfaces/ListResponse";
import { IndexStoreOptions } from "./IndexStoreOptions";
import { canLoadNextPage } from "app/modules/pagination/loadPagePolicy";

const changeUrlParams = (params: any, history: any, match: any) => {
  const state = {
    pathname: match.url,
    search: "?" + new URLSearchParams(params).toString()
  };
  history.replace(state);
};

export function createIndexActions<Entity, RootState>(PREFIX: string, options: IndexStoreOptions, selectors: any) {

  const loadList = (params: any, thunkAPI: any) => {
    return options.repository.load(params)
      .then((list: ListResponse<Entity>) => {
        thunkAPI.dispatch(options.entitiesStore.actions.upsertMany(list))
        return list;
      })
      .then((list: ListResponse<Entity>) => ({ list, params }));
  }

  const load = createAsyncThunk<ListResponse<Entity>, any>(
    `${PREFIX}/load`,
    (payload = options.defaultLoadParams, thunkAPI) => {
      return loadList(payload, thunkAPI);
    }
  );

  const refresh = createAsyncThunk<ListResponse<Entity>, any>(
    `${PREFIX}/refresh`,
    (payload = options.defaultLoadParams, thunkAPI) => {
      return loadList(payload, thunkAPI);
    }
  );

  const sync = createAsyncThunk<ListResponse<Entity>, any>(
    `${PREFIX}/sync`,
    (_, thunkAPI) => {
      const loadParams = selectors.indexLoadParamsSelector(thunkAPI.getState() as any);
      return loadList(loadParams, thunkAPI);
    }
  );
  
  const changePage = createAsyncThunk<ListResponse<Entity>, number>(
    `${PREFIX}/changePage`,
    (params: any, thunkAPI) => {
      const { page, history, match } = params;
      const loadParams = selectors.indexLoadParamsSelector(thunkAPI.getState() as any);
      const requestParams = { ...loadParams, page };
      changeUrlParams(requestParams, history, match);
      return loadList(requestParams, thunkAPI);
    }
  );

  const changePerPage = createAsyncThunk<ListResponse<Entity>, number>(
    `${PREFIX}/changePerPage`,
    (params: any, thunkAPI) => {
      const { perPage, history, match } = params;
      const loadParams = selectors.indexLoadParamsSelector(thunkAPI.getState() as any);
      const requestParams = { ...loadParams, per_page: perPage };
      changeUrlParams(requestParams, history, match);
      return loadList(requestParams, thunkAPI);
    }
  );
  
  const loadNextPage = createAsyncThunk<ListResponse<Entity>>(
    `${PREFIX}/loadNextPage`,
    (params: any, thunkAPI) => {
      const { history, match } = params;
      const state = thunkAPI.getState() as any
      const loadParams = selectors.indexLoadParamsSelector(state);
      const total = selectors.indexTotalSelector(state);
      if (canLoadNextPage(loadParams, total)) {
        const requestParams = { ...loadParams, page: Number(loadParams.page) + 1 };
        changeUrlParams(requestParams, history, match);
        return loadList(requestParams, thunkAPI);
      }
    }
  );
  
  const loadPrevPage = createAsyncThunk<ListResponse<Entity>>(
    `${PREFIX}/loadPrevPage`,
    (params: any, thunkAPI) => {
      const { history, match } = params;
      const loadParams = selectors.indexLoadParamsSelector(thunkAPI.getState() as any);
      const requestParams = { ...loadParams, page: Number(loadParams.page) - 1 };
      changeUrlParams(requestParams, history, match);
      return loadList(requestParams, thunkAPI);
    }
  );

  return { 
    load, 
    refresh, 
    changePage, 
    changePerPage, 
    loadNextPage, 
    loadPrevPage,
    sync
  }
}