import axiosCustomer from "../config/axios";
import { configJsonHeaders } from "../helpers/configJsonHeaders";

export async function deletedApiCestino({ id }) {
  const config = await configJsonHeaders();
  if (!config) return;

  const { data } = await axiosCustomer.delete(`/producto/${id}`, config);
  return data;
}
