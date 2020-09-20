import { EntityState, SliceCaseReducers, createSlice, EntityAdapter } from "@reduxjs/toolkit";
import { EntitiesStoreOptions } from "./EntitiesStoreOptions";

export function createEntitiesSlice<CReducers extends SliceCaseReducers<EntityState<Entity>>, Entity>(name: string, entityAdapter: EntityAdapter<Entity>, options: EntitiesStoreOptions) {
  return createSlice<EntityState<Entity>, CReducers>({
    name,
    initialState: entityAdapter.getInitialState(),
    reducers: {
      addOne: entityAdapter.addOne,
      addMany: entityAdapter.addMany,
      upsertMany: entityAdapter.upsertMany,
      upsertOne: entityAdapter.upsertOne,
      updateOne: entityAdapter.updateOne,
      updateMany: entityAdapter.updateMany,
      removeOne: entityAdapter.removeOne,
      ...options.reducers
    },
    extraReducers: options.extraReducers
  });
}