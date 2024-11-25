export default async function createEmployee({ employee, token }) {
  const url = "https://ishmam420.pythonanywhere.com/api/v1/employee/list/";
  const response = await fetch(url, {
    method: "POST",
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
