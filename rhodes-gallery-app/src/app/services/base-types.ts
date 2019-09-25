import {environment} from '../../environments/environment';

export class Configuration {
  production: boolean;
  backendBaseUri: string;
}

export class Result<T> {
  case: string;
  fields: T[];
}

export const configuration: Configuration = environment;
