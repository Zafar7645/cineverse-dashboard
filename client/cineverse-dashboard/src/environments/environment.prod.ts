import { secrets } from './environment.secrets';

export const environment = {
  proudction: true,
  ...secrets,
};
