import { ICategory } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { categoriesAction } from "./category.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "category").then((res) => {
      dispatch(setCategories(res.count, res.data));
    });
  };

export const setCategories =
  (count: number = 0, categories: ICategory[] = []) =>
  (dispatch: any) => {
    return dispatch(
      categoriesAction.setCategories({
        categories,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "category").then((category) => {
    dispatch(setCategory(category));
  });
};

export const setCategory =
  (category: ICategory | null = null) =>
  (dispatch: any) => {
    return dispatch(
      categoriesAction.setCategory({
        category,
      })
    );
  };
