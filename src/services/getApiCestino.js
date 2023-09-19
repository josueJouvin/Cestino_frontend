import axiosCustomer from "../config/axios";
import { configJsonHeaders } from "../helpers/configJsonHeaders";

export async function getApiCestino() {
  const config = await configJsonHeaders();
  if (!config) return;

  const { data } = await axiosCustomer("/producto", config);
  return data;
}
