export default async function uploadPhoto({ token, employee, image }) {
  const formData = new FormData();
  formData.append("image", image);
  const url = `https://api.imgbb.com/1/upload?key=${"a99a442885c9495bff164f3898872d35"}`;
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw Error("failed");
  }

  const data = await response.json();

  const employeeId = employee["id"];
  delete employee["id"];
  delete employee["globalComponents"];
  employee["department"] = employee["department"]["id"];
  employee["image_url"] = data["data"]["url"];

  console.log(employee);

  const url2 = `http://127.0.0.1:8000/api/v1/employee/detail/${employeeId}/`;
  const response2 = await fetch(url2, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(employee),
  });

  if (!response2.ok) {
    throw Error("Failed");
  }

  const data2 = response2.json();
  return data2;
}
