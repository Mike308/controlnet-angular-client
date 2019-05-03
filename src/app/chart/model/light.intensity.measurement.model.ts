export class LightIntensityMeasurementModel {
  id: number;
  lightIntensity: number;
  sensorType: string;
  slotName: string;
  sensorId: number;
  data: string;


  constructor(id: number, lightIntensity: number, sensorType: string, slotName: string, sensorId: number, data: string) {
    this.id = id;
    this.lightIntensity = lightIntensity;
    this.sensorType = sensorType;
    this.slotName = slotName;
    this.sensorId = sensorId;
    this.data = data;
  }
}
