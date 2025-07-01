import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, User, Mail, Pen, Plus, Car, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: any) => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    pin: '',
    confirmPin: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!signInData.email || !signInData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // Check for registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
    const user = registeredUsers.find((u: any) => u.email === signInData.email);
    
    if (!user) {
      setError('Invalid credentials - Email not found');
      return;
    }
    
    if (user.password !== signInData.password) {
      setError('Invalid credentials - Wrong password');
      return;
    }
    
    // Login successful
    onLogin(user);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (signUpData.pin !== signUpData.confirmPin) {
      setError('PIN confirmation does not match');
      return;
    }
    if (signUpData.pin.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }
    if (!signUpData.name || !signUpData.email || !signUpData.mobile || !signUpData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Check if email already exists
    const registeredUsers = JSON.parse(localStorage.getItem('parkpulse_users') || '[]');
    if (registeredUsers.find((u: any) => u.email === signUpData.email)) {
      setError('Email already registered. Please use a different email.');
      return;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: signUpData.name,
      email: signUpData.email,
      mobile: signUpData.mobile,
      password: signUpData.password,
      pin: signUpData.pin,
      wallet: 1000 // Starting wallet balance
    };
    
    // Store user data
    registeredUsers.push(newUser);
    localStorage.setItem('parkpulse_users', JSON.stringify(registeredUsers));
    
    // Clear form and show success message
    setSignUpData({
      name: '',
      mobile: '',
      email: '',
      password: '',
      pin: '',
      confirmPin: ''
    });
    
    setSuccessMessage('Account created successfully! Please sign in with your credentials.');
    
    // Switch to sign in tab after 2 seconds
    setTimeout(() => {
      setSuccessMessage('');
      // Auto-focus sign in tab
      const signInTab = document.querySelector('[data-state="inactive"]') as HTMLElement;
      if (signInTab) signInTab.click();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <QrCode className="h-10 w-10 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ParkPulse
                </h1>
                <p className="text-sm text-gray-500">Smart Parking Revolution</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Revolutionary Parking
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Experience the future of parking with instant bookings, QR-based entry, and seamless wallet payments. 
              Your parking companion in the digital age.
            </p>
            
            {/* Animated Features Preview */}
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Car className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Instant Booking</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <QrCode className="h-8 w-8 text-pink-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">QR Entry</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Shield className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Auth Card */}
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Get Started
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Join thousands of smart parkers today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-purple-100">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-4 mt-6">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div>
                        <Label htmlFor="signin-email" className="text-gray-700 font-medium">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signin-password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="signin-password"
                          type="password"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          placeholder="Enter your password"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      {error && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                          {error}
                        </div>
                      )}
                      {successMessage && (
                        <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                          {successMessage}
                        </div>
                      )}
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div>
                        <Label htmlFor="signup-name" className="text-gray-700 font-medium">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          value={signUpData.name}
                          onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-mobile" className="text-gray-700 font-medium">Mobile Number</Label>
                        <Input
                          id="signup-mobile"
                          type="tel"
                          value={signUpData.mobile}
                          onChange={(e) => setSignUpData({ ...signUpData, mobile: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email Address</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          placeholder="Create a strong password"
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="signup-pin" className="text-gray-700 font-medium">Security PIN</Label>
                          <Input
                            id="signup-pin"
                            type="password"
                            maxLength={4}
                            pattern="[0-9]{4}"
                            value={signUpData.pin}
                            onChange={(e) => setSignUpData({ ...signUpData, pin: e.target.value.replace(/\D/g, '') })}
                            placeholder="4-digit PIN"
                            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="signup-confirm-pin" className="text-gray-700 font-medium">Confirm PIN</Label>
                          <Input
                            id="signup-confirm-pin"
                            type="password"
                            maxLength={4}
                            pattern="[0-9]{4}"
                            value={signUpData.confirmPin}
                            onChange={(e) => setSignUpData({ ...signUpData, confirmPin: e.target.value.replace(/\D/g, '') })}
                            placeholder="Confirm PIN"
                            className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                      {error && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                          {error}
                        </div>
                      )}
                      {successMessage && (
                        <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                          {successMessage}
                        </div>
                      )}
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Why Choose ParkPulse?
            </h3>
            <p className="text-lg text-gray-600">Revolutionary features that transform your parking experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">QR Code Payments</h4>
              <p className="text-gray-600">Lightning-fast payments with secure QR code technology and digital wallet integration</p>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Real-time Availability</h4>
              <p className="text-gray-600">Live parking slot updates with interactive visual maps and instant booking confirmation</p>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">Secure & Smart</h4>
              <p className="text-gray-600">PIN-protected transactions with encrypted data and smart parking management system</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
