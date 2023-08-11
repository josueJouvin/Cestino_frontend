import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import NewPassword from "./pages/NewPassword";
import ManageProducts from "./pages/ManageProducts";

import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ManageProducts />} />
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
