import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BluetoothStatusProps {
  isConnected: boolean;
  onConnect: () => void;
}

const BluetoothStatus = ({ isConnected, onConnect }: BluetoothStatusProps) => {
  const handleConnect = async () => {
    try {
      await onConnect();
      toast.success('Connected to device');
    } catch (error) {
      toast.error('Failed to connect to device');
      console.error('Bluetooth connection error:', error);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      className={`fixed top-4 right-4 ${
        isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
      }`}
    >
      {isConnected ? 'Connected' : 'Connect'}
    </Button>
  );
};

export default BluetoothStatus;