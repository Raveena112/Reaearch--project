
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Clock, MapPin, Car, DollarSign, Calendar, QrCode } from 'lucide-react';

// interface Booking {
//   id: string;
//   slotNumber: string;
//   area: string;
//   floor: string;
//   vehicleType: string;
//   numberPlate: string;
//   startTime: string;
//   endTime: string;
//   duration: number;
//   totalCost: number;
//   status: 'completed' | 'active' | 'cancelled';
//   bookingDate: string;
// }

// interface BookingHistoryProps {
//   user: any;
// }

// const BookingHistory = ({ user }: BookingHistoryProps) => {
//   const [bookings, setBookings] = useState<Booking[]>([]);

//   useEffect(() => {
//     // Load booking history from localStorage (will be replaced with Supabase later)
//     const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.id}`) || '[]');
//     setBookings(userBookings);
//   }, [user.id]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'active':
//         return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const totalSpent = bookings.reduce((sum, booking) => 
//     booking.status === 'completed' ? sum + booking.totalCost : sum, 0
//   );

//   return (
//     <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md">
//       <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
//         <CardTitle className="flex items-center space-x-2">
//           <Clock className="h-5 w-5" />
//           <span>Booking History</span>
//         </CardTitle>
//         <CardDescription className="text-indigo-100">
//           Your parking history and payment details
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-6">
//         {/* Summary Stats */}
//         <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
//           <div className="text-center">
//             <p className="text-2xl font-bold text-purple-600">{bookings.length}</p>
//             <p className="text-sm text-gray-600">Total Bookings</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-green-600">${totalSpent}</p>
//             <p className="text-sm text-gray-600">Total Spent</p>
//           </div>
//           <div className="text-center">
//             <p className="text-2xl font-bold text-blue-600">
//               {bookings.filter(b => b.status === 'active').length}
//             </p>
//             <p className="text-sm text-gray-600">Active Bookings</p>
//           </div>
//         </div>

//         {/* Booking List */}
//         <div className="space-y-4 max-h-96 overflow-y-auto">
//           {bookings.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <Car className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//               <p>No booking history yet</p>
//               <p className="text-sm">Start by booking your first parking slot!</p>
//             </div>
//           ) : (
//             bookings.map((booking) => (
//               <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4 text-purple-600" />
//                     <span className="font-semibold">{booking.slotNumber}</span>
//                     <Badge variant="outline" className="text-xs">
//                       {booking.area} - {booking.floor}
//                     </Badge>
//                   </div>
//                   <Badge className={getStatusColor(booking.status)}>
//                     {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                   </Badge>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="flex items-center space-x-2">
//                     <Car className="h-3 w-3 text-gray-500" />
//                     <span>{booking.vehicleType} - {booking.numberPlate}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <DollarSign className="h-3 w-3 text-gray-500" />
//                     <span className="font-semibold text-green-600">${booking.totalCost}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock className="h-3 w-3 text-gray-500" />
//                     <span>{booking.duration} hour(s)</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="h-3 w-3 text-gray-500" />
//                     <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
//                   <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
//                   <p>End: {new Date(booking.endTime).toLocaleString()}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default BookingHistory;
