import {getKey} from '../../utils';
import {KeyStogare} from '../KeyStorage';

export const getToken = async () => await getKey(KeyStogare.Token);
