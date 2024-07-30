import { Navigate, useLocation } from "react-router-dom";
import { useAuthSelectorStore } from "../../hooks";

interface IProtectedRoute {
  element?: React.ReactNode;
}

export function ProtectedRoute(props: IProtectedRoute) {
  const { element } = props;
  const location = useLocation();

  const isAuthenticated = useAuthSelectorStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}
