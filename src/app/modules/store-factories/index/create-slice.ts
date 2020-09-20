import { createSlice, SerializedError, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { IndexStoreOptions } from "./IndexStoreOptions";

export function createIndexSlice<Entity>(name: string, Actions: any, options: IndexStoreOptions) {

  type State = { /*  todo common generic type */ } & {
    ids: (number | string)[]
    checkedIds: (number | string)[]
    isLoading: boolean
    isRefreshing: boolean
    loadParams: any
    loadError: SerializedError
    meta: { total?: number }
  }

  const onSuccessLoad = (state: any, action: any) => {
    const { list, params } = action.payload;
    state.ids = list.map((item: Entity) => (item as any).id);
    state.meta = list.meta;
    state.loadParams = params;
    state.isLoading = false;
    state.isRefreshing = false;
  };

  type Reducers = { /*  todo common generic type */ } & {
    appendEntity: (state: State, action: PayloadAction<any>) => void
    prependEntity: (state: State, action: PayloadAction<any>) => void
    removeEntityById: (state: State, action: PayloadAction<any>) => void
    appendCheckedId: (state: State, action: PayloadAction<any>) => void
    removeCheckedId: (state: State, action: PayloadAction<any>) => void
    appendAllCheckedIds: (state: State, action: PayloadAction<any>) => void
    removeAllCheckedIds: (state: State, action: PayloadAction<any>) => void
  }

  const initialState: State = {
    ids: [],
    checkedIds: [],
    isLoading: false,
    isRefreshing: false,
    loadParams: options.defaultLoadParams,
    loadError: null,
    meta: null,
  };

  const slice = createSlice<State, Reducers>({
    name: name,
    initialState,
    reducers: {
      appendEntity: (state, action) => {
        state.ids.push(action.payload.id);
      },
      prependEntity: (state, action) => {
        state.ids.unshift(action.payload.id);
      },
      removeEntityById: (state, action) => {
        const index = state.ids.indexOf(action.payload);
        if (index > -1) {
          state.ids.splice(index, 1);
        }
      },
      appendAllCheckedIds: (state) => {
        state.checkedIds = state.ids
      },
      removeAllCheckedIds: (state) => {
        state.checkedIds = []
      },
      appendCheckedId: (state, action) => {
        state.checkedIds.push(action.payload);
      },
      removeCheckedId: (state, action) => {
        const index = state.checkedIds.indexOf(action.payload);
        if (index > -1) {
          state.checkedIds.splice(index, 1);
        }
      },
    },
    extraReducers: (builder) => {
      // Load
      builder.addCase(Actions.load.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(Actions.load.fulfilled, onSuccessLoad);
      builder.addCase(Actions.load.rejected, (state, { error }) => {
        state.isLoading = false;
        state.loadError = error;
      });

      // Refresh
      builder.addCase(Actions.refresh.pending, (state, action) => {
        state.isRefreshing = true;
      });
      builder.addCase(Actions.refresh.fulfilled, onSuccessLoad);
      builder.addCase(Actions.refresh.rejected, (state, { error }) => {
        state.isRefreshing = false;
        state.loadError = error;
      });

      // Change page
      builder.addCase(Actions.changePage.pending, (state, action) => {
        state.isLoading = true;
        // state.loadParams.page = action.meta.arg.page;
      });
      builder.addCase(Actions.changePage.fulfilled, onSuccessLoad);
      builder.addCase(Actions.changePage.rejected, (state, { error }) => {
        state.isLoading = false;
        state.loadError = error;
      });

      // Change per page
      builder.addCase(Actions.changePerPage.pending, (state, action) => {
        state.isLoading = true;
        // state.loadParams.per_page = action.meta.arg.perPage;
      });
      builder.addCase(Actions.changePerPage.fulfilled, onSuccessLoad);
      builder.addCase(Actions.changePerPage.rejected, (state, { error }) => {
        state.isLoading = false;
        state.loadError = error;
      });

      // Sync
      builder.addCase(Actions.sync.pending, (state, action) => {
        state.isLoading = true;
        // state.loadParams.per_page = action.meta.arg.perPage;
      });
      builder.addCase(Actions.sync.fulfilled, onSuccessLoad);
      builder.addCase(Actions.sync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.loadError = error;
      });
    },
  });

  const reducer = slice.reducer;

  return { reducer, slice };
}