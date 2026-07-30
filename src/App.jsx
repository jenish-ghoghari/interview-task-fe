import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import {
  Route,
  Routes
} from "react-router-dom";


import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogHome from "./pages/BlogHome";


const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      {/* Common Layout */}
      
       
       <Route
          path="/"
          element={
              <BlogHome />
          }
        />

      
      <Route element={<Navbar />}>
        {/* Admin */}
        <Route
          path="admin-dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/user"
          element={
            <ProtectedRoute role="Viewer">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>

  )

}


export default App;
