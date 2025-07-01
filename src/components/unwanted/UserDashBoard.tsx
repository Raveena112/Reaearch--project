
// import React, { useState } from 'react';
// import DashboardHeader from './DashboardHeader';
// import BookingHistory from './Dashboard';
// import NavigationInterface from './NavigationInterface';
// import Dashboard from './Dashboard';

// interface UserDashboardProps {
//   user: any;
//   onLogout: () => void;
//   onUpdateUser: (user: any) => void;
// }

// const UserDashboard = ({ user, onLogout, onUpdateUser }: UserDashboardProps) => {
//   const [showBookingInterface, setShowBookingInterface] = useState(false);

//   const handleBookSlot = () => {
//     setShowBookingInterface(true);
//   };

//   const handleBackToMain = () => {
//     setShowBookingInterface(false);
//   };

//   const handleRechargeWallet = () => {
//     const updatedUser = { ...user, wallet: user.wallet + 500 };
//     onUpdateUser(updatedUser);
//     alert('Wallet recharged with $500!');
//   };

//   if (showBookingInterface) {
//     return (
//       <Dashboard 
//         user={user} 
//         onLogout={onLogout} 
//         onUpdateUser={onUpdateUser}
//         onBackToMain={handleBackToMain}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
//       <DashboardHeader 
//         user={user} 
//         onLogout={onLogout} 
//         onRechargeWallet={handleRechargeWallet}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//             Welcome back, {user.name}!
//           </h2>
//           <p className="text-gray-600">Manage your parking and view your booking history</p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           <BookingHistory user={user} />
//           <NavigationInterface onBookSlot={handleBookSlot} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
import React from 'react';
import BookingHistory from './BookingHistory';
import NavigationInterface from './NavigationInterface';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UserDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-purple-700">
        Welcome back, Sreeram!
      </h1>
      <p className="text-gray-600 mb-4">
        Manage your parking and view your booking history
      </p>

      {/* 1. Booking History Section */}
      <section className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Booking History</h2>
        <BookingHistory />
      </section>

      {/* 2. Where do you want to go? Section */}
      <section className="bg-white rounded-2xl shadow p-4">
        <NavigationInterface />
      </section>

      {/* 3. Book a Parking Slot Button */}
      <div className="flex justify-center mt-4">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl"
          onClick={() => navigate('/booking')}
        >
          Book a Parking Slot
        </Button>
      </div>
    </div>
  );
};

export default UserDashBoard;
