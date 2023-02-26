import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/user/user.thunks";
import { RoleType } from "core/utils/enums";
import moment from "moment";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const EditUser: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { user } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();
  const roles = [{ id: RoleType.User, title: "User" }];

  const submit = async (data: any) => {
    return updateService(user!.id, { ...data }, "user").then(({ name }) => {
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
      <div className="w-full">
        <CInput
          name="name"
          title="Name"
          placeholder="Name"
          defaultValue={user?.name}
          control={control}
          error={errors["name"]}
        />
      </div>

      <div className="mt-3 w-full">
        <CCombobox
          name="roleId"
          title="Role"
          items={roles}
          defaultValue={user?.role?.id}
          control={control}
          error={errors["roleId"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="balance"
            title="Balance"
            placeholder="Balance"
            defaultValue={user?.balance}
            required={false}
            type="number"
            control={control}
            error={errors["balance"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="activeBefore"
            title="Active before"
            placeholder="yyyy-mm-dd"
            required={false}
            defaultValue={moment(user?.activeBefore).format("YYYY-MM-DD")}
            type="date"
            control={control}
            error={errors["activeBefore"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="email"
            title="Email"
            placeholder="Email"
            defaultValue={user?.contact?.email}
            control={control}
            error={errors["email"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="password"
            title="Password"
            type="password"
            required={false}
            control={control}
            error={errors["password"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
