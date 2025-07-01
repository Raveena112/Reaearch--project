
// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { MapPin, Navigation, Search, Car } from 'lucide-react';

// interface NavigationInterfaceProps {
//   onBookSlot: () => void;
// }

// const NavigationInterface = ({ onBookSlot }: NavigationInterfaceProps) => {
//   const [destination, setDestination] = useState('');
//   const [currentLocation, setCurrentLocation] = useState('');

//   const popularDestinations = [
//     { name: 'Downtown Mall', slots: 45, price: '$5/hr' },
//     { name: 'Airport Terminal', slots: 23, price: '$8/hr' },
//     { name: 'Business District', slots: 67, price: '$6/hr' },
//     { name: 'University Campus', slots: 34, price: '$3/hr' },
//     { name: 'Hospital Complex', slots: 12, price: '$4/hr' },
//     { name: 'Sports Stadium', slots: 89, price: '$10/hr' }
//   ];

//   return (
//     <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md">
//       <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
//         <CardTitle className="flex items-center space-x-2">
//           <Navigation className="h-5 w-5" />
//           <span>Where do you want to go?</span>
//         </CardTitle>
//         <CardDescription className="text-green-100">
//           Find parking near your destination
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-6 space-y-6">
//         {/* Location Search */}
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="current-location" className="text-gray-700 font-medium">Current Location</Label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="current-location"
//                 value={currentLocation}
//                 onChange={(e) => setCurrentLocation(e.target.value)}
//                 placeholder="Enter your current location"
//                 className="pl-10 border-green-200 focus:border-green-500"
//               />
//             </div>
//           </div>
          
//           <div>
//             <Label htmlFor="destination" className="text-gray-700 font-medium">Destination</Label>
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="destination"
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 placeholder="Where are you going?"
//                 className="pl-10 border-green-200 focus:border-green-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Popular Destinations */}
//         <div>
//           <h4 className="font-semibold text-gray-800 mb-3">Popular Destinations</h4>
//           <div className="grid grid-cols-1 gap-3">
//             {popularDestinations.map((dest, index) => (
//               <div 
//                 key={index}
//                 className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                 onClick={() => setDestination(dest.name)}
//               >
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="h-4 w-4 text-green-600" />
//                   <div>
//                     <p className="font-medium text-gray-800">{dest.name}</p>
//                     <p className="text-sm text-gray-600">{dest.slots} available slots</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-green-600">{dest.price}</p>
//                   <p className="text-xs text-gray-500">avg. rate</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Book Slot Button */}
//         <div className="pt-4 border-t border-gray-200">
//           <Button 
//             onClick={onBookSlot}
//             className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
//           >
//             <Car className="h-5 w-5 mr-2" />
//             Book a Parking Slot
//           </Button>
          
//           {destination && (
//             <p className="text-center text-sm text-gray-600 mt-2">
//               Looking for parking near <span className="font-medium text-green-600">{destination}</span>
//             </p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default NavigationInterface;
