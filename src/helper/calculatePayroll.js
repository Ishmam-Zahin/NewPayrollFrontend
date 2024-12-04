export default async function calculatePayroll({ token, data }) {
  const url = `http://127.0.0.1:8000/api/v1/payslip/list/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw Error("failed");
  }

  const data2 = await response.json();
  return data2;
}
