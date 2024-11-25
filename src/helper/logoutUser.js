const url = "https://ishmam420.pythonanywhere.com/api/v1/account/logout/";

export default async function logoutUser({ token }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Failed to logout user!");
  }
  const data = await response.json();
  return data;
}
