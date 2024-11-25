import { useReducer } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import addCustomComponent from "../../helper/addCustomComponent";

function reducer(state, action) {
  switch (action.type) {
    case "change/name":
      return { ...state, name: action.payload };
    case "change/type":
      return { ...state, component_type: action.payload };
    case "change/amount":
      return { ...state, amount: parseInt(action.payload) };
    case "change/dsc":
      return { ...state, dsc: action.payload };
    default:
      throw Error("Unknown action");
  }
}

export default function CustomComponentForm({ token, setVisible, employeeId }) {
  const defaultState = {
    employee: employeeId,
    name: "",
    component_type: "compensation",
    amount: 0,
    dsc: "",
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addCustomComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeDetail"] });
      setVisible(false);
    },
  });

  if (isError) {
    console.log(error);
  }
  return (
    <div className="floating-form">
      <h2>
        Custom Component{" "}
        <button
          onClick={() => setVisible(false)}
          className="btn btn-small btn-red"
        >
          Cancel
        </button>
      </h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "change/name", payload: e.target.value })
          }
        />
      </div>
      <div>
        <label for="type">Type</label>
        <select
          id="type"
          value={state.component_type}
          onChange={(e) =>
            dispatch({ type: "change/type", payload: e.target.value })
          }
        >
          <option value="compensation">Compensation</option>
          <option value="deduction">Deduction</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          placeholder="amount"
          value={state.amount}
          onChange={(e) =>
            dispatch({ type: "change/amount", payload: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={state.dsc}
          onChange={(e) =>
            dispatch({ type: "change/dsc", payload: e.target.value })
          }
        />
      </div>
      <div>
        <button
          className="btn btn-small btn-green"
          disabled={isPending}
          onClick={() => mutate({ token, component: state, id: employeeId })}
        >
          {isPending ? "Loading" : "CREATE"}
        </button>
      </div>
    </div>
  );
}
