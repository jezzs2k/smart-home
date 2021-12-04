import {AxiosResponse} from 'axios';
import {axiosInstance} from '../../utils';
import {
  reject,
  resolves,
  start,
  uploadDeviceSuccess,
  updateDevice,
  deviceById,
  deleteDeivece,
} from '../device';
import {AppDispatch} from '../stores';
import {getToken} from '../../config/stores/getToken';

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
  icon: number;
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
  const token = await getToken();
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
  const token = await getToken();

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
  deviceName?: string;
  deviceType?: string;
  icon?: number;
}

export const upLoadDevices =
  (parmas: DeviceUploadParamsT) => async (dispatch: AppDispatch) => {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    dispatch(start());
    try {
      if (typeof parmas.icon !== 'number') {
        parmas.icon = 0;
      }

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

export const updateDevices =
  (parmas: DeviceUploadParamsT) => async (dispatch: AppDispatch) => {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    dispatch(start());
    try {
      const result: AxiosResponse<DeviceT> = await axiosInstance.put(
        '/devices/' + parmas.deviceId,
        {deviceName: parmas.deviceName, icon: parmas.icon},
        config,
      );

      if (result) {
        dispatch(updateDevice({deviceUpdated: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };

export const deleteDevice =
  (deviceId: string) => async (dispatch: AppDispatch) => {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    dispatch(start());
    try {
      const result: AxiosResponse<DeviceT> = await axiosInstance.delete(
        '/devices' + '/' + deviceId,
        config,
      );

      if (result) {
        dispatch(deleteDeivece());
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
