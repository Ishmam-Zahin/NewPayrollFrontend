import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";

import deleteUser from "../../helper/deleteUser";

export default function UserDeleteButton({ userId, disable }) {
  const token = useSelector((state) => state.userState.token);

  const queryClient = useQueryClient();
  const { error, isError, isPending, mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
  });

  if (isError) {
    console.log(error);
  }

  return (
    <button
      onClick={() => mutate({ token, userId })}
      className="btn btn-red btn-small"
      disabled={disable}
    >
      {isPending ? "Loading..." : "DELETE"}
    </button>
  );
}
