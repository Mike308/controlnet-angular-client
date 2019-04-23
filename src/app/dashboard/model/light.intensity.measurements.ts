export  class LightIntensityMeasurements {
  id: number;
  lightIntensity: number;
  sensorType: string;
  slotName: string;
  sensorId: number;

  constructor(id: number, lightIntensity: number, sensorType: string, slotName: string, sensorId: number) {
    this.id = id;
    this.lightIntensity = lightIntensity;
    this.sensorType = sensorType;
    this.slotName = slotName;
    this.sensorId = sensorId;
  }
}
