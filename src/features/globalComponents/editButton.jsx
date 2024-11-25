import { useMutation, useQueryClient } from "@tanstack/react-query";

import editGlobalComponent from "../../helper/editGlobalComponent";

export default function EditButton({ token, component, setVisible, id }) {
  const queryClient = useQueryClient();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: editGlobalComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["componentDetail"] });
      setVisible(false);
    },
  });
  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <button
        className="btn btn-green create-btn"
        disabled={isPending}
        onClick={() => mutate({ token, component, id })}
      >
        {isPending ? "Loading..." : "EDIT"}
      </button>
    </div>
  );
}
