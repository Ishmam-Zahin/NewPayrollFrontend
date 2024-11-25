export default async function getUserList({ token }) {
  const url = "https://ishmam420.pythonanywhere.com/api/v1/account/list/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Error occured");
  }
  const data = await response.json();

  return data;
}
