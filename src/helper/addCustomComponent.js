export default async function addCustomComponent({ token, component, id }) {
  const url = `https://ishmam420.pythonanywhere.com/api/v1/customComponent/list/${id}/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(component),
  });

  if (!response.ok) {
    return Error("Failed");
  }

  const data = response.json();

  return data;
}
