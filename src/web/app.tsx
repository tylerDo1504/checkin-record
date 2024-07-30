import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { AuthProvider } from "./hooks";
// Routes
import { protectedRoutes } from "./routes";
// Pages
import LoginPage from "./pages/login";

export function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              {protectedRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<ProtectedRoute element={route.element} />}
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
