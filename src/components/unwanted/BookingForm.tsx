
// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Car, MapPin } from 'lucide-react';

// interface BookingData {
//   vehicleType: string;
//   numberPlate: string;
//   area: string;
//   startTime: string;
//   endTime: string;
// }

// interface ParkingSlot {
//   id: string;
//   area: string;
//   floor: string;
//   slotNumber: string;
//   isAvailable: boolean;
//   price: number;
// }

// interface BookingFormProps {
//   bookingData: BookingData;
//   setBookingData: (data: BookingData) => void;
//   selectedSlot: ParkingSlot | null;
//   onBookSlot: () => void;
//   userWallet: number;
// }

// const BookingForm = ({ bookingData, setBookingData, selectedSlot, onBookSlot, userWallet }: BookingFormProps) => {
//   const handleNumberPlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^a-zA-Z0-9\-\s]/g, '').toUpperCase();
//     setBookingData({ ...bookingData, numberPlate: value });
//   };

//   const calculateDuration = () => {
//     if (bookingData.startTime && bookingData.endTime) {
//       const start = new Date(bookingData.startTime);
//       const end = new Date(bookingData.endTime);
//       const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
//       return hours > 0 ? hours : 1;
//     }
//     return 1;
//   };

//   const getTotalCost = () => {
//     if (selectedSlot) {
//       return selectedSlot.price * calculateDuration();
//     }
//     return 0;
//   };

//   return (
//     <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md">
//       <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
//         <CardTitle className="flex items-center space-x-2">
//           <Car className="h-5 w-5" />
//           <span>Book Parking Slot</span>
//         </CardTitle>
//         <CardDescription className="text-purple-100">
//           Select your vehicle and parking preferences
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6 p-6">
//         <div>
//           <Label htmlFor="vehicleType" className="text-gray-700 font-medium">Vehicle Type</Label>
//           <Select onValueChange={(value) => setBookingData({ ...bookingData, vehicleType: value })}>
//             <SelectTrigger className="border-purple-200 focus:border-purple-500">
//               <SelectValue placeholder="Select vehicle type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="car">🚗 Car</SelectItem>
//               <SelectItem value="motorcycle">🏍️ Motorcycle</SelectItem>
//               <SelectItem value="suv">🚙 SUV</SelectItem>
//               <SelectItem value="truck">🚚 Truck</SelectItem>
//               <SelectItem value="electric">⚡ Electric Vehicle</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="numberPlate" className="text-gray-700 font-medium">License Plate</Label>
//           <Input
//             id="numberPlate"
//             value={bookingData.numberPlate}
//             onChange={handleNumberPlateChange}
//             placeholder="ABC-1234"
//             className="border-purple-200 focus:border-purple-500 font-mono text-center"
//             maxLength={12}
//           />
//           <p className="text-xs text-gray-500 mt-1">Letters, numbers, and hyphens only</p>
//         </div>

//         <div>
//           <Label htmlFor="area" className="text-gray-700 font-medium">Parking Area</Label>
//           <Select onValueChange={(value) => setBookingData({ ...bookingData, area: value })}>
//             <SelectTrigger className="border-purple-200 focus:border-purple-500">
//               <SelectValue placeholder="Select parking area" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="downtown">🏙️ Downtown</SelectItem>
//               <SelectItem value="shopping mall">🛒 Shopping Mall</SelectItem>
//               <SelectItem value="airport">✈️ Airport</SelectItem>
//               <SelectItem value="business district">🏢 Business District</SelectItem>
//               <SelectItem value="university campus">🎓 University Campus</SelectItem>
//               <SelectItem value="hospital complex">🏥 Hospital Complex</SelectItem>
//               <SelectItem value="sports stadium">🏟️ Sports Stadium</SelectItem>
//               <SelectItem value="tech park">💻 Tech Park</SelectItem>
//               <SelectItem value="metro station">🚇 Metro Station</SelectItem>
//               <SelectItem value="city center">🌆 City Center</SelectItem>
//               <SelectItem value="resort complex">🏖️ Resort Complex</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="startTime" className="text-gray-700 font-medium">Start Time</Label>
//             <Input
//               id="startTime"
//               type="datetime-local"
//               value={bookingData.startTime}
//               onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
//               className="border-purple-200 focus:border-purple-500"
//             />
//           </div>
//           <div>
//             <Label htmlFor="endTime" className="text-gray-700 font-medium">End Time</Label>
//             <Input
//               id="endTime"
//               type="datetime-local"
//               value={bookingData.endTime}
//               onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
//               className="border-purple-200 focus:border-purple-500"
//             />
//           </div>
//         </div>

//         {selectedSlot && (
//           <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
//             <h4 className="font-semibold text-purple-900 flex items-center">
//               <MapPin className="h-4 w-4 mr-2" />
//               Selected Slot
//             </h4>
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Slot:</span>
//                 <span className="font-medium">{selectedSlot.slotNumber}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Area:</span>
//                 <span className="font-medium">{selectedSlot.area}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Floor:</span>
//                 <span className="font-medium">{selectedSlot.floor}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Duration:</span>
//                 <span className="font-medium">{calculateDuration()}h</span>
//               </div>
//               <div className="flex justify-between col-span-2 pt-2 border-t border-purple-200">
//                 <span className="text-gray-600">Total Cost:</span>
//                 <span className="font-bold text-green-600 text-lg">${getTotalCost()}</span>
//               </div>
//             </div>
//             <Button 
//               onClick={onBookSlot} 
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//               disabled={!bookingData.numberPlate || !bookingData.vehicleType || getTotalCost() > userWallet}
//             >
//               {getTotalCost() > userWallet ? 'Insufficient Balance' : `Book Slot - $${getTotalCost()}`}
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default BookingForm;
