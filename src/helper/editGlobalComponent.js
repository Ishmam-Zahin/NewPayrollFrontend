export default async function createGlobalComponent({ component, token, id }) {
  const url = `http://127.0.0.1:8000/api/v1/globalComponent/detail/${id}/`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(component),
  });
  if (!response.ok) {
    throw Error("failed");
  }
  const data = response.json();

  return data;
}
