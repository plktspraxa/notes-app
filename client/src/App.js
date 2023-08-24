import routes from "./routes";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "assets/theme";
import 'App.css';
import { token } from "shared/services/token";
import Login from "pages/login/Login";
import Register from "pages/login/Register";
import Logout from "pages/login/Logout";
import ProtectedRoute from "shared/services/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }

    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }

    return null;
  });

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />} >
              {getRoutes(routes)}
              <Route path="/" element={<Navigate to={"/notes"} />} />
            </Route>
            <Route path="*" element={<p>404 not found</p>} />
          </Routes>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
