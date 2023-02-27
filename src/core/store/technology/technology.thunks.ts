import { ITechnology } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { technologiesAction } from "./technology.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "technology").then((res) => {
      dispatch(setTechnologies(res.count, res.data));
    });
  };

export const setTechnologies =
  (count: number = 0, technologies: ITechnology[] = []) =>
  (dispatch: any) => {
    return dispatch(
      technologiesAction.setTechnologies({
        technologies,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "technology").then((tag) => {
    dispatch(setTechnology(tag));
  });
};

export const setTechnology =
  (technology: ITechnology | null = null) =>
  (dispatch: any) => {
    return dispatch(
      technologiesAction.setTechnology({
        technology,
      })
    );
  };
