export async function cestinoFormData(cestino) {
  const formData = new FormData();
  formData.append("image", cestino.image);

  const jsonData = {
    name: cestino.name,
    products: cestino.products,
    subTotal: cestino.subTotal,
    percentage: cestino.percentage,
    profit: cestino.profit,
    total: cestino.total,
  };
  formData.append("jsonData", JSON.stringify(jsonData));

  return formData;
}
