import {AxiosResponse} from 'axios';
import {axiosInstance, getKey} from '../../utils';
import {reject, resolves, start} from '../timeOut';
import {AppDispatch} from '../stores';
import {KeyStogare} from '../../config/KeyStorage';

export interface CreateWorkerRespone {
  success: Boolean;
}

export const createTimeOut =
  ({deviceId, seconds}: {deviceId: string; seconds: number}) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      const token = await getKey(KeyStogare.Token);

      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const result: AxiosResponse<CreateWorkerRespone> =
        await axiosInstance.post('/worker', {deviceId, seconds}, config);

      if (result?.data) {
        dispatch(resolves({data: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };

export const cancelTimeOut =
  ({deviceId}: {deviceId: string}) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      const token = await getKey(KeyStogare.Token);

      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const result: AxiosResponse<CreateWorkerRespone> =
        await axiosInstance.delete('/worker/' + deviceId, config);

      if (result?.data) {
        dispatch(resolves({data: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };

export const checkTimeOut =
  ({deviceId}: {deviceId: string}) =>
  async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      const token = await getKey(KeyStogare.Token);

      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const result: AxiosResponse<CreateWorkerRespone> =
        await axiosInstance.delete('/worker/check/' + deviceId, config);

      if (result?.data) {
        dispatch(resolves({data: result.data}));
      } else {
        dispatch(reject({error: 'Internal Server'}));
      }
    } catch (error) {
      dispatch(reject({error: error}));
    }
  };
