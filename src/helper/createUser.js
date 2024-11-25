export default async function createUser({
  token,
  userName,
  password,
  department,
}) {
  const url = "https://ishmam420.pythonanywhere.com/api/v1/account/list/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user_name: userName,
      password: password,
      department: department,
    }),
  });

  if (!response.ok) {
    throw Error("User Create Failed");
  }

  const data = await response.json();

  return data;
}