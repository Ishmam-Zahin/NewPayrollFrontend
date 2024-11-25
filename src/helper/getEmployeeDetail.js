export default async function getEmployeeDetail({ token, employeeId }) {
  const url = `https://ishmam420.pythonanywhere.com/api/v1/employee/detail/${employeeId}/`;
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
