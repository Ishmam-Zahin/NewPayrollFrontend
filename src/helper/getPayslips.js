export default async function getPayslips({ token }) {
  const url = `https://ishmam420.pythonanywhere.com/api/v1/payslip/list/`;
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

  const data2 = await response.json();
  return data2;
}
