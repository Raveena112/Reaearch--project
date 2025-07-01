import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PINVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  userPin: string;
  onPinVerified: () => void;
}

const PINVerification = ({ isOpen, onClose, userPin, onPinVerified }: PINVerificationProps) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handlePinSubmit = () => {
    if (enteredPin === userPin) {
      setError('');
      setEnteredPin('');
      setAttempts(0);
      onPinVerified();
    } else {
      setError('Wrong PIN. Please try again.');
      setAttempts(prev => prev + 1);
      setEnteredPin('');
      
      if (attempts >= 2) {
        setError('Too many failed attempts. Please try again later.');
        setTimeout(() => {
          onClose();
          setAttempts(0);
          setError('');
        }, 2000);
      }
    }
  };

  const handleClose = () => {
    setEnteredPin('');
    setError('');
    setAttempts(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Security PIN</DialogTitle>
          <DialogDescription>
            Please enter your 4-digit security PIN to complete the payment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="pin">Security PIN</Label>
            <Input
              id="pin"
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 4-digit PIN"
              className="text-center text-lg tracking-widest"
              autoFocus
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-3">
            <Button 
              onClick={handlePinSubmit} 
              disabled={enteredPin.length !== 4 || attempts >= 3}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Verify PIN
            </Button>
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PINVerification;
