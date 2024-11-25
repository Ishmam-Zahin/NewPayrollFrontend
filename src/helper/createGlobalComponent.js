export default async function createGlobalComponent({ component, token }) {
  const url =
    "https://ishmam420.pythonanywhere.com/api/v1/globalComponent/list/";
  const response = await fetch(url, {
    method: "POST",
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
