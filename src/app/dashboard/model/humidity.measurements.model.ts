export class HumidityMeasurementsModel {
  id: number;
  sensorId: number;
  slotName: string;
  humidity: string;
  sensorType: string;

  constructor(id: number, sensorId: number, slotName: string, humidity: string, sensorType: string) {
    this.id = id;
    this.sensorId = sensorId;
    this.slotName = slotName;
    this.humidity = humidity;
    this.sensorType = sensorType;
  }
  
}
