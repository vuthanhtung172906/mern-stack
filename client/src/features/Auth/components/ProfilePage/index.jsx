import React from "react";

import { useSelector } from "react-redux";

import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

function ProfilePage(props) {
  const { isAdmin } = useSelector((state) => state.auth);
  if (isAdmin) {
    return <AdminPage />;
  } else {
    return <UserPage />;
  }
}

export default ProfilePage;
