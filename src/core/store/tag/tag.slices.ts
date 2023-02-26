import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITag } from "core/interfaces";

interface IState {
  tags: ITag[];
  tag: ITag | null;
  count: number;
}

const initialState: IState = {
  tags: [],
  tag: null,
  count: 0,
};

export const { actions: tagsAction, reducer: tagsReducer } = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setMoreTags: (state, action: PayloadAction<{ tags: ITag[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setTags: (
      state,
      action: PayloadAction<{ tags: ITag[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setTag: (state, action: PayloadAction<{ tag: ITag | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
