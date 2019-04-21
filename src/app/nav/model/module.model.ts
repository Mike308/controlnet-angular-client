export class ModuleModel {
  id: number;
  name: string;


  constructor(moduleId: number, moduleName: string) {
    this.id = moduleId;
    this.name = moduleName;
  }
}
