import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import createEmployee from "../../helper/createEmployee";

export default function CreateEmployeeButton({ employee, token, setVisible }) {
  const queryClinet = useQueryClient();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["employeeList"] });
      setVisible(false);
    },
  });

  if (isError) {
    console.log(error);
  }
  return (
    <div>
      <button
        className="btn btn-create"
        onClick={() => mutate({ employee, token })}
        disabled={isPending}
      >
        {isPending ? "Loading.." : "CREATE"}
      </button>
    </div>
  );
}
