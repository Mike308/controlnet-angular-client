import {ModuleModel} from './module.model';
import {TemperatureModel} from './temperature.model';
import {HumidityMeasurementModel} from './humidity.measurement.model';
import {LightIntensityMeasurements} from './light.intensity.measurements';

export class HubModel {
  modudle: ModuleModel;
  temperatures: TemperatureModel[] = [];
  humidityMeasurements: HumidityMeasurementModel[] = [];
  lightIntensityMeasurements: LightIntensityMeasurements[] = [];
}


