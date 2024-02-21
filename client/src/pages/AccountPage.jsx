import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { NavLink, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const { subpage } = useParams();
  const [redirect, setRedirect] = useState(null)
  const { user, loading, setUser } = useContext(UserContext);

  const logout = async () => {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!loading) {
    return "Loading...";
  }

  if (loading && !user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2 px-6 bg-primary text-white rounded-full"
              : "py-2 px-6"
          }
          to={"/account/profile"}
          
        >
          My profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2 px-6 bg-primary text-white rounded-full"
              : "py-2 px-6"
          }
          to={"/account/bookings"}
        >
          My bookings
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-2 px-6 bg-primary text-white rounded-full"
              : "py-2 px-6"
          }
          to={"/account/places"}
        >
          My accomodations
        </NavLink>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">logout</button>
        </div>
      ) }
    </div>
  );
};

export default AccountPage;
