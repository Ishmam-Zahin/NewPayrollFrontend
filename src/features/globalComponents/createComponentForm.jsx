import { useReducer, useState } from "react";

import ConditionForm from "./conditionForm";
import CreateButton from "./createButton";
import EditButton from "./editButton";

const defaultInitialState = {
  component: {
    name: "",
    component_type: "deduction",
  },
  conditions: [
    {
      min_money: 0,
      max_money: 0,
      gender: "female",
      amount: "",
      min_amount: 0,
    },
  ],
};

let defaultInitialCount = 1;

function reducer(state, action) {
  switch (action.type) {
    case "change/name":
      return {
        ...state,
        component: { ...state.component, name: action.payload },
      };
    case "change/type":
      return {
        ...state,
        component: { ...state.component, component_type: action.payload },
      };
    case "change/minMoney":
      return {
        ...state,
        conditions: state.conditions.map((condition, index) => {
          if (index === action.payload.index) {
            return { ...condition, min_money: parseInt(action.payload.value) };
          }
          return condition;
        }),
      };
    case "change/maxMoney":
      return {
        ...state,
        conditions: state.conditions.map((condition, index) => {
          if (index === action.payload.index) {
            return { ...condition, max_money: parseInt(action.payload.value) };
          }
          return condition;
        }),
      };
    case "change/gender":
      return {
        ...state,
        conditions: state.conditions.map((condition, index) => {
          if (index === action.payload.index) {
            return { ...condition, gender: action.payload.value };
          }
          return condition;
        }),
      };
    case "change/amount":
      return {
        ...state,
        conditions: state.conditions.map((condition, index) => {
          if (index === action.payload.index) {
            return { ...condition, amount: action.payload.value };
          }
          return condition;
        }),
      };
    case "change/minAmount":
      return {
        ...state,
        conditions: state.conditions.map((condition, index) => {
          if (index === action.payload.index) {
            return { ...condition, min_amount: parseInt(action.payload.value) };
          }
          return condition;
        }),
      };
    case "increase":
      return {
        ...state,
        conditions: [
          ...state.conditions,
          {
            min_money: 0,
            max_money: 0,
            gender: "female",
            amount: "",
            min_amount: 0,
          },
        ],
      };
    case "remove":
      const index = action.payload;
      return {
        ...state,
        conditions: [
          ...state.conditions.slice(0, index),
          ...state.conditions.slice(index + 1),
        ],
      };

    default:
      throw Error("unknown action");
  }
}

export default function CreateComponentForm({ setVisible, token, data }) {
  let initialState;
  let initialCount;
  if (data != null) {
    initialState = {
      component: {
        name: data.name,
        component_type: data.component_type,
      },
      conditions: data.globalConditions,
    };

    initialCount = data.globalConditions.length;
  } else {
    initialState = defaultInitialState;
    initialCount = defaultInitialCount;
  }
  const [component, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(initialCount);

  return (
    <div className="floating-form component-creation-form">
      <h2>
        {data === null ? "Create New Component" : "Edit The Component"}
        <button
          onClick={() => setVisible(false)}
          className="btn btn-red btn-small cancel-btn"
        >
          cancel
        </button>
      </h2>
      <div>
        <input
          className="input-1"
          type="text"
          placeholder="Enter Component Name"
          value={component.component.name}
          onChange={(e) =>
            dispatch({ type: "change/name", payload: e.target.value })
          }
        />
      </div>
      <div>
        <select
          className="input-2"
          value={component.component.component_type}
          onChange={(e) =>
            dispatch({ type: "change/type", payload: e.target.value })
          }
        >
          <option value="compensation">Compensation</option>
          <option value="deduction">Deduction</option>
        </select>
      </div>
      <h3>
        Conditions
        <button
          className="btn btn-plus"
          onClick={() => {
            dispatch({ type: "increase", payload: null });
            setCount(count + 1);
          }}
        >
          +
        </button>
      </h3>
      <div className="condition-form">
        <span>Minimum Money</span>
        <span>Maximum Money</span>
        <span>Gender</span>
        <span>Amount</span>
        <span>Minimum Amount</span>
      </div>
      <div>
        {Array.from({ length: count }).map((_, index) => (
          <ConditionForm
            dispatch={dispatch}
            setCount={setCount}
            condition={component.conditions[index]}
            index={index}
            key={index}
          />
        ))}
      </div>
      {data === null ? (
        <CreateButton
          setVisible={setVisible}
          component={component}
          token={token}
        />
      ) : (
        <EditButton
          setVisible={setVisible}
          component={component}
          token={token}
          id={data.id}
        />
      )}
    </div>
  );
}
