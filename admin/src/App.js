import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import Department from "./pages/department/department";
import Category from "./pages/category/Category";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="employee">
              <Route index element={<ProtectedRoute><List /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
            </Route>
            <Route path="departments">
              <Route index element={<ProtectedRoute><Department /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New Department" /></ProtectedRoute>}
              />
            </Route>
            <Route path="category">
              <Route index element={<ProtectedRoute><Category /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New Category" /></ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
