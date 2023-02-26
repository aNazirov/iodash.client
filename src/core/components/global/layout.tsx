import Header from "core/components/global/header";
import Sidebar from "core/components/global/sidebar";
import { PrivateRoute } from "core/components/shared";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { Categories } from "pages/category";
import { Lessons } from "pages/lesson";
import { ShowLesson } from "pages/lesson/show";
import { SubscriptionTypes } from "pages/subscription-type";
import { Tags } from "pages/tag";
import { Users } from "pages/user";
import { ShowUser } from "pages/user/show";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SlideoverModes>(SlideoverModes.none);

  return (
    <>
      <AppContext.Provider value={{ open, setOpen, mode, setMode }}>
        <div className="h-full flex flex-col">
          {/* Top nav*/}
          <Header />
          {/* Bottom section */}
          <div className="min-h-0 flex-1 flex overflow-hidden">
            {/* Narrow sidebar*/}
            <Sidebar />

            {/* Main area */}
            <main className="p-3 min-w-0 flex-1 border-t border-gray-200 lg:flex">
              <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
              >
                <Routes>
                  <Route
                    path="/subscription-type"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <SubscriptionTypes />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/tags"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Tags />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/categories"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Categories />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Users />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users/show/:id"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <ShowUser />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/lessons"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Lessons />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/lessons/show/:id"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <ShowLesson />
                      </PrivateRoute>
                    }
                  />

                  <Route path="/*" element={<Navigate to="/lessons" />} />
                </Routes>
              </section>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
};
