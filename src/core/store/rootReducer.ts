import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { categoriesReducer } from "./category/category.slices";
import { globalReducer } from "./global/global.slices";
import { lessonsReducer } from "./lesson/lesson.slices";
import { subscriptionTypesReducer } from "./subscription-type/subscription-type.slices";
import { tagsReducer } from "./tag/tag.slices";
import { technologiesReducer } from "./technology/technology.slices";
import { usersReducer } from "./user/user.slices";

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
  global: globalReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  users: usersReducer,
  lessons: lessonsReducer,
  subscriptionTypes: subscriptionTypesReducer,
  technologies: technologiesReducer,
};

export const appReducer = combineReducers(State);

export const rootReducer: Reducer<
  CombinedState<StateFromReducersMapObject<typeof State>>,
  ActionFromReducersMapObject<typeof State>
> = (state, action) => {
  if (action.type === "global/logOut") {
    state = undefined;
  }

  return appReducer(state, action);
};
