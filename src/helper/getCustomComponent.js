export default async function getCustomComponent({ token, id }) {
  const url = `http://127.0.0.1:8000/api/v1/customComponent/list/${id}/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    return Error("Failed");
  }

  const data = response.json();

  return data;
}
