import { cloneElement, FC, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "@/components/shared/loader/loader";
import { routesList } from "@/navigation";
import routes from "@/navigation/routes";

const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routesList.map((route, i) => cloneElement(route, { key: i }))}
        <Route path="*" element={<Navigate replace to={routes.NOT_FOUND} />} />
      </Routes>
    </Suspense>
  );
};

export default App;
