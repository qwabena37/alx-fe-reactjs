import React from 'react';
import UserContext from './components/UserContext';
import ProfilePage from './components/ProfilePage';

function App() {
  const userData = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 28,
  };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
