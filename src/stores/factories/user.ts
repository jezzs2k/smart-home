import {AxiosResponse} from 'axios';
import {axiosInstance, getKey} from '../../utils';
import {reject, resolves, start} from '../user';
import {AppDispatch} from '../stores';
import {KeyStogare} from '../../config/KeyStorage';

export interface UpdateUsersRespone {
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

export const updateUsers =
  ({
    firstname,
    lastname,
    deviceToken,
  }: {
    firstname?: string;
    lastname?: string;
    deviceToken?: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      const token = await getKey(KeyStogare.Token);

      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const params: {
        firstname?: string;
        lastname?: string;
        deviceToken?: string;
      } = {};

      if (firstname) {
        params.firstname = firstname;
      }

      if (lastname) {
        params.lastname = lastname;
      }

      if (deviceToken) {
        params.deviceToken = deviceToken;
      }

      const result: AxiosResponse<UpdateUsersRespone> = await axiosInstance.put(
        '/users',
        params,
        config,
      );

      if (result?.data) {
        dispatch(resolves({data: result.data.user}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
