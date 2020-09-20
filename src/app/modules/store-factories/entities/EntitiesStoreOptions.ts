export interface EntitiesStoreOptions {
  stateSelector: (state: any) => any
  reducers?: any
  extraReducers?: any
}