import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { CLink, PrivateComponent, SlideOvers } from "core/components/shared";
import { MDelete } from "core/components/shared/MDelete";
import { removeService } from "core/services/global.service";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll, setLesson } from "core/store/lesson/lesson.thunks";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { classNames } from "core/utils/index";
import { CreateLesson } from "pages/lesson/create";
import { EditLesson } from "pages/lesson/edit";
import { useContext, useState } from "react";

interface Props {
  path: string[];
}

export const LessonTbody: React.FC<Props> = ({ path }) => {
  const { lesson, lessons } = useAppSelector((state) => state.lessons);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(lesson!.id, "lesson").then(() => {
      dispatch(getAll());
      dispatch(setLesson());
    });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setLesson());
  };

  return (
    <>
      <tbody>
        {lessons.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="relative px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              <CLink
                to={`/lessons/show/${x.id}`}
                className="absolute top-0 w-full h-full cursor-pointer"
                state={{}}
              />
              {x.title}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.categories?.map((x) => x.title).join(", ")}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.tags?.map((x) => x.title).join(", ")}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.technologies?.map((x) => x.title).join(", ")}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.price}
            </td>
            <td className="flex justify-end px-6 py-3.5 whitespace-nowrap text-right text-sm font-medium space-x-4">
              <PrivateComponent operation={accessRoles}>
                {access && (
                  <>
                    <PrivateComponent operation={accessRoles}>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(true);
                          setMode(SlideoverModes.edit);
                          dispatch(setLesson(x));
                        }}
                        className="text-gray-600 hover:text-blue-900 cursor-pointer"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </span>
                    </PrivateComponent>
                    <PrivateComponent operation={accessRoles}>
                      {" "}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setDOpen(true);
                          dispatch(setLesson(x));
                        }}
                        className="text-gray-600 hover:text-blue-900 cursor-pointer"
                      >
                        <ArchiveIcon className="h-4 w-4" />
                      </span>
                    </PrivateComponent>
                  </>
                )}
              </PrivateComponent>
            </td>
          </tr>
        ))}
      </tbody>

      <PrivateComponent operation={accessRoles}>
        {lesson && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: lesson.id, name: lesson.title }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={lesson?.title || "Item"}
            close={close}
            Edit={EditLesson}
            Create={CreateLesson}
          />
        )}
      </PrivateComponent>
    </>
  );
};
