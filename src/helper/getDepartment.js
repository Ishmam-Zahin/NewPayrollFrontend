export default async function getDepartment({ token }) {
  const url = "http://127.0.0.1:8000/api/v1/department/list/";
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
