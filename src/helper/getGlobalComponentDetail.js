export default async function getGlobalComponent({ id, token }) {
  const url = `https://ishmam420.pythonanywhere.com/api/v1/globalComponent/detail/${id}/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("failed");
  }

  const data = await response.json();
  return data;
}
