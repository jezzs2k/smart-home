import { AxiosResponse } from "axios";
import { axiosInstance } from "../../utils";
import {
  reject,
  resolves,
  start,
  uploadDeviceSuccess,
  deviceById,
  deleteDeivece,
} from "../device";
import { AppDispatch } from "../stores";
import { getToken } from "../../config/stores/getToken";

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
  const token = await getToken();
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  dispatch(start());
  try {
    const result: AxiosResponse<DeviceT[]> = await axiosInstance.get(
      "/devices",
      config
    );

    if (result) {
      console.log("result.data ", result.data);

      dispatch(resolves({ data: result.data }));
    } else {
      dispatch(reject({ error: "Internal Server" }));
    }
  } catch (error) {
    dispatch(reject({ error: error }));
  }
};

export const getDeviceById = (id: string) => async (dispatch: AppDispatch) => {
  const token = await getToken();

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  dispatch(start());
  try {
    const result: AxiosResponse<DeviceT> = await axiosInstance.get(
      "/devices/" + id,
      config
    );

    if (result) {
      dispatch(deviceById({ deviceById: result.data }));
    } else {
      dispatch(reject({ error: "Internal Server" }));
    }
  } catch (error) {
    dispatch(reject({ error: error }));
  }
};

export interface DeviceUploadParamsT {
  deviceId: string;
  deviceName: string;
  deviceType?: string;
}

export const upLoadDevices =
  (parmas: DeviceUploadParamsT) => async (dispatch: AppDispatch) => {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    dispatch(start());
    try {
      const result: AxiosResponse<DeviceT> = await axiosInstance.post(
        "/devices",
        parmas,
        config
      );

      if (result) {
        dispatch(uploadDeviceSuccess({ deviceUploaded: result.data }));
      } else {
        dispatch(reject({ error: "Internal Server" }));
      }
    } catch (error) {
      dispatch(reject({ error: error }));
    }
  };

export const deleteDevice =
  (deviceId: string) => async (dispatch: AppDispatch) => {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    dispatch(start());
    try {
      const result: AxiosResponse<DeviceT> = await axiosInstance.delete(
        "/devices" + "/" + deviceId,
        config
      );

      if (result) {
        dispatch(deleteDeivece());
      } else {
        dispatch(reject({ error: "Internal Server" }));
      }
    } catch (error) {
      dispatch(reject({ error: error }));
    }
  };
