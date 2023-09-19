export async function configJsonHeaders(setLoading = false) {
  const token = localStorage.getItem("token");
  if (!token) {
    if (setLoading) {
      setLoading(false);
    }
    return null;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
