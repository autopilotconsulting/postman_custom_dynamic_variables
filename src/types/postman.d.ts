declare global {
  const pm: Postman;
}

declare namespace Postman {
  type VariableValueType = string | number | null;
  type VariableSetter = (variableName: string, variableValue: Postman.VariableValueType) => void;
}

export interface Postman {
  request: Request;
  environment: Environment;
}

export interface Request {
  body?: RequestBody;
}

export interface RequestBody {
  raw: string;
}

export interface Environment {
  set: Postman.VariableSetter;
}
