import {
  CInput,
  CTextarea,
  Photo,
  SlideoversFoot,
  Spinner,
} from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { fileDelete, filesUpload, updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll, setLesson } from "core/store/lesson/lesson.thunks";
import { formatData, imageUpload } from "core/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
  description: string;
  categories: number[];
  tags: number[];
  price: number;
};

export const EditLesson: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { lesson } = useAppSelector((state) => state.lessons);
  const { pathname } = useLocation();

  const [poster, setPoster] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filePreview, setFilePreview] = useState(
    lesson?.file ? lesson.file?.name : ""
  );

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    let posterId = undefined;
    let fileId = undefined;

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
    }

    if (file) {
      fileId = (
        await filesUpload(formatData({ files: [file] }), setProgress)
      )[0].id;
    }

    return updateService(
      lesson!.id,
      {
        ...data,
        posterId,
        fileId,
      },
      "lesson"
    ).then((lesson) => {
      if (pathname === "/lessons") {
        dispatch(getAll());
      } else {
        dispatch(setLesson(lesson));
      }
      close();
    });
  };

  const deleteFile = (id: number) => {
    setLoading(true);
    return fileDelete(id).then(() => {
      setLoading(false);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="flex gap-3 justify-between">
        <div className="mt-1">
          <Photo
            title="Poster"
            setFile={setPoster}
            previewId={lesson?.poster?.id}
            previewUrl={lesson?.poster?.url}
            previewClassName="h-36"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CInput
            name="title"
            title="Title"
            placeholder="Title"
            defaultValue={lesson?.title}
            control={control}
            error={errors["title"]}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="description"
            title="Description"
            placeholder="Description"
            defaultValue={lesson?.description}
            control={control}
            error={errors.description}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="categories"
            required={false}
            title="Categories"
            placeholder="Categories"
            index="categories"
            defaultValue={lesson?.categories.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            control={control}
            error={errors["categories"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="tags"
            required={false}
            title="Tags"
            placeholder="Tags"
            index="tags"
            defaultValue={lesson?.tags.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            control={control}
            error={errors["tags"]}
          />
        </div>
      </div>

      <div className="mt-3">
        {filePreview ? (
          <p>{filePreview}</p>
        ) : (
          <div className="block text-sm font-medium text-gray-700">File</div>
        )}

        <div className="flex gap-3 mt-3">
          <label
            htmlFor="upload-file"
            className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload
          </label>
          <button
            type="button"
            className=" bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setFilePreview("");
              setFile(null);
              lesson?.file && deleteFile(lesson?.file.id);
            }}
            disabled={loading}
          >
            Delete
          </button>
          <input
            id="upload-file"
            type="file"
            accept="file/*"
            className="w-0"
            disabled={!!filePreview}
            onChange={imageUpload(setFilePreview, setFile)}
          />
          {isSubmitting && !!file && <Spinner size={8} progress={progress} />}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="price"
            control={control}
            title="Price"
            defaultValue={lesson?.price}
            type="number"
            error={errors["price"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
