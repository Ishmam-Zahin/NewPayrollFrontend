import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

import uploadPhoto from "../../helper/uploadPhoto";

export default function EmployeePhoto({ employee, token }) {
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeDetail"] });
    },
  });

  if (isError) {
    console.log(error);
  }
  return (
    <div className="employee-container__img">
      <div className="img-box">
        <img
          src={
            employee.image_url === null
              ? "/images/employeephoto.png"
              : employee.image_url
          }
          alt="images/employeephoto.png"
        />
      </div>
      <div className="btn-img">
        <label for="upload-photo"></label>
        <input
          id="upload-photo"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button
          onClick={() => mutate({ token, employee, image })}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Change Photo"}
        </button>
      </div>
    </div>
  );
}
