export default async function deleteUser({ token, userId }) {
  const url = `http://127.0.0.1:8000/api/v1/account/detail/${userId}/`;
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
