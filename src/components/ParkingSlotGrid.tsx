import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Car, MapPin } from 'lucide-react';

interface ParkingSlot {
  id: string;
  area: string;
  floor: string;
  slotNumber: string;
  isAvailable: boolean;
  price: number;
}

interface ParkingSlotGridProps {
  slots: ParkingSlot[];
  selectedSlot: ParkingSlot | null;
  onSlotSelect: (slot: ParkingSlot) => void;
  area: string;
}

const ParkingSlotGrid = ({ slots, selectedSlot, onSlotSelect, area }: ParkingSlotGridProps) => {
  const filteredSlots = slots.filter(slot => 
    area ? slot.area.toLowerCase().includes(area.toLowerCase()) : true
  );

  const totalSlots = filteredSlots.length;
  const availableSlots = filteredSlots.filter(slot => slot.isAvailable).length;
  const bookedSlots = totalSlots - availableSlots;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {area ? `${area} Parking` : 'All Parking Areas'}
          </h3>
        </div>
        <div className="flex space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border-2 border-purple-300 rounded shadow-sm"></div>
            <span className="text-gray-600">Available ({availableSlots})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded shadow-sm"></div>
            <span className="text-gray-600">Booked ({bookedSlots})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow-sm"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-6 gap-4">
          {filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className={`
                relative w-20 h-16 border-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-xs font-medium shadow-md hover:shadow-lg transform hover:scale-105
                ${slot.isAvailable 
                  ? 'bg-white border-purple-300 hover:border-purple-500 hover:bg-purple-50' 
                  : 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-600 text-white cursor-not-allowed'
                }
                ${selectedSlot?.id === slot.id 
                  ? 'border-purple-600 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl scale-105 ring-2 ring-purple-300' 
                  : ''
                }
              `}
              onClick={() => slot.isAvailable && onSlotSelect(slot)}
              title={`${slot.slotNumber} - ${slot.area} - ${slot.floor} - $${slot.price}/hr ${slot.isAvailable ? 'Available' : 'Booked'}`}
            >
              <Car className={`h-3 w-3 mb-1 ${slot.isAvailable ? 'text-purple-600' : 'text-white'}`} />
              <span className="leading-3 font-semibold">{slot.slotNumber.split('-').pop()}</span>
              <span className={`text-xs font-bold ${slot.isAvailable ? 'text-green-600' : 'text-green-100'}`}>
                ${slot.price}
              </span>
              
              {selectedSlot?.id === slot.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {filteredSlots.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium">No parking slots found</p>
          <p className="text-sm">Try selecting a different area or check back later</p>
        </div>
      )}

      {area && filteredSlots.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2">Area Information</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="font-bold text-purple-800">{totalSlots}</p>
              <p className="text-purple-600">Total Slots</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="font-bold text-green-800">{availableSlots}</p>
              <p className="text-green-600">Available</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-800">{Math.round((availableSlots / totalSlots) * 100)}%</p>
              <p className="text-gray-600">Free Rate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingSlotGrid;
