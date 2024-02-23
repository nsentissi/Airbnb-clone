import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { NavLink, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
  const { subpage } = useParams();
  const [redirect, setRedirect] = useState(null);
  const { user, loading, setUser } = useContext(UserContext);

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!loading) {
    return "Loading...";
  }

  if (loading && !user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
