import { CInput, CTextarea, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
  description: string;
  months: number;
  price: number;
  downloadsPerDay: number;
};

export const CreateSubscriptionType: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(data, "subscription-type").then(() => {
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
      <div className="flex gap-3">
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

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="description"
            title="Description"
            placeholder="Description"
            control={control}
            error={errors.description}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="price"
            title="Price"
            type="number"
            placeholder="0.00"
            step={0.01}
            control={control}
            error={errors["price"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="downloadsPerDay"
            title="Downloads per day"
            type="number"
            placeholder="0"
            step={1}
            control={control}
            error={errors["downloadsPerDay"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="months"
            title="Months"
            type="number"
            min={0}
            max={12}
            placeholder="1"
            control={control}
            error={errors["months"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
