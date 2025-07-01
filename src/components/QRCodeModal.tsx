// import React, { useEffect, useRef } from 'react';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { QrCode, Download, CheckCircle, Car, MapPin, Clock, DollarSign } from 'lucide-react';
// import QRCode from 'qrcode';

// interface QRCodeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: 'entry';
//   bookingData: any;
//   isPaymentComplete?: boolean;
// }

// const QRCodeModal = ({ 
//   isOpen, 
//   onClose, 
//   type, 
//   bookingData, 
//   isPaymentComplete 
// }: QRCodeModalProps) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const generateQRData = () => {
//     const bookingId = `PP${Date.now().toString().slice(-6)}`;
//     const qrData = {
//       app: 'ParkPulse',
//       type: 'parking_entry_exit',
//       bookingId: bookingId,
//       slotNumber: bookingData.slot?.slotNumber || 'N/A',
//       area: bookingData.slot?.area || 'N/A',
//       floor: bookingData.slot?.floor || 'N/A',
//       vehicleNumber: bookingData.numberPlate || 'N/A',
//       vehicleType: bookingData.vehicleType || 'N/A',
//       startTime: bookingData.startTime || new Date().toISOString(),
//       endTime: bookingData.endTime || new Date(Date.now() + 3600000).toISOString(),
//       duration: bookingData.duration || 1,
//       totalCost: bookingData.totalCost || 0,
//       userName: bookingData.user?.name || 'Guest',
//       userEmail: bookingData.user?.email || 'guest@example.com',
//       timestamp: new Date().toISOString(),
//       validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//       status: 'active'
//     };
    
//     return JSON.stringify(qrData);
//   };

//   useEffect(() => {
//     const generateQR = async () => {
//       if (canvasRef.current && isOpen && bookingData) {
//         try {
//           const qrData = generateQRData();
//           console.log('Generating QR with data:', qrData);
          
//           await QRCode.toCanvas(canvasRef.current, qrData, {
//             width: 280,
//             margin: 2,
//             color: {
//               dark: '#7C3AED',
//               light: '#FFFFFF'
//             },
//             errorCorrectionLevel: 'H'
//           });
          
//           console.log('QR Code generated successfully');
//         } catch (error) {
//           console.error('Error generating QR code:', error);
          
//           // Fallback: generate a simpler QR code
//           try {
//             const simpleData = `ParkPulse-${bookingData.slot?.slotNumber}-${Date.now()}`;
//             await QRCode.toCanvas(canvasRef.current, simpleData, {
//               width: 280,
//               margin: 2,
//               color: {
//                 dark: '#7C3AED',
//                 light: '#FFFFFF'
//               }
//             });
//           } catch (fallbackError) {
//             console.error('Fallback QR generation failed:', fallbackError);
//           }
//         }
//       }
//     };

//     generateQR();
//   }, [isOpen, bookingData]);

//   const downloadQRCode = () => {
//     if (canvasRef.current) {
//       try {
//         const link = document.createElement('a');
//         const bookingId = `PP${Date.now().toString().slice(-6)}`;
//         link.download = `parkpulse-entry-exit-${bookingData.slot?.slotNumber || 'slot'}-${bookingId}.png`;
//         link.href = canvasRef.current.toDataURL('image/png');
        
//         // Trigger download
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
        
//         console.log('QR Code downloaded successfully');
//       } catch (error) {
//         console.error('Error downloading QR code:', error);
//         alert('Error downloading QR code. Please try again.');
//       }
//     } else {
//       alert('QR Code not ready. Please wait a moment and try again.');
//     }
//   };

//   const bookingId = `PP${Date.now().toString().slice(-6)}`;

//   if (!bookingData || !bookingData.slot) {
//     return null;
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md border-0 shadow-2xl">
//         <DialogHeader className="text-center">
//           <DialogTitle className="flex items-center justify-center space-x-2 text-2xl">
//             <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
//               <QrCode className="h-4 w-4 text-white" />
//             </div>
//             <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Parking Entry/Exit Pass
//             </span>
//           </DialogTitle>
//           <DialogDescription className="text-gray-600">
//             Your digital parking pass for entry and exit - Save this QR code!
//           </DialogDescription>
//         </DialogHeader>
        
//         <div className="space-y-6">
//           {/* Success Banner */}
//           <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
//             <div className="flex items-center space-x-3">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//               <div>
//                 <p className="font-semibold text-green-800">Booking Confirmed!</p>
//                 <p className="text-sm text-green-600">Payment successful - Your slot is reserved</p>
//               </div>
//             </div>
//           </div>

//           {/* QR Code Section */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="p-6 bg-white border-2 border-purple-200 rounded-2xl shadow-lg">
//               <canvas 
//                 ref={canvasRef}
//                 style={{ display: 'block' }}
//               ></canvas>
//             </div>
//             <p className="text-sm text-purple-600 text-center font-medium">
//               📱 Scan this QR code for entry and exit verification
//             </p>
//           </div>

//           {/* Booking Details Card */}
//           <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 space-y-4">
//             <h3 className="font-semibold text-purple-900 text-lg mb-4">Booking Details</h3>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4 text-purple-600" />
//                 <div>
//                   <p className="text-xs text-gray-600">Parking Slot</p>
//                   <p className="font-semibold text-gray-800">{bookingData.slot.slotNumber}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <Car className="h-4 w-4 text-purple-600" />
//                 <div>
//                   <p className="text-xs text-gray-600">Vehicle</p>
//                   <p className="font-semibold text-gray-800">{bookingData.numberPlate}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <Clock className="h-4 w-4 text-purple-600" />
//                 <div>
//                   <p className="text-xs text-gray-600">Duration</p>
//                   <p className="font-semibold text-gray-800">{bookingData.duration} hour(s)</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <DollarSign className="h-4 w-4 text-purple-600" />
//                 <div>
//                   <p className="text-xs text-gray-600">Total Paid</p>
//                   <p className="font-semibold text-green-600">${bookingData.totalCost}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-3 border-t border-purple-200">
//               <div className="flex justify-between items-center text-sm">
//                 <span className="text-gray-600">Area:</span>
//                 <Badge variant="outline" className="border-purple-300 text-purple-700">
//                   {bookingData.slot.area} - {bookingData.slot.floor}
//                 </Badge>
//               </div>
//               <div className="flex justify-between items-center text-sm mt-2">
//                 <span className="text-gray-600">Booking ID:</span>
//                 <span className="font-mono text-purple-700">{bookingId}</span>
//               </div>
//             </div>

//             <div className="pt-3 border-t border-purple-200">
//               <div className="text-sm space-y-1">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Start:</span>
//                   <span className="font-medium">
//                     {new Date(bookingData.startTime).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">End:</span>
//                   <span className="font-medium">
//                     {new Date(bookingData.endTime).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Instructions */}
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//             <h4 className="font-semibold text-blue-900 mb-2">⚠️ Important Instructions</h4>
//             <ul className="text-sm text-blue-800 space-y-1">
//               <li>• <strong>SAVE THIS QR CODE</strong> - You'll need it for both entry AND exit</li>
//               <li>• Show this QR code at the parking entrance gate</li>
//               <li>• Keep the QR code saved on your phone for exit verification</li>
//               <li>• QR code contains your booking details and is valid until your end time</li>
//               <li>• Download the QR code using the button below for offline access</li>
//             </ul>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-3">
//             <Button 
//               onClick={downloadQRCode}
//               className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               Download QR Code
//             </Button>
//             <Button 
//               onClick={onClose} 
//               variant="outline" 
//               className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-3"
//             >
//               Done
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default QRCodeModal;


import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  QrCode,
  Download,
  CheckCircle,
  Car,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'entry';
  bookingData: any;
  isPaymentComplete?: boolean;
}

const QRCodeModal = ({
  isOpen,
  onClose,
  type,
  bookingData,
  isPaymentComplete,
}: QRCodeModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRData = () => {
    const bookingId = `PP${Date.now().toString().slice(-6)}`;
    return `
App: ParkPulse
Type: Entry
Booking ID: ${bookingId}
Slot Number: ${bookingData.slot?.slotNumber || 'N/A'}
Area: ${bookingData.slot?.area || 'N/A'}
Floor: ${bookingData.slot?.floor || 'N/A'}
Vehicle Number: ${bookingData.numberPlate || 'N/A'}
Vehicle Type: ${bookingData.vehicleType || 'N/A'}
Start Time: ${bookingData.startTime || new Date().toISOString()}
End Time: ${bookingData.endTime || new Date(Date.now() + 3600000).toISOString()}
Duration: ${bookingData.duration || 1} hour(s)
Total Cost: $${bookingData.totalCost || 0}
User Name: ${bookingData.user?.name || 'Guest'}
User Email: ${bookingData.user?.email || 'guest@example.com'}
Timestamp: ${new Date().toISOString()}
Valid Until: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}
Status: Active
`.trim();


    // const qrData = {
    //   app: 'ParkPulse',
      
    //   type: 'parking_entry_exit',
    //   bookingId,
    //   slotNumber: bookingData.slot?.slotNumber || 'N/A',
    //   area: bookingData.slot?.area || 'N/A',
    //   floor: bookingData.slot?.floor || 'N/A',
    //   vehicleNumber: bookingData.numberPlate || 'N/A',
    //   vehicleType: bookingData.vehicleType || 'N/A',
    //   startTime: bookingData.startTime || new Date().toISOString(),
    //   endTime:
    //     bookingData.endTime ||
    //     new Date(Date.now() + 3600000).toISOString(),
    //   duration: bookingData.duration || 1,
    //   totalCost: bookingData.totalCost || 0,
    //   userName: bookingData.user?.name || 'Guest',
    //   userEmail: bookingData.user?.email || 'guest@example.com',
    //   timestamp: new Date().toISOString(),
    //   validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    //   status: 'active',
    // };

    // return JSON.stringify(qrData);
  };
  useEffect(() => {
  const timeout = setTimeout(() => {
    const generateQR = async () => {
      if (canvasRef.current && isOpen && bookingData) {
        try {
          const qrData = generateQRData();
          await QRCode.toCanvas(canvasRef.current, qrData, {
            width: 280,
            margin: 2,
            color: {
              dark: '#7C3AED',
              light: '#FFFFFF',
            },
            errorCorrectionLevel: 'M', // optimized for performance
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQR();
  }, 300); // delay QR generation by 300ms to wait for modal render

  return () => clearTimeout(timeout); // cleanup if modal closes fast
}, [isOpen, bookingData?.slot?.slotNumber]);


  // useEffect(() => {
  //   const generateQR = async () => {
  //     if (canvasRef.current && isOpen && bookingData) {
  //       try {
  //         const qrData = generateQRData();
  //         console.log('Generating QR with data:', qrData);
  //         console.log('Booking Data:', bookingData);


  //         await QRCode.toCanvas(canvasRef.current, qrData, {
  //           width: 280,
  //           margin: 2,
  //           color: {
  //             dark: '#7C3AED',
  //             light: '#FFFFFF',
  //           },
  //           errorCorrectionLevel: 'M',
  //         });

  //         console.log('QR Code generated successfully');
  //       } catch (error) {
  //         console.error('Error generating QR code:', error);

  //         // Fallback: simpler QR
  //         try {
  //           const simpleData = `ParkPulse-${bookingData.slot?.slotNumber}-${Date.now()}`;
  //           await QRCode.toCanvas(canvasRef.current, simpleData, {
  //             width: 280,
  //             margin: 2,
  //             color: {
  //               dark: '#7C3AED',
  //               light: '#FFFFFF',
  //             },
  //           });
  //         } catch (fallbackError) {
  //           console.error('Fallback QR generation failed:', fallbackError);
  //         }
  //       }
  //     }
  //   };

  //   generateQR();
  // }, [isOpen, bookingData]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      try {
        const link = document.createElement('a');
        const bookingId = `PP${Date.now().toString().slice(-6)}`;
        link.download = `parkpulse-entry-exit-${bookingData.slot?.slotNumber || 'slot'}-${bookingId}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('QR Code downloaded successfully');
      } catch (error) {
        console.error('Error downloading QR code:', error);
        alert('Error downloading QR code. Please try again.');
      }
    } else {
      alert('QR Code not ready. Please wait a moment and try again.');
    }
  };

  const bookingId = `PP${Date.now().toString().slice(-6)}`;

  if (!bookingData || !bookingData.slot) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center space-x-2 text-2xl">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <QrCode className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Parking Entry/Exit Pass
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your digital parking pass for entry and exit - Save this QR code!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Booking Confirmed!</p>
                <p className="text-sm text-green-600">Payment successful - Your slot is reserved</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white border-2 border-purple-200 rounded-2xl shadow-lg w-72 h-72 flex justify-center items-center">
              <canvas
                ref={canvasRef}
                style={{ display: 'block', width: '100%', height: '100%' }}
              />
            </div>
            <p className="text-sm text-purple-600 text-center font-medium">
              📱 Scan this QR code for entry and exit verification
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-purple-900 text-lg mb-4">Booking Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Parking Slot</p>
                  <p className="font-semibold text-gray-800">{bookingData.slot.slotNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Vehicle</p>
                  <p className="font-semibold text-gray-800">{bookingData.numberPlate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-800">{bookingData.duration} hour(s)</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Paid</p>
                  <p className="font-semibold text-green-600">${bookingData.totalCost}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Area:</span>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  {bookingData.slot.area} - {bookingData.slot.floor}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono text-purple-700">{bookingId}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-200">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start:</span>
                  <span className="font-medium">
                    {new Date(bookingData.startTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End:</span>
                  <span className="font-medium">
                    {new Date(bookingData.endTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">⚠️ Important Instructions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>SAVE THIS QR CODE</strong> - You'll need it for both entry AND exit</li>
              <li>• Show this QR code at the parking entrance gate</li>
              <li>• Keep the QR code saved on your phone for exit verification</li>
              <li>• QR code contains your booking details and is valid until your end time</li>
              <li>• Download the QR code using the button below for offline access</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={downloadQRCode}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-3"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
