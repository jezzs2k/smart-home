import {KeyStogare} from './../../config/KeyStorage';
import {AxiosResponse} from 'axios';
import {axiosInstance, getKey} from '../../utils';
import {reject, resolves, start} from '../device';
import {AppDispatch} from '../stores';

export interface DeviceT {
  isConnected: boolean;
  deviceId: string;
  deviceName: string;
  createdBy: CreatedBy;
  deviceType: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface CreatedBy {
  _id: string;
  role: string;
  isActive: boolean;
  devicesEsp: string[];
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export const getDevices = () => async (dispatch: AppDispatch) => {
  const token = await getKey(KeyStogare.Token);

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  dispatch(start());
  try {
    const result: AxiosResponse<DeviceT[]> = await axiosInstance.get(
      '/devices',
      config,
    );

    dispatch(resolves({data: result.data}));
  } catch (error) {
    dispatch(reject({error: error}));
  }
};
