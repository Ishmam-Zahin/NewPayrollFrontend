import { useEffect } from "react";
import logoutUser from "../../helper/logoutUser";
import { unsetUser } from "../../states/userSlice";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function LogoutButton({ token }) {
  const dispatch = useDispatch();
  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: logoutUser,
  });
  if (isError) {
    console.log(error);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(unsetUser());
    }
  }, [isSuccess, dispatch]);

  return (
    <button className="btn btn-red" onClick={() => mutate({ token })}>
      {isPending ? "Loading..." : "Logout"}
    </button>
  );
}
