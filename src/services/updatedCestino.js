import axiosCustomer from "../config/axios";
import { configMultipartHeaders } from "../helpers/configMultipartHeaders";

export async function updatedCestino({ cestino, formData }) {
  const config = await configMultipartHeaders();
  if (!config) return;

  const { data } = await axiosCustomer.put(
    `/producto/${cestino.id}`,
    formData,
    config
  );
  return data;
}
