import { createEntityAdapter, EntityState, SliceCaseReducers } from "@reduxjs/toolkit";
import { createSelectors } from "./create-selectors";
import { createEntitiesSlice } from "./create-slice";
import { EntitiesStoreOptions } from "./EntitiesStoreOptions";

export function createEntitiesStore<Entity>(name: string, options: EntitiesStoreOptions) {
  type CaseReducers = SliceCaseReducers<EntityState<any>>

  const entityAdapter = createEntityAdapter<Entity>();
  const slice = createEntitiesSlice<CaseReducers, Entity>(name, entityAdapter, options);
  const { entitiesSelectors, entitiesStateSelector } = createSelectors<Entity>(entityAdapter, options.stateSelector);
  const reducer = slice.reducer;
  const actions = slice.actions;

  return { 
    reducer,
    actions, 
    slice,
    entityAdapter,
    entitiesSelectors,
    entitiesStateSelector
  };
}