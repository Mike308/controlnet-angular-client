import {ModuleModel} from './module.model';
import {TemperatureModel} from './temperature.model';
import {HumidityMeasurementsModel} from './humidity.measurements.model';
import {LightIntensityMeasurements} from './light.intensity.measurements';

export class HubModel {
  modudle: ModuleModel;
  temperatures: TemperatureModel[] = [];
  humidityMeasurements: HumidityMeasurementsModel[] = [];
  lightIntensityMeasurements: LightIntensityMeasurements[] = [];
}


