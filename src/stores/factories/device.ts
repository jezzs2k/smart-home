import {KeyStogare} from './../../config/KeyStorage';
import {AxiosResponse} from 'axios';
import {axiosInstance, getKey} from '../../utils';
import {
  reject,
  resolves,
  start,
  uploadDeviceSuccess,
  deviceById,
} from '../device';
import {AppDispatch} from '../stores';

export interface DeviceT {
  isConnected: boolean;
  isTurnOn: boolean;
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

    if (result) {
      dispatch(resolves({data: result.data}));
    } else {
      dispatch(reject({error: 'Internal Server'}));
    }
  } catch (error) {
    dispatch(reject({error: error}));
  }
};

export const getDeviceById = (id: string) => async (dispatch: AppDispatch) => {
  const token = await getKey(KeyStogare.Token);

  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  dispatch(start());
  try {
    const result: AxiosResponse<DeviceT> = await axiosInstance.get(
      '/devices/' + id,
      config,
    );

    if (result) {
      dispatch(deviceById({deviceById: result.data}));
    } else {
      dispatch(reject({error: 'Internal Server'}));
    }
  } catch (error) {
    dispatch(reject({error: error}));
  }
};

export interface DeviceUploadParamsT {
  deviceId: string;
  deviceName: string;
  deviceType?: string;
}

export const upLoadDevices =
  (parmas: DeviceUploadParamsT) => async (dispatch: AppDispatch) => {
    const token = await getKey(KeyStogare.Token);

    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    dispatch(start());
    try {
      const result: AxiosResponse<DeviceT> = await axiosInstance.post(
        '/devices',
        parmas,
        config,
      );

      if (result) {
        dispatch(uploadDeviceSuccess({deviceUploaded: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
