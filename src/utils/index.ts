export {default as axiosInstance} from './AxiosConfig';
export * from './storage';

export const idEspJust_36_char = (id: string) => {
  console.log(id.length);

  let val = '';

  if (id.length > 36) {
    for (let i = 0; i < 36; ++i) {
      val += String(id[i]);
    }
  } else if (id.length < 36) {
    for (let i = 0; i < 36; ++i) {
      val += String(id[i] || String(Math.random())[4]);
    }
  } else {
    val = id;
  }

  console.log(val, val.length);
  return val;
};