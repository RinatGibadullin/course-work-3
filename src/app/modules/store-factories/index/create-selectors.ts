import { createSelector } from "@reduxjs/toolkit";
import { IndexStoreOptions } from "./IndexStoreOptions";

export function createIndexSelectors<RootState>(options: IndexStoreOptions) {
  const indexStateSelector = (state: RootState) => options.stateSelector(state);

  const indexIdsSelector = createSelector(
    indexStateSelector,
   (state) => state.ids
  )

  const indexCheckedIdsSelector = createSelector(
    indexStateSelector,
   (state) => state.checkedIds
  )
  
  const indexSelector = createSelector(
    indexIdsSelector,
    options.entitiesStore.entitiesSelectors.selectEntities,
    (pollsIds, dictionary) => pollsIds && pollsIds.map((id: any) => (dictionary as any)[id])
  );
  
  const indexLoadParamsSelector = createSelector(
    indexStateSelector,
    state => state.loadParams
  )
  
  const indexMetaSelector = createSelector(
    indexStateSelector,
    state => state.meta || {}
  )
  
  const indexTotalSelector = createSelector(
    indexMetaSelector,
    state => state?.total
  )

  const indexPageSelector = createSelector(
    indexLoadParamsSelector,
    state => state?.page || options.defaultLoadParams?.page
  )

  const indexPerPageSelector = createSelector(
    indexLoadParamsSelector,
    state => state?.per_page || options.defaultLoadParams?.per_page
  )

  const indexIsLoadingSelector = createSelector(
    indexStateSelector,
    state => state.isLoading
  )

  const indexIsRefreshingSelector = createSelector(
    indexStateSelector,
    state => state.isRefreshing
  )

  return {
    indexStateSelector,
    indexIdsSelector,
    indexCheckedIdsSelector,
    indexSelector,
    indexLoadParamsSelector,
    indexMetaSelector,
    indexTotalSelector,
    indexPageSelector,
    indexPerPageSelector,
    indexIsLoadingSelector,
    indexIsRefreshingSelector
  }
}