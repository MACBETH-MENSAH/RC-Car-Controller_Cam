export class BluetoothController {
  private device: BluetoothDevice | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;

  async connect() {
    try {
      console.log('Requesting Bluetooth device...');
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'ESP32' }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
      });

      console.log('Connecting to GATT server...');
      const server = await this.device.gatt?.connect();
      
      console.log('Getting service...');
      const service = await server?.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
      
      console.log('Getting characteristic...');
      this.characteristic = await service?.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
      
      return true;
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      throw error;
    }
  }

  async sendCommand(command: string) {
    if (!this.characteristic) {
      throw new Error('Bluetooth not connected');
    }
    
    const encoder = new TextEncoder();
    await this.characteristic.writeValue(encoder.encode(command));
  }

  isConnected(): boolean {
    return this.device?.gatt?.connected ?? false;
  }

  async disconnect() {
    if (this.device?.gatt?.connected) {
      await this.device.gatt.disconnect();
    }
  }
}