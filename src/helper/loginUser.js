const url = "http://127.0.0.1:8000/api/v1/account/login/";

export default async function loginUser({ userName, password }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: userName,
      password: password,
    }),
  });

  if (!response.ok) {
    throw Error("Invalid Credentials!");
  }

  const data = await response.json();

  return data;
}
