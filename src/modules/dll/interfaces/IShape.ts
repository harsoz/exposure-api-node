interface IShape {
    ExecuteAlgorithm(shapeName: string, req: HttpRequest): number;
    RegisterAlgorithm(req: HttpRequest): DatabaseResponse<DatabaseDefaultResponse>;
    GetShapes(): DatabaseResponse<Shape>;
    GetShapesForApi(): DatabaseResponse<ShapeForApi>;
    RemoveShape(shapeName: string): DatabaseResponse<DatabaseDefaultResponse>;
  }