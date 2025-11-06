import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserInfo() {
  const { name, email } = useContext(UserContext);

  return (
    <div>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}

export default UserInfo;
