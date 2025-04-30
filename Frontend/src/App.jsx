import React, { Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import { routes } from "./routes";

const renderRoutes = (routes = []) => (
  <Routes>
    {routes.map((route, i) => {
      const Guard = route.guard || Fragment;
      const Layout = route.layout || Fragment;
      const Element = route.element;

      return (
        <Route
          key={i}
          path={route.path}
          element={
            <Guard>
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Suspense fallback={<Loading />}>
                    <Element />
                  </Suspense>
                )}
              </Layout>
            </Guard>
          }
        />
      );
    })}
  </Routes>
);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
      <Toaster />
    </>
  );
}

export default App;
