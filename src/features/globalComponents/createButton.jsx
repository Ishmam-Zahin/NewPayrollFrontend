import { useMutation, useQueryClient } from "@tanstack/react-query";

import createGlobalComponent from "../../helper/createGlobalComponent";

export default function CreateButton({ token, component, setVisible }) {
  const queryClient = useQueryClient();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: createGlobalComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["componentList"] });
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
        onClick={() => mutate({ token: token, component: component })}
      >
        {isPending ? "Loading..." : "CREATE"}
      </button>
    </div>
  );
}
