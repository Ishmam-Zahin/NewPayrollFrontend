import { useMutation, useQueryClient } from "@tanstack/react-query";

import deleteComponent from "../../helper/deleteComponent";

export default function DeleteButton({ token, id }) {
  const queryClient = useQueryClient();
  const { isError, isPending, error, mutate } = useMutation({
    mutationFn: deleteComponent,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["componentList"] }),
  });
  if (isError) {
    console.log("i am here");
    console.log(error);
  }
  return (
    <button
      className="btn btn-red btn-small"
      disabled={isPending}
      onClick={() => mutate({ id, token })}
    >
      {isPending ? "Loading..." : "DELETE"}
    </button>
  );
}
