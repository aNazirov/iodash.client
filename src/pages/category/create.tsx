import { CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { getAll } from "core/store/category/category.thunks";
import { useAppDispatch } from "core/store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
  show: string;
  position: number;
};

export const CreateCategory: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(
      { ...data, show: JSON.parse(data["show"] ?? "false") },
      "category"
    ).then(() => {
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
      <div className="flex mt-3 gap-3">
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

      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CInput
            name="position"
            title="Position"
            type="number"
            placeholder="Position"
            control={control}
            error={errors.position}
          />
        </div>
      </div>

      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CInput
            name="show"
            title="Show in menu"
            type="checkbox"
            className=" "
            control={control}
            error={errors.show}
            required={false}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
