import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import loginUser from "../helper/loginUser";
import { setUser } from "../states/userSlice";
import LoginForm from "../features/authentication/loginForm";
import LogoutButton from "../features/authentication/logoutButton";

export default function Header() {
  const navigate = useNavigate();

  const { name, token } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const { data, mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginUser,
  });

  if (isError) {
    console.log(error);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
      if (data["department"] == "center") {
        navigate("users");
      } else {
        navigate("employee/list");
      }
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <header className="main-header">
      <div className="logo">Rajshahi University</div>
      {name === null ? (
        <LoginForm isPending={isPending} mutate={mutate} />
      ) : (
        <div>
          <LogoutButton token={token} />
        </div>
      )}
    </header>
  );
}
