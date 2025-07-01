import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [user, setUser] = useState(null);

  // Check for stored user session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('parkpulse_current_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Fetch updated user data from users array to get latest wallet balance
        const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
        const updatedUser = registeredUsers.find((u: any) => u.id === userData.id);
        if (updatedUser) {
          setUser(updatedUser);
        } else {
          // User not found, clear session
          localStorage.removeItem('parkpulse_current_user');
        }
      } catch (error) {
        // If stored data is corrupted, clear it
        localStorage.removeItem('parkpulse_current_user');
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    // Store current user session
    localStorage.setItem('parkpulse_current_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    // Clear current user session
    localStorage.removeItem('parkpulse_current_user');
  };

  const updateUser = (updatedUser: any) => {
    setUser(updatedUser);
    // Update current user session
    localStorage.setItem('parkpulse_current_user', JSON.stringify(updatedUser));
    
    // Update user in the users array
    const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
    const userIndex = registeredUsers.findIndex((u: any) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUser;
      localStorage.setItem('parkpulse_users', JSON.stringify(registeredUsers));
    }
  };

  return (
    <div>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} onUpdateUser={updateUser} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;

// import React, { useState, useEffect } from 'react';
// import LandingPage from '@/components/LandingPage';
// import UserDashboard from '@/components/UserDashBoard';

// const Index = () => {
//   const [user, setUser] = useState(null);

//   // Check for stored user session on app load
//   useEffect(() => {
//     const storedUser = localStorage.getItem('parkpulse_current_user');
//     if (storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         // Fetch updated user data from users array to get latest wallet balance
//         const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
//         const updatedUser = registeredUsers.find((u: any) => u.id === userData.id);
//         if (updatedUser) {
//           setUser(updatedUser);
//         } else {
//           // User not found, clear session
//           localStorage.removeItem('parkpulse_current_user');
//         }
//       } catch (error) {
//         // If stored data is corrupted, clear it
//         localStorage.removeItem('parkpulse_current_user');
//       }
//     }
//   }, []);

//   const handleLogin = (userData: any) => {
//     setUser(userData);
//     // Store current user session
//     localStorage.setItem('parkpulse_current_user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     // Clear current user session
//     localStorage.removeItem('parkpulse_current_user');
//   };

//   const updateUser = (updatedUser: any) => {
//     setUser(updatedUser);
//     // Update current user session
//     localStorage.setItem('parkpulse_current_user', JSON.stringify(updatedUser));
    
//     // Update user in the users array
//     const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
//     const userIndex = registeredUsers.findIndex((u: any) => u.id === updatedUser.id);
//     if (userIndex !== -1) {
//       registeredUsers[userIndex] = updatedUser;
//       localStorage.setItem('parkpulse_users', JSON.stringify(registeredUsers));
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <UserDashboard user={user} onLogout={handleLogout} onUpdateUser={updateUser} />
//       ) : (
//         <LandingPage onLogin={handleLogin} />
//       )}
//     </div>
//   );
// };

// export default Index;
