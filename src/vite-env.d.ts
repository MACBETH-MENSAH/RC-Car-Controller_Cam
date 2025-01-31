/// <reference types="vite/client" />

interface BluetoothRemoteGATTCharacteristic {
  writeValue(value: BufferSource): Promise<void>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  connected: boolean;
  disconnect(): void;
}

interface BluetoothDevice {
  gatt?: BluetoothRemoteGATTServer;
  name?: string;
}

interface Navigator {
  bluetooth: {
    requestDevice(options: {
      filters: Array<{ namePrefix: string }>;
      optionalServices: string[];
    }): Promise<BluetoothDevice>;
  };
}