import { IDatabaseResponse } from "../../../core/database.interface";

export interface IService {

    getAll(): Promise<Dll[]>;
    execute(req: any): Promise<number>;
    create(req: any): Promise<IDatabaseResponse<number>>;
    // GetShapes(): DatabaseResponse<Shape>;
    // GetShapesForApi(): DatabaseResponse<ShapeForApi>;
    // RemoveShape(shapeName: string): DatabaseResponse<DatabaseDefaultResponse>;
  }