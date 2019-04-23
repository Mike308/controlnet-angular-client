export class TemperatureModel {
  temperatureId: number;
  sensorId: number;
  slotName: string;
  temperature: number;
  sensorType: string;


  constructor(temperatureId: number, sensorId: number, slotName: string, temperature: number, sensorType: string) {
    this.temperatureId = temperatureId;
    this.sensorId = sensorId;
    this.slotName = slotName;
    this.temperature = temperature;
    this.sensorType = sensorType;
  }
}
