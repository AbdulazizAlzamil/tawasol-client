import { Fragment } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const Private = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.users);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <Fragment>
          <Sidebar />
          <Component />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Private;
