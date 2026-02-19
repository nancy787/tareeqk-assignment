import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import RequestForm from "./pages/RequestForm";
import RequestList from "./pages/RequestList";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("user_type")
  );

  return (
    <BrowserRouter>

{isLoggedIn && (
  <nav className="navbar">
    <div className="nav-left">
      🚗 TowApp
    </div>

    <div className="nav-right">

      {role === "customer" && (
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Create Request
        </NavLink>
      )}

      <NavLink
        to="/requests"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        View Requests
      </NavLink>

      <NavLink
        to="/logout"
        className="nav-link"
      >
        Logout
      </NavLink>

    </div>
  </nav>
)}

      <Routes>

        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/" />
              : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
          }
        />

        <Route
          path="/logout"
          element={
            <Logout setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
          }
        />

        <Route
          path="/"
          element={
            isLoggedIn
              ? role === "customer"
                  ? <RequestForm />
                  : <RequestList />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/create"
          element={
            isLoggedIn && role === "customer"
              ? <RequestForm />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/requests"
          element={
            isLoggedIn
              ? <RequestList />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
