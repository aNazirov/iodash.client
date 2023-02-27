import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITechnology } from "core/interfaces";

interface IState {
  technologies: ITechnology[];
  technology: ITechnology | null;
  count: number;
}

const initialState: IState = {
  technologies: [],
  technology: null,
  count: 0,
};

export const { actions: technologiesAction, reducer: technologiesReducer } = createSlice({
  name: "technologies",
  initialState,
  reducers: {
    setMoreTechnologies: (state, action: PayloadAction<{ technologies: ITechnology[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setTechnologies: (
      state,
      action: PayloadAction<{ technologies: ITechnology[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setTechnology: (state, action: PayloadAction<{ technology: ITechnology | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
