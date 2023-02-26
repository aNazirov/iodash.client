import { ITag } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { tagsAction } from "./tag.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "tag").then((res) => {
      dispatch(setTags(res.count, res.data));
    });
  };

export const setTags =
  (count: number = 0, tags: ITag[] = []) =>
  (dispatch: any) => {
    return dispatch(
      tagsAction.setTags({
        tags,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "tag").then((tag) => {
    dispatch(setTag(tag));
  });
};

export const setTag =
  (tag: ITag | null = null) =>
  (dispatch: any) => {
    return dispatch(
      tagsAction.setTag({
        tag,
      })
    );
  };
