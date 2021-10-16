import {KeyStogare} from './../../config/KeyStorage';
import {AxiosResponse} from 'axios';
import {axiosInstance, setKey} from '../../utils';
import {reject, resolves, start} from '../auth';
import {AppDispatch} from '../stores';

export interface LoginRespone {
  token: string;
  user: User;
}

export interface User {
  role: string;
  isActive: boolean;
  devicesEsp: string[];
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export const login =
  ({username, password}: {username: string; password: string}) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());
    try {
      const result: AxiosResponse<LoginRespone> = await axiosInstance.post(
        '/users/login',
        {
          username,
          password,
        },
      );

      await setKey(KeyStogare.Token, result.data.token);

      dispatch(resolves({user: result.data.user, token: result.data.token}));
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
