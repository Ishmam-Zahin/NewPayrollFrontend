export default async function EditEmployee({ employee, token, id }) {
  console.log(id);
  const url = `https://ishmam420.pythonanywhere.com/api/v1/employee/detail/${id}/`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw Error("failed");
  }
  const data = response.json();

  return data;
}
