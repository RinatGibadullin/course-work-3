import { BaseRepository } from "infrastructure/BaseRepository";

export interface IndexStoreOptions {
  stateSelector: (state: any) => any
  reducers?: any
  extraReducers?: any
  entitiesStore: any
  repository: any
  defaultLoadParams: any
}