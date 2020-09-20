import { createIndexSelectors } from "./create-selectors";
import { IndexStoreOptions } from "./IndexStoreOptions";
import { createIndexActions } from "./create-actions";
import { createIndexSlice } from "./create-slice";

export function createIndexStore<Entity, RootState>(name: string, options: IndexStoreOptions) {

  // type IndexStoreResult = {
  //   reducer: Reducer<RootState>
  // }

  const selectors = createIndexSelectors<RootState>(options);
  const actions = createIndexActions<Entity, RootState>(name, options, selectors);
  const { reducer, slice } = createIndexSlice<Entity>(name, actions, options);
  const resultActions = {...actions, ...slice.actions}

  return { reducer, slice, actions: resultActions, selectors }
}