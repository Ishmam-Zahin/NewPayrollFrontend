export default async function deleteComponent({ token, id }) {
  const url = `http://127.0.0.1:8000/api/v1/globalComponent/detail/${id}/`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    console.log(response);
    throw Error("failed");
  }
  const data = await response.json();
  return data;
}
