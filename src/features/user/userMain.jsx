import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";

import getUserList from "../../helper/getUserList";
import UserCard from "./userCard";
import NewUser from "./newUser";

export default function UserMain() {
  const token = useSelector((state) => state.userState.token);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getUserList({ token }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Failed to Load Users</div>;
  }

  return (
    <div className="main-area user-page-container">
      <h1>Site Administrators</h1>
      <NewUser token={token} />
      <div className="userCard userCardHeader">
        <div>No</div>
        <div>Name</div>
        <div>Department</div>
        <div>Last Login</div>
        <div>Admin</div>
        <div>Active</div>
        <div>Actions</div>
      </div>
      {data.map((user, index) => (
        <UserCard user={user} no={index + 1} key={user.id} />
      ))}
    </div>
  );
}
