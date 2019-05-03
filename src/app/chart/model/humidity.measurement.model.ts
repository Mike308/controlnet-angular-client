export class HumidityMeasurementModel {
  id: number;
  sensorId: number;
  slotName: string;
  humidity: number;
  sensorType: string;
  date: string;

  constructor(id: number, sensorId: number, slotName: string, humidity: number, sensorType: string, date: string) {
    this.id = id;
    this.sensorId = sensorId;
    this.slotName = slotName;
    this.humidity = humidity;
    this.sensorType = sensorType;
    this.date = date;
  }
}
