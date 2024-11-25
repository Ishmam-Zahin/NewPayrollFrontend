export default async function getDepartment({ token }) {
  const url = "https://ishmam420.pythonanywhere.com/api/v1/department/list/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw Error("failed to get dpts");
  }

  const data = response.json();

  return data;
}
