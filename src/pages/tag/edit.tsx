import { CInput, Photo, SlideoversFoot } from "core/components/shared";
import { filesUpload, updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/tag/tag.thunks";
import { formatData } from "core/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
};

export const EditTag: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { tag } = useAppSelector((state) => state.tags);

  const [icon, setIcon] = useState<null | File>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    let iconId = undefined;

    if (icon) {
      iconId = (await filesUpload(formatData({ files: [icon] })))[0].id;
    }

    return updateService(tag!.id, { ...data, iconId }, "tag").then(
      ({ title }) => {
        dispatch(getAll());
        close();
      }
    );
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
            setFile={setIcon}
            previewId={tag?.icon?.id}
            previewUrl={tag?.icon?.url}
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
            defaultValue={tag?.title}
            loading={!tag}
            control={control}
            error={errors.title}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};