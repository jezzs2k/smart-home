import {AxiosResponse} from 'axios';
import {axiosInstance} from '../../utils';
import {register, reject, start} from '../auth';
import {AppDispatch} from '../stores';
import {User} from './login';

export const registerAction =
  ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());
    try {
      const result: AxiosResponse<User> = await axiosInstance.post(
        '/users/register',
        {
          username,
          password,
          email,
        },
      );

      if (result) {
        dispatch(register({data: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
