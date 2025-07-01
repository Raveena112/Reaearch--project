import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, QrCode, Wallet, Car, MapPin, Clock, Download, RefreshCw } from 'lucide-react';
import QRCodeModal from './QRCodeModal';
import ParkingSlotGrid from './ParkingSlotGrid';
import PINVerification from './PINVerification';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onUpdateUser: (user: any) => void;
}

interface BookingData {
  vehicleType: string;
  numberPlate: string;
  area: string;
  startTime: string;
  endTime: string;
}

interface ParkingSlot {
  id: string;
  area: string;
  floor: string;
  slotNumber: string;
  isAvailable: boolean;
  price: number;
}

const Dashboard = ({ user, onLogout, onUpdateUser }: DashboardProps) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    vehicleType: '',
    numberPlate: '',
    area: '',
    startTime: '',
    endTime: ''
  });
  
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [showEntryQR, setShowEntryQR] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Enhanced mock data with 20 slots per area
  const mockSlots: ParkingSlot[] = [
    // Downtown area - 20 slots
    { id: '1', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A1', isAvailable: true, price: 15 },
    { id: '2', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A2', isAvailable: false, price: 15 },
    { id: '3', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A3', isAvailable: true, price: 15 },
    { id: '4', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A4', isAvailable: true, price: 15 },
    { id: '5', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A5', isAvailable: false, price: 15 },
    { id: '6', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A6', isAvailable: true, price: 15 },
    { id: '7', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A7', isAvailable: true, price: 15 },
    { id: '8', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A8', isAvailable: false, price: 15 },
    { id: '9', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A9', isAvailable: true, price: 15 },
    { id: '10', area: 'Downtown', floor: 'Ground', slotNumber: 'DT-A10', isAvailable: true, price: 15 },
    { id: '11', area: 'Downtown', floor: 'First', slotNumber: 'DT-B1', isAvailable: false, price: 18 },
    { id: '12', area: 'Downtown', floor: 'First', slotNumber: 'DT-B2', isAvailable: true, price: 18 },
    { id: '13', area: 'Downtown', floor: 'First', slotNumber: 'DT-B3', isAvailable: true, price: 18 },
    { id: '14', area: 'Downtown', floor: 'First', slotNumber: 'DT-B4', isAvailable: false, price: 18 },
    { id: '15', area: 'Downtown', floor: 'First', slotNumber: 'DT-B5', isAvailable: true, price: 18 },
    { id: '16', area: 'Downtown', floor: 'First', slotNumber: 'DT-B6', isAvailable: true, price: 18 },
    { id: '17', area: 'Downtown', floor: 'First', slotNumber: 'DT-B7', isAvailable: false, price: 18 },
    { id: '18', area: 'Downtown', floor: 'First', slotNumber: 'DT-B8', isAvailable: true, price: 18 },
    { id: '19', area: 'Downtown', floor: 'First', slotNumber: 'DT-B9', isAvailable: true, price: 18 },
    { id: '20', area: 'Downtown', floor: 'First', slotNumber: 'DT-B10', isAvailable: false, price: 18 },

    // Shopping Mall area - 20 slots
    { id: '21', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G1', isAvailable: true, price: 12 },
    { id: '22', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G2', isAvailable: true, price: 12 },
    { id: '23', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G3', isAvailable: false, price: 12 },
    { id: '24', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G4', isAvailable: true, price: 12 },
    { id: '25', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G5', isAvailable: true, price: 12 },
    { id: '26', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G6', isAvailable: false, price: 12 },
    { id: '27', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G7', isAvailable: true, price: 12 },
    { id: '28', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G8', isAvailable: true, price: 12 },
    { id: '29', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G9', isAvailable: false, price: 12 },
    { id: '30', area: 'Shopping Mall', floor: 'Ground', slotNumber: 'SM-G10', isAvailable: true, price: 12 },
    { id: '31', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U1', isAvailable: true, price: 10 },
    { id: '32', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U2', isAvailable: false, price: 10 },
    { id: '33', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U3', isAvailable: true, price: 10 },
    { id: '34', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U4', isAvailable: true, price: 10 },
    { id: '35', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U5', isAvailable: false, price: 10 },
    { id: '36', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U6', isAvailable: true, price: 10 },
    { id: '37', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U7', isAvailable: true, price: 10 },
    { id: '38', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U8', isAvailable: false, price: 10 },
    { id: '39', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U9', isAvailable: true, price: 10 },
    { id: '40', area: 'Shopping Mall', floor: 'Underground', slotNumber: 'SM-U10', isAvailable: true, price: 10 },

    // Airport area - 20 slots
    { id: '41', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-1', isAvailable: true, price: 25 },
    { id: '42', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-2', isAvailable: false, price: 25 },
    { id: '43', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-3', isAvailable: true, price: 25 },
    { id: '44', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-4', isAvailable: true, price: 25 },
    { id: '45', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-5', isAvailable: false, price: 25 },
    { id: '46', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-6', isAvailable: true, price: 25 },
    { id: '47', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-7', isAvailable: true, price: 25 },
    { id: '48', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-8', isAvailable: false, price: 25 },
    { id: '49', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-9', isAvailable: true, price: 25 },
    { id: '50', area: 'Airport', floor: 'Terminal 1', slotNumber: 'AP-T1-10', isAvailable: true, price: 25 },
    { id: '51', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-1', isAvailable: true, price: 25 },
    { id: '52', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-2', isAvailable: false, price: 25 },
    { id: '53', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-3', isAvailable: true, price: 25 },
    { id: '54', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-4', isAvailable: true, price: 25 },
    { id: '55', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-5', isAvailable: false, price: 25 },
    { id: '56', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-6', isAvailable: true, price: 25 },
    { id: '57', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-7', isAvailable: true, price: 25 },
    { id: '58', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-8', isAvailable: false, price: 25 },
    { id: '59', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-9', isAvailable: true, price: 25 },
    { id: '60', area: 'Airport', floor: 'Terminal 2', slotNumber: 'AP-T2-10', isAvailable: true, price: 25 },

    // Business District - 20 slots
    { id: '61', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA1', isAvailable: true, price: 20 },
    { id: '62', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA2', isAvailable: false, price: 20 },
    { id: '63', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA3', isAvailable: true, price: 20 },
    { id: '64', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA4', isAvailable: true, price: 20 },
    { id: '65', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA5', isAvailable: false, price: 20 },
    { id: '66', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA6', isAvailable: true, price: 20 },
    { id: '67', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA7', isAvailable: true, price: 20 },
    { id: '68', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA8', isAvailable: false, price: 20 },
    { id: '69', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA9', isAvailable: true, price: 20 },
    { id: '70', area: 'Business District', floor: 'Plaza A', slotNumber: 'BD-PA10', isAvailable: true, price: 20 },
    { id: '71', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB1', isAvailable: true, price: 20 },
    { id: '72', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB2', isAvailable: false, price: 20 },
    { id: '73', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB3', isAvailable: true, price: 20 },
    { id: '74', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB4', isAvailable: true, price: 20 },
    { id: '75', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB5', isAvailable: false, price: 20 },
    { id: '76', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB6', isAvailable: true, price: 20 },
    { id: '77', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB7', isAvailable: true, price: 20 },
    { id: '78', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB8', isAvailable: false, price: 20 },
    { id: '79', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB9', isAvailable: true, price: 20 },
    { id: '80', area: 'Business District', floor: 'Plaza B', slotNumber: 'BD-PB10', isAvailable: true, price: 20 },

    // University Campus - 20 slots
    { id: '81', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N1', isAvailable: true, price: 8 },
    { id: '82', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N2', isAvailable: true, price: 8 },
    { id: '83', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N3', isAvailable: false, price: 8 },
    { id: '84', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N4', isAvailable: true, price: 8 },
    { id: '85', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N5', isAvailable: true, price: 8 },
    { id: '86', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N6', isAvailable: false, price: 8 },
    { id: '87', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N7', isAvailable: true, price: 8 },
    { id: '88', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N8', isAvailable: true, price: 8 },
    { id: '89', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N9', isAvailable: false, price: 8 },
    { id: '90', area: 'University Campus', floor: 'North Lot', slotNumber: 'UC-N10', isAvailable: true, price: 8 },
    { id: '91', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S1', isAvailable: false, price: 8 },
    { id: '92', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S2', isAvailable: true, price: 8 },
    { id: '93', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S3', isAvailable: true, price: 8 },
    { id: '94', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S4', isAvailable: false, price: 8 },
    { id: '95', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S5', isAvailable: true, price: 8 },
    { id: '96', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S6', isAvailable: true, price: 8 },
    { id: '97', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S7', isAvailable: false, price: 8 },
    { id: '98', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S8', isAvailable: true, price: 8 },
    { id: '99', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S9', isAvailable: true, price: 8 },
    { id: '100', area: 'University Campus', floor: 'South Lot', slotNumber: 'UC-S10', isAvailable: false, price: 8 },

    // Hospital Complex - 20 slots
    { id: '101', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E1', isAvailable: true, price: 5 },
    { id: '102', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E2', isAvailable: false, price: 5 },
    { id: '103', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E3', isAvailable: true, price: 5 },
    { id: '104', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E4', isAvailable: true, price: 5 },
    { id: '105', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E5', isAvailable: false, price: 5 },
    { id: '106', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E6', isAvailable: true, price: 5 },
    { id: '107', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E7', isAvailable: true, price: 5 },
    { id: '108', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E8', isAvailable: false, price: 5 },
    { id: '109', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E9', isAvailable: true, price: 5 },
    { id: '110', area: 'Hospital Complex', floor: 'Emergency', slotNumber: 'HC-E10', isAvailable: true, price: 5 },
    { id: '111', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G1', isAvailable: false, price: 5 },
    { id: '112', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G2', isAvailable: true, price: 5 },
    { id: '113', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G3', isAvailable: true, price: 5 },
    { id: '114', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G4', isAvailable: false, price: 5 },
    { id: '115', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G5', isAvailable: true, price: 5 },
    { id: '116', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G6', isAvailable: true, price: 5 },
    { id: '117', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G7', isAvailable: false, price: 5 },
    { id: '118', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G8', isAvailable: true, price: 5 },
    { id: '119', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G9', isAvailable: true, price: 5 },
    { id: '120', area: 'Hospital Complex', floor: 'General', slotNumber: 'HC-G10', isAvailable: false, price: 5 },

    // Sports Stadium - 20 slots
    { id: '121', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M1', isAvailable: true, price: 30 },
    { id: '122', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M2', isAvailable: false, price: 30 },
    { id: '123', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M3', isAvailable: true, price: 30 },
    { id: '124', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M4', isAvailable: true, price: 30 },
    { id: '125', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M5', isAvailable: false, price: 30 },
    { id: '126', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M6', isAvailable: true, price: 30 },
    { id: '127', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M7', isAvailable: true, price: 30 },
    { id: '128', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M8', isAvailable: false, price: 30 },
    { id: '129', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M9', isAvailable: true, price: 30 },
    { id: '130', area: 'Sports Stadium', floor: 'Main Gate', slotNumber: 'SS-M10', isAvailable: true, price: 30 },
    { id: '131', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S1', isAvailable: false, price: 25 },
    { id: '132', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S2', isAvailable: true, price: 25 },
    { id: '133', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S3', isAvailable: true, price: 25 },
    { id: '134', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S4', isAvailable: false, price: 25 },
    { id: '135', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S5', isAvailable: true, price: 25 },
    { id: '136', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S6', isAvailable: true, price: 25 },
    { id: '137', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S7', isAvailable: false, price: 25 },
    { id: '138', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S8', isAvailable: true, price: 25 },
    { id: '139', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S9', isAvailable: true, price: 25 },
    { id: '140', area: 'Sports Stadium', floor: 'Side Gate', slotNumber: 'SS-S10', isAvailable: false, price: 25 },

    // Tech Park - 20 slots
    { id: '141', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A1', isAvailable: true, price: 22 },
    { id: '142', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A2', isAvailable: false, price: 22 },
    { id: '143', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A3', isAvailable: true, price: 22 },
    { id: '144', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A4', isAvailable: true, price: 22 },
    { id: '145', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A5', isAvailable: false, price: 22 },
    { id: '146', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A6', isAvailable: true, price: 22 },
    { id: '147', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A7', isAvailable: true, price: 22 },
    { id: '148', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A8', isAvailable: false, price: 22 },
    { id: '149', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A9', isAvailable: true, price: 22 },
    { id: '150', area: 'Tech Park', floor: 'Building A', slotNumber: 'TP-A10', isAvailable: true, price: 22 },
    { id: '151', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B1', isAvailable: true, price: 22 },
    { id: '152', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B2', isAvailable: false, price: 22 },
    { id: '153', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B3', isAvailable: true, price: 22 },
    { id: '154', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B4', isAvailable: true, price: 22 },
    { id: '155', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B5', isAvailable: false, price: 22 },
    { id: '156', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B6', isAvailable: true, price: 22 },
    { id: '157', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B7', isAvailable: true, price: 22 },
    { id: '158', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B8', isAvailable: false, price: 22 },
    { id: '159', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B9', isAvailable: true, price: 22 },
    { id: '160', area: 'Tech Park', floor: 'Building B', slotNumber: 'TP-B10', isAvailable: true, price: 22 },

    // Metro Station - 20 slots
    { id: '161', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-1', isAvailable: true, price: 10 },
    { id: '162', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-2', isAvailable: false, price: 10 },
    { id: '163', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-3', isAvailable: true, price: 10 },
    { id: '164', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-4', isAvailable: true, price: 10 },
    { id: '165', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-5', isAvailable: false, price: 10 },
    { id: '166', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-6', isAvailable: true, price: 10 },
    { id: '167', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-7', isAvailable: true, price: 10 },
    { id: '168', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-8', isAvailable: false, price: 10 },
    { id: '169', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-9', isAvailable: true, price: 10 },
    { id: '170', area: 'Metro Station', floor: 'Platform 1', slotNumber: 'MS-P1-10', isAvailable: true, price: 10 },
    { id: '171', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-1', isAvailable: true, price: 10 },
    { id: '172', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-2', isAvailable: false, price: 10 },
    { id: '173', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-3', isAvailable: true, price: 10 },
    { id: '174', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-4', isAvailable: true, price: 10 },
    { id: '175', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-5', isAvailable: false, price: 10 },
    { id: '176', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-6', isAvailable: true, price: 10 },
    { id: '177', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-7', isAvailable: true, price: 10 },
    { id: '178', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-8', isAvailable: false, price: 10 },
    { id: '179', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-9', isAvailable: true, price: 10 },
    { id: '180', area: 'Metro Station', floor: 'Platform 2', slotNumber: 'MS-P2-10', isAvailable: true, price: 10 },

    // City Center - 20 slots
    { id: '181', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS1', isAvailable: true, price: 28 },
    { id: '182', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS2', isAvailable: false, price: 28 },
    { id: '183', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS3', isAvailable: true, price: 28 },
    { id: '184', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS4', isAvailable: true, price: 28 },
    { id: '185', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS5', isAvailable: false, price: 28 },
    { id: '186', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS6', isAvailable: true, price: 28 },
    { id: '187', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS7', isAvailable: true, price: 28 },
    { id: '188', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS8', isAvailable: false, price: 28 },
    { id: '189', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS9', isAvailable: true, price: 28 },
    { id: '190', area: 'City Center', floor: 'Main Street', slotNumber: 'CC-MS10', isAvailable: true, price: 28 },
    { id: '191', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS1', isAvailable: true, price: 25 },
    { id: '192', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS2', isAvailable: false, price: 25 },
    { id: '193', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS3', isAvailable: true, price: 25 },
    { id: '194', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS4', isAvailable: true, price: 25 },
    { id: '195', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS5', isAvailable: false, price: 25 },
    { id: '196', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS6', isAvailable: true, price: 25 },
    { id: '197', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS7', isAvailable: true, price: 25 },
    { id: '198', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS8', isAvailable: false, price: 25 },
    { id: '199', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS9', isAvailable: true, price: 25 },
    { id: '200', area: 'City Center', floor: 'Side Street', slotNumber: 'CC-SS10', isAvailable: true, price: 25 },

    // Resort Complex - 20 slots
    { id: '201', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA1', isAvailable: true, price: 35 },
    { id: '202', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA2', isAvailable: false, price: 35 },
    { id: '203', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA3', isAvailable: true, price: 35 },
    { id: '204', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA4', isAvailable: true, price: 35 },
    { id: '205', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA5', isAvailable: false, price: 35 },
    { id: '206', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA6', isAvailable: true, price: 35 },
    { id: '207', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA7', isAvailable: true, price: 35 },
    { id: '208', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA8', isAvailable: false, price: 35 },
    { id: '209', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA9', isAvailable: true, price: 35 },
    { id: '210', area: 'Resort Complex', floor: 'Lobby Area', slotNumber: 'RC-LA10', isAvailable: true, price: 35 },
    { id: '211', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS1', isAvailable: true, price: 40 },
    { id: '212', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS2', isAvailable: false, price: 40 },
    { id: '213', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS3', isAvailable: true, price: 40 },
    { id: '214', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS4', isAvailable: true, price: 40 },
    { id: '215', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS5', isAvailable: false, price: 40 },
    { id: '216', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS6', isAvailable: true, price: 40 },
    { id: '217', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS7', isAvailable: true, price: 40 },
    { id: '218', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS8', isAvailable: false, price: 40 },
    { id: '219', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS9', isAvailable: true, price: 40 },
    { id: '220', area: 'Resort Complex', floor: 'Pool Side', slotNumber: 'RC-PS10', isAvailable: true, price: 40 },
  ];

  const handleSlotSelect = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookSlot = () => {
    if (selectedSlot && selectedSlot.price <= user.wallet) {
      setShowPinVerification(true);
    } else if (selectedSlot && selectedSlot.price > user.wallet) {
      alert(`Insufficient wallet balance. Required: $${selectedSlot.price}, Available: $${user.wallet}`);
    }
  };

  const handlePinVerified = () => {
    if (selectedSlot) {
      // Deduct amount from wallet
      const updatedUser = { ...user, wallet: user.wallet - getTotalCost() };
      onUpdateUser(updatedUser);
      setBookingConfirmed(true);
      setShowPinVerification(false);
      setShowEntryQR(true);
    }
  };

  const handleNumberPlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow letters, numbers, and common symbols used in license plates
    const value = e.target.value.replace(/[^a-zA-Z0-9\-\s]/g, '').toUpperCase();
    setBookingData({ ...bookingData, numberPlate: value });
  };

  const calculateDuration = () => {
    if (bookingData.startTime && bookingData.endTime) {
      const start = new Date(bookingData.startTime);
      const end = new Date(bookingData.endTime);
      const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
      return hours > 0 ? hours : 1;
    }
    return 1;
  };

  const getTotalCost = () => {
    if (selectedSlot) {
      return selectedSlot.price * calculateDuration();
    }
    return 0;
  };

  const handleRechargeWallet = () => {
    // Simple recharge functionality - adds $500 to wallet
    const updatedUser = { ...user, wallet: user.wallet + 500 };
    onUpdateUser(updatedUser);
    alert('Wallet recharged with $500!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <QrCode className="h-8 w-8 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ParkPulse
                </h1>
                <p className="text-xs text-gray-500">Smart Parking Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Wallet Display with Recharge */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">${user.wallet}</span>
                </div>
                <Button 
                  onClick={handleRechargeWallet}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Recharge
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Booking Form */}
          <Card className="lg:col-span-1 shadow-xl border-0 bg-white/90 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Book Parking Slot</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Select your vehicle and parking preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div>
                <Label htmlFor="vehicleType" className="text-gray-700 font-medium">Vehicle Type</Label>
                <Select onValueChange={(value) => setBookingData({ ...bookingData, vehicleType: value })}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">🚗 Car</SelectItem>
                    <SelectItem value="motorcycle">🏍️ Motorcycle</SelectItem>
                    <SelectItem value="suv">🚙 SUV</SelectItem>
                    <SelectItem value="truck">🚚 Truck</SelectItem>
                    <SelectItem value="electric">⚡ Electric Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numberPlate" className="text-gray-700 font-medium">License Plate</Label>
                <Input
                  id="numberPlate"
                  value={bookingData.numberPlate}
                  onChange={handleNumberPlateChange}
                  placeholder="ABC-1234"
                  className="border-purple-200 focus:border-purple-500 font-mono text-center"
                  maxLength={12}
                />
                <p className="text-xs text-gray-500 mt-1">Letters, numbers, and hyphens only</p>
              </div>

              <div>
                <Label htmlFor="area" className="text-gray-700 font-medium">Parking Area</Label>
                <Select onValueChange={(value) => setBookingData({ ...bookingData, area: value })}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500">
                    <SelectValue placeholder="Select parking area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">🏙️ Downtown</SelectItem>
                    <SelectItem value="shopping mall">🛒 Shopping Mall</SelectItem>
                    <SelectItem value="airport">✈️ Airport</SelectItem>
                    <SelectItem value="business district">🏢 Business District</SelectItem>
                    <SelectItem value="university campus">🎓 University Campus</SelectItem>
                    <SelectItem value="hospital complex">🏥 Hospital Complex</SelectItem>
                    <SelectItem value="sports stadium">🏟️ Sports Stadium</SelectItem>
                    <SelectItem value="tech park">💻 Tech Park</SelectItem>
                    <SelectItem value="metro station">🚇 Metro Station</SelectItem>
                    <SelectItem value="city center">🌆 City Center</SelectItem>
                    <SelectItem value="resort complex">🏖️ Resort Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="text-gray-700 font-medium">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={bookingData.startTime}
                    onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-gray-700 font-medium">End Time</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={bookingData.endTime}
                    onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>

              {selectedSlot && (
                <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Selected Slot
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Slot:</span>
                      <span className="font-medium">{selectedSlot.slotNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-medium">{selectedSlot.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium">{selectedSlot.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{calculateDuration()}h</span>
                    </div>
                    <div className="flex justify-between col-span-2 pt-2 border-t border-purple-200">
                      <span className="text-gray-600">Total Cost:</span>
                      <span className="font-bold text-green-600 text-lg">${getTotalCost()}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleBookSlot} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!bookingData.numberPlate || !bookingData.vehicleType || getTotalCost() > user.wallet}
                  >
                    {getTotalCost() > user.wallet ? 'Insufficient Balance' : `Book Slot - $${getTotalCost()}`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Parking Slot Grid */}
          <Card className="lg:col-span-2 shadow-xl border-0 bg-white/90 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Live Parking Map</span>
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Real-time availability - Click to select a slot
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ParkingSlotGrid
                slots={mockSlots}
                selectedSlot={selectedSlot}
                onSlotSelect={handleSlotSelect}
                area={bookingData.area}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PIN Verification Modal */}
      <PINVerification
        isOpen={showPinVerification}
        onClose={() => setShowPinVerification(false)}
        userPin={user.pin}
        onPinVerified={handlePinVerified}
      />

      {/* Entry QR Code Modal */}
      {showEntryQR && selectedSlot && (
        <QRCodeModal
          isOpen={showEntryQR}
          onClose={() => {
            setShowEntryQR(false);
            setBookingConfirmed(false);
            setSelectedSlot(null);
          }}
          type="entry"
          bookingData={{
            ...bookingData,
            slot: selectedSlot,
            user: user,
            totalCost: getTotalCost(),
            duration: calculateDuration()
          }}
          isPaymentComplete={bookingConfirmed}
        />
      )}
    </div>
  );
};

export default Dashboard;







// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { MapPin } from 'lucide-react';
// import DashboardHeader from './DashboardHeader';
// import BookingForm from './BookingForm';
// import ParkingSlotGrid from './ParkingSlotGrid';
// import PINVerification from './PINVerification';
// import QRCodeModal from './QRCodeModal';
// import { mockSlots } from '../data/mockSlots';

// interface DashboardProps {
//   user: any;
//   onLogout: () => void;
//   onUpdateUser: (user: any) => void;
// }

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

// const Dashboard = ({ user, onLogout, onUpdateUser }: DashboardProps) => {
//   const [bookingData, setBookingData] = useState<BookingData>({
//     vehicleType: '',
//     numberPlate: '',
//     area: '',
//     startTime: '',
//     endTime: ''
//   });
  
//   const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
//   const [showPinVerification, setShowPinVerification] = useState(false);
//   const [showEntryQR, setShowEntryQR] = useState(false);
//   const [bookingConfirmed, setBookingConfirmed] = useState(false);

//   const handleSlotSelect = (slot: ParkingSlot) => {
//     setSelectedSlot(slot);
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

//   const handleBookSlot = () => {
//     if (selectedSlot && selectedSlot.price <= user.wallet) {
//       setShowPinVerification(true);
//     } else if (selectedSlot && selectedSlot.price > user.wallet) {
//       alert(`Insufficient wallet balance. Required: $${selectedSlot.price}, Available: $${user.wallet}`);
//     }
//   };

//   const handlePinVerified = () => {
//     if (selectedSlot) {
//       const updatedUser = { ...user, wallet: user.wallet - getTotalCost() };
//       onUpdateUser(updatedUser);
//       setBookingConfirmed(true);
//       setShowPinVerification(false);
//       setShowEntryQR(true);
//     }
//   };

//   const handleRechargeWallet = () => {
//     const updatedUser = { ...user, wallet: user.wallet + 500 };
//     onUpdateUser(updatedUser);
//     alert('Wallet recharged with $500!');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
//       <DashboardHeader 
//         user={user} 
//         onLogout={onLogout} 
//         onRechargeWallet={handleRechargeWallet}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           <BookingForm
//             bookingData={bookingData}
//             setBookingData={setBookingData}
//             selectedSlot={selectedSlot}
//             onBookSlot={handleBookSlot}
//             userWallet={user.wallet}
//           />

//           <Card className="lg:col-span-2 shadow-xl border-0 bg-white/90 backdrop-blur-md">
//             <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
//               <CardTitle className="flex items-center space-x-2">
//                 <MapPin className="h-5 w-5" />
//                 <span>Live Parking Map</span>
//               </CardTitle>
//               <CardDescription className="text-indigo-100">
//                 Real-time availability - Click to select a slot
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-6">
//               <ParkingSlotGrid
//                 slots={mockSlots}
//                 selectedSlot={selectedSlot}
//                 onSlotSelect={handleSlotSelect}
//                 area={bookingData.area}
//               />
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <PINVerification
//         isOpen={showPinVerification}
//         onClose={() => setShowPinVerification(false)}
//         userPin={user.pin}
//         onPinVerified={handlePinVerified}
//       />

//       {showEntryQR && selectedSlot && (
//         <QRCodeModal
//           isOpen={showEntryQR}
//           onClose={() => {
//             setShowEntryQR(false);
//             setBookingConfirmed(false);
//             setSelectedSlot(null);
//           }}
//           type="entry"
//           bookingData={{
//             ...bookingData,
//             slot: selectedSlot,
//             user: user,
//             totalCost: getTotalCost(),
//             duration: calculateDuration()
//           }}
//           isPaymentComplete={bookingConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
