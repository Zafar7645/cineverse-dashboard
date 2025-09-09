import { secrets } from './environment.secrets';

export const environment = {
  production: false,
  ...secrets,
};
