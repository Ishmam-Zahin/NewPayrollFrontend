export default function ConditionForm({
  condition,
  dispatch,
  index,
  setCount,
}) {
  return (
    <div className="condition-form">
      <input
        type="number"
        placeholder="Minimum Money"
        value={condition.min_money}
        onChange={(e) =>
          dispatch({
            type: "change/minMoney",
            payload: { index: index, value: e.target.value },
          })
        }
      />
      <input
        type="number"
        value={condition.max_money}
        onChange={(e) =>
          dispatch({
            type: "change/maxMoney",
            payload: { index: index, value: e.target.value },
          })
        }
      />
      <select
        value={condition.gender}
        onChange={(e) =>
          dispatch({
            type: "change/gender",
            payload: { index: index, value: e.target.value },
          })
        }
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        value={condition.amount}
        onChange={(e) =>
          dispatch({
            type: "change/amount",
            payload: { index: index, value: e.target.value },
          })
        }
      />
      <input
        type="number"
        value={condition.min_amount}
        onChange={(e) =>
          dispatch({
            type: "change/minAmount",
            payload: { index: index, value: e.target.value },
          })
        }
      />
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "remove", payload: index });
          setCount((state) => state - 1);
        }}
      >
        x
      </button>
    </div>
  );
}
