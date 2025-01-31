import React from 'react';
import { Joystick } from 'react-joystick-component';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ControlsProps {
  onMove: (x: number, y: number, joystick: 'movement' | 'camera') => void;
  onSpeedChange: (value: number) => void;
  onLedToggle: (checked: boolean) => void;
  speed: number;
  ledOn: boolean;
}

const Controls = ({ onMove, onSpeedChange, onLedToggle, speed, ledOn }: ControlsProps) => {
  const handleMove = (joystick: 'movement' | 'camera') => (event: any) => {
    if (event && typeof event.x === 'number' && typeof event.y === 'number') {
      onMove(event.x, event.y, joystick);
      console.log(`${joystick} joystick:`, { x: event.x, y: event.y });
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="controls-overlay">
        {/* Left Joystick - Movement Control */}
        <div className="fixed bottom-20 left-20 pointer-events-auto">
          <Joystick 
            size={100}
            baseColor="rgba(31, 41, 55, 0.5)"
            stickColor="rgb(0, 242, 254)"
            move={handleMove('movement')}
          />
          <span className="text-sm text-white mt-2 block text-center">Movement</span>
        </div>

        {/* Right Joystick - Camera Control */}
        <div className="fixed bottom-20 right-20 pointer-events-auto">
          <Joystick 
            size={100}
            baseColor="rgba(31, 41, 55, 0.5)"
            stickColor="rgb(0, 242, 254)"
            move={handleMove('camera')}
          />
          <span className="text-sm text-white mt-2 block text-center">Camera</span>
        </div>

        {/* Speed Control */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-64 pointer-events-auto">
          <Label htmlFor="speed" className="text-white mb-2 block text-center">
            Speed: {speed}%
          </Label>
          <Slider
            id="speed"
            min={0}
            max={100}
            step={1}
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            className="w-full"
          />
        </div>

        {/* LED Toggle */}
        <div className="fixed top-4 left-4 flex items-center gap-2 pointer-events-auto">
          <Switch
            id="led-toggle"
            checked={ledOn}
            onCheckedChange={onLedToggle}
          />
          <Label htmlFor="led-toggle" className="text-white">LED</Label>
        </div>
      </div>
    </div>
  );
};

export default Controls;