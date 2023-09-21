import axiosCustomer from "../config/axios";
import { configMultipartHeaders } from "../helpers/configMultipartHeaders";

export async function newCestino({ formData }) {
  const config = await configMultipartHeaders();
  if (!config) return;

  const { data } = await axiosCustomer.post("/producto", formData, config);
  const { createdAt, updatedAt, __v, ...cestinoStored } = data;
  return cestinoStored;
}
