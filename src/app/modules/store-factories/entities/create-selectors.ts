import { EntityAdapter } from "@reduxjs/toolkit";

export function createSelectors<Entity>(adapter: EntityAdapter<Entity>, stateSelector: (state: any) => any) {
  const entitiesStateSelector = (state: any) => stateSelector(state);
  const entitiesSelectors = adapter.getSelectors(entitiesStateSelector);
  
  return {
    entitiesStateSelector,
    entitiesSelectors
  }
};