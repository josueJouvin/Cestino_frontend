export async function configMultipartHeaders() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
