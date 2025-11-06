import React from "react";
import UserDetails from "./UserDetails";
import UserInfo from "./UserInfo";

function ProfilePage() {
  return (
    <div>
      <h1>User Profile</h1>
      <UserDetails />
      <UserInfo />
    </div>
  );
}

export default ProfilePage;
