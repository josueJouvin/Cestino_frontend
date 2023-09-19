import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import NewPassword from "./pages/NewPassword";
import ManageCestini from "./pages/ManageCestini";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import ExportPdf from "./pages/ExportPdf";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

import { AuthProvider } from "./context/AuthProvider";
import { CestinoProvider } from "./context/CestinoProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CestinoProvider>
          <Routes>
           
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/*" element={<NotFound/>}/>

            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ManageCestini />} />
              <Route path="canastas" element={<ManageCestini />} />
              <Route path="perfil" element={<EditProfile />} />
              <Route path="cambiar-password" element={<ChangePassword />} />
              <Route path="exportar-pdf" element={<ExportPdf/>}/>
            </Route>

          </Routes>
        </CestinoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
