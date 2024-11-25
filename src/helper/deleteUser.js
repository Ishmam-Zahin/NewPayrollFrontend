export default async function deleteUser({ token, userId }) {
  const url = `https://ishmam420.pythonanywhere.com/api/v1/account/detail/${userId}/`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw Error("Delete Faild");
  }
  const data = await response.json();
  return data;
}
