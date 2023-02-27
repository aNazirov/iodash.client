import { CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/tag/tag.thunks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
};

export const CreateTag: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(data, "tag").then(({ title }) => {
      dispatch(getAll());
      close();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CInput
            name="title"
            title="Title"
            placeholder="Title"
            control={control}
            error={errors.title}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
