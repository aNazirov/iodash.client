import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { PageHead } from "core/components/pages/head";
import { SceletonForPage } from "core/components/shared";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getOne, setLesson } from "core/store/lesson/lesson.thunks";
import { classNames } from "core/utils";
import { RoleType } from "core/utils/enums";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditLesson } from "./edit";

interface Props {}

export const ShowLesson: React.FC<Props> = () => {
  const { id } = useParams();
  const { lesson } = useAppSelector((state) => state.lessons);

  const [showInfo, setShowInfo] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];

  useEffect(() => {
    if (id) {
      dispatch(getOne(+id));
    } else if (!id) {
      navigate("/lessons");
    }

    return () => {
      dispatch(setLesson());
    };
  }, [id]);

  if (!lesson) {
    return <SceletonForPage />;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <PageHead
          title={lesson.title}
          operation={accessRoles}
          Edit={EditLesson}
        />

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div>
            <div className="flex justify-between items-center text-lg font-medium text-black">
              <div className="flex items-center gap-2 border-b-2 border-blue-600">
                General info{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </span>
              </div>
            </div>

            <div
              className={classNames(
                showInfo ? "block" : "hidden",
                "mt-3 bg-gray-50 shadow-sm p-4 rounded-md"
              )}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Categories
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {lesson.categories?.map((x) => x.title).join(", ") ||
                      "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Tags</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {lesson.tags?.map((x) => x.title).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Technologies
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {lesson.technologies?.map((x) => x.title).join(", ") ||
                      "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Price</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {lesson.price ?? 0}$
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="text-sm font-medium text-gray-500">
                    Description
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {lesson.description || "----"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
