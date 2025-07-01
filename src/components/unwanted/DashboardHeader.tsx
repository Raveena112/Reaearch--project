
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { QrCode, User } from 'lucide-react';
// import WalletSection from './WalletSection';

// interface DashboardHeaderProps {
//   user: any;
//   onLogout: () => void;
//   onRechargeWallet: () => void;
// }

// const DashboardHeader = ({ user, onLogout, onRechargeWallet }: DashboardHeaderProps) => {
//   return (
//     <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <QrCode className="h-8 w-8 text-purple-600" />
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 ParkPulse
//               </h1>
//               <p className="text-xs text-gray-500">Smart Parking Dashboard</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-6">
//             <WalletSection 
//               wallet={user.wallet} 
//               onRecharge={onRechargeWallet}
//             />
//             <div className="flex items-center space-x-2">
//               <User className="h-5 w-5 text-gray-500" />
//               <span className="text-sm text-gray-700 font-medium">{user.name}</span>
//             </div>
//             <Button onClick={onLogout} variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;
