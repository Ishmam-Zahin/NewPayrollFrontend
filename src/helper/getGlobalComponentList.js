export default async function getGlobalComponentList({ token }) {
  const url =
    "https://ishmam420.pythonanywhere.com/api/v1/globalComponent/list/";
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
