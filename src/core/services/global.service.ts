import { api, fileApi } from "core/api";
import { IAutoComplete, ILogin } from "core/interfaces";
import { filter } from "core/utils";

export const loginService = (params: ILogin) => {
  params = filter(params);

  return api
    .post("/auth/login", params, undefined, {
      pending: "Please wait ...",
      success: "Authorized",
    })
    .then((res) => res.data);
};

export const getUserByToken = () => {
  return api.get("/user/token").then((res) => res.data);
};

export const autoComplite = (params: IAutoComplete) => {
  params = filter(params);

  return api
    .get("/global/autoComplete", {
      params,
    })
    .then((res) => res.data);
};

export const createService = (params: any, name: string) => {
  params = filter(params);

  return api
    .post(`/${name}`, params, undefined, {
      pending: "Creating ...",
      success: "Created",
    })
    .then((res) => res.data);
};

export const updateService = (id: number, params: any, name: string) => {
  params = filter(params);

  return api
    .patch(`/${name}/${id}`, params, undefined, {
      pending: "Updating ...",
      success: "Updated",
    })
    .then((res) => res.data);
};

export const removeService = (id: number, name: string) => {
  return api
    .delete(`/${name}/${id}`, undefined, {
      pending: "Deleting ...",
      success: "Deleted",
    })
    .then((res) => res.data);
};

export const getOneService = (id: number, name: string) => {
  return api.get(`/${name}/${id}`).then((res) => res.data);
};

export const getAllService = (skip: number, params: any, name: string) => {
  params = filter(params);

  return api
    .get(`/${name}`, {
      params: {
        skip,
        params,
      },
    })
    .then((res) => res.data);
};

export const filesUpload = (
  formData: any,
  setProgress?: React.Dispatch<React.SetStateAction<number>>
) => {
  return fileApi
    .post(
      "/file/upload-many",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
        ...(setProgress
          ? {
              onUploadProgress(progressEvent) {
                const progress = parseInt(
                  Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  ).toString()
                );

                setProgress((prev) => (prev !== progress ? progress : prev));
              },
            }
          : {}),
      },
      {
        pending: "Загрузка файлов ...",
        success: "Файлы загружены",
      }
    )
    .then((res) => res.data);
};

export const fileDelete = (id: number) => {
  return fileApi
    .delete(`/file/${id}`, undefined, {
      pending: "Удаление файла ...",
      success: "Файл удален",
    })
    .then((res) => res.data);
};
