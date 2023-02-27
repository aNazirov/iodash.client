import { CInput, CTextarea, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: string;
  description: string;
  points: string;
  months: number;
  price: number;
  downloadsPerDay: number;
};

export const EditSubscriptionType: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { subscriptionType } = useAppSelector(
    (state) => state.subscriptionTypes
  );

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    return updateService(subscriptionType!.id, data, "subscription-type").then(
      () => {
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
      <div className="flex gap-3">
        <div className="w-full">
          <CInput
            name="title"
            title="Title"
            placeholder="Title"
            defaultValue={subscriptionType?.title}
            loading={!subscriptionType}
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
            defaultValue={subscriptionType?.description}
            loading={!subscriptionType}
            control={control}
            error={errors.description}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="points"
            title="Points"
            placeholder="Points"
            defaultValue={subscriptionType?.points}
            loading={!subscriptionType}
            control={control}
            error={errors.points}
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
            defaultValue={subscriptionType?.price}
            loading={!subscriptionType}
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
            defaultValue={subscriptionType?.downloadsPerDay}
            loading={!subscriptionType}
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
            placeholder="1"
            defaultValue={subscriptionType?.months}
            loading={!subscriptionType}
            min={0}
            max={12}
            control={control}
            error={errors["months"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
