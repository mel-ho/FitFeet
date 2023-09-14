import React, { useState } from "react";
import UserContext from "./components/context/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Register from "./components/Login/Register";
import UserDisplay from "./components/Users/UserDisplay";
import RetailerDisplay from "./components/Retailers/RetailerDisplay";
import AdminDisplay from "./components/Admin/AdminDisplay";

import "./App.css";
import UserShoeAdd from "./components/Users/UserShoeAdd";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isRetailer, setIsRetailer] = useState(false);
  const [retailerId, setRetailerId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userId,
          setUserId,
          userEmail,
          setUserEmail,
          isActive,
          setIsActive,
          isRetailer,
          setIsRetailer,
          retailerId,
          setRetailerId,
          isAdmin,
          setIsAdmin,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserDisplay />} />
            <Route path="/retailer" element={<RetailerDisplay />} />
            <Route path="/admin" element={<AdminDisplay />} />
            <Route path="/addfeet" element={<UserShoeAdd />} />
            <Route path="/addshoe" element={<UserShoeAdd />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
