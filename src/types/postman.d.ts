declare global {
  const pm: Postman;
}

declare namespace Postman {
  type VariableValueType = string | number | null;
}

export interface Postman {
  request: Request;
  environment: Environment;
}

export interface Request {
  body: RequestBody;
}

export interface RequestBody {
  raw: string;
}

export interface Environment {
  set: (variableName: string, variableValue: Postman.VariableValueType) => void;
}