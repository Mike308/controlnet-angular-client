
export class TemperatureModel {
  slotName: string;
  sensorId: number;
  temperature: number;
  date: string;

  constructor(slotName: string, temperature: number, date: string, sensorId: number) {
    this.slotName = slotName;
    this.temperature = temperature;
    this.date = date;
    this.sensorId = sensorId;
  }
}
