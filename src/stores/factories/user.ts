import { AxiosResponse } from "axios";
import { axiosInstance } from "../../utils";
import { reject, resolves, start } from "../user";
import { AppDispatch } from "../stores";
import { getToken } from "../../config/stores/getToken";

export interface WorkerT {
  isRunning: boolean;
  name: string;
  seconds: number;
  createdAt: Date;
}
export interface User {
  role: string;
  isActive: boolean;
  firstname?: string;
  lastname?: string;
  devicesEsp: string[];
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
  workers?: WorkerT[];
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
      const token = await getToken();

      let config = {
        headers: {
          Authorization: "Bearer " + token,
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

      const result: AxiosResponse<User> = await axiosInstance.put(
        "/users",
        params,
        config
      );

      if (result?.data) {
        dispatch(resolves({ data: result.data }));
      } else {
        dispatch(reject({ error: "Internal Server" }));
      }
    } catch (error) {
      dispatch(reject({ error: error }));
    }
  };

export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(start());

  try {
    const token = await getToken();

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const result: AxiosResponse<User> = await axiosInstance.get(
      "/users",
      config
    );

    if (result?.data) {
      dispatch(resolves({ data: result.data }));
    } else {
      dispatch(reject({ error: "Internal Server" }));
    }
  } catch (error) {
    dispatch(reject({ error: error }));
  }
};
