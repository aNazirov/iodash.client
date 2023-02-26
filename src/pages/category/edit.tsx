import { CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services";
import { getAll } from "core/store/category/category.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
  show: string;
  position: number;
};

export const EditCategory: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { category } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return updateService(
      category!.id,
      { ...data, show: JSON.parse(data["show"]) },
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
            defaultValue={category?.title}
            loading={!category}
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
            placeholder="Position"
            type="number"
            defaultValue={category?.position}
            loading={!category}
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
            defaultValue={category?.show}
            defaultChecked={category?.show}
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
