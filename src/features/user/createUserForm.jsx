import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getDepartment from "../../helper/getDepartment";
import createUser from "../../helper/createUser";

export default function CreateUserForm({ setVisible, token }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [department, setdepartment] = useState(0);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getDpt"],
    queryFn: () => getDepartment({ token }),
  });

  const {
    isPending,
    isError: merror,
    error,
    mutate,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      setVisible(false);
    },
  });

  if (merror) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <div className="user-creation-form">
        <p>Loading</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="user-creation-form">
        <p>Error</p>
      </div>
    );
  }

  return (
    <div className="floating-form user-creation-form">
      <h2>
        Create New user
        <button
          onClick={() => setVisible(false)}
          className="btn btn-red btn-small cancel-btn"
        >
          cancel
        </button>
      </h2>
      <div className="user-creation-form-container">
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
          >
            {data.map((dpt) => (
              <option value={dpt.id} key={dpt.id}>
                {dpt.code_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-green submit-btn"
        onClick={() => {
          mutate({ token, userName, password, department });
        }}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "SUBMIT"}
      </button>
    </div>
  );
}
