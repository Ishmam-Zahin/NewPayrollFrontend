import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import editEmployee from "../../helper/editEmployee";

export default function EditEmployeeButton({
  employee,
  token,
  setVisible,
  id,
}) {
  const queryClinet = useQueryClient();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: editEmployee,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["employeeDetail"] });
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
        onClick={() => mutate({ employee, token, id })}
        disabled={isPending}
      >
        {isPending ? "Loading.." : "EDIT"}
      </button>
    </div>
  );
}
