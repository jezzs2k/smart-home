import {setKey} from '../../utils';
import {KeyStogare} from '../KeyStorage';

export const setToken = async (token: string) =>
  await setKey(KeyStogare.Token, token);
