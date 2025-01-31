import React, { useState, useCallback } from 'react';
import VideoFeed from '@/components/VideoFeed';
import Controls from '@/components/Controls';
import BluetoothStatus from '@/components/BluetoothStatus';
import { BluetoothController } from '@/lib/bluetooth';
import { useToast } from '@/components/ui/use-toast';

const bluetooth = new BluetoothController();

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [ledOn, setLedOn] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await bluetooth.connect();
      setIsConnected(true);
      console.log('Successfully connected to device');
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    }
  };

  const handleMove = useCallback(async (x: number, y: number, joystick: 'movement' | 'camera') => {
    if (!isConnected) return;

    try {
      const command = `${joystick}:${x.toFixed(2)},${y.toFixed(2)}`;
      await bluetooth.sendCommand(command);
      console.log(`Sent ${joystick} command:`, command);
    } catch (error) {
      console.error(`Failed to send ${joystick} command:`, error);
      toast({
        title: 'Connection Error',
        description: 'Failed to send command to device',
        variant: 'destructive',
      });
    }
  }, [isConnected, toast]);

  const handleSpeedChange = useCallback(async (value: number) => {
    setSpeed(value);
    if (!isConnected) return;

    try {
      await bluetooth.sendCommand(`speed:${value}`);
      console.log('Sent speed command:', value);
    } catch (error) {
      console.error('Failed to send speed command:', error);
    }
  }, [isConnected]);

  const handleLedToggle = useCallback(async (checked: boolean) => {
    setLedOn(checked);
    if (!isConnected) return;

    try {
      await bluetooth.sendCommand(`led:${checked ? 'on' : 'off'}`);
      console.log('Sent LED command:', checked);
    } catch (error) {
      console.error('Failed to send LED command:', error);
    }
  }, [isConnected]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <VideoFeed />
      <Controls
        onMove={handleMove}
        onSpeedChange={handleSpeedChange}
        onLedToggle={handleLedToggle}
        speed={speed}
        ledOn={ledOn}
      />
      <BluetoothStatus
        isConnected={isConnected}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default Index;