import { Slice, Reducer, CaseReducerActions, CaseReducers, EntityAdapter, SliceCaseReducers, EntitySelectors } from "@reduxjs/toolkit";

export interface EntitiesStore<Entity> {
  reducer: Reducer<EntitiesStore<Entity>>
  actions: CaseReducerActions<SliceCaseReducers<EntitiesStore<Entity>>>,
  slice: Slice<EntitiesStore<Entity>, SliceCaseReducers<EntitiesStore<Entity>>, string>,
  entityAdapter: EntityAdapter<Entity>,
  entitiesSelectors: EntitySelectors<Entity, any>,
  entitiesStateSelector: (state: any) => any
}