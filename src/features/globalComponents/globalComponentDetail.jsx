import { useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import getGlobalComponent from "../../helper/getGlobalComponentDetail";
import ConditionRow from "./conditionRow";
import CreateComponentForm from "./createComponentForm";

export default function GlobalComponentDetail() {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const token = useSelector((state) => state.userState.token);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["componentDetail"],
    queryFn: () => getGlobalComponent({ id, token }),
  });
  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-area component-detail-container">
      <h1>
        Component Details
        <button className="btn btn-green" onClick={() => setVisible(true)}>
          EDIT
        </button>
      </h1>
      {visible ? (
        <CreateComponentForm
          data={data}
          setVisible={setVisible}
          token={token}
        />
      ) : null}
      <p>
        <b>Name:</b> {data.name}
      </p>
      <p>
        <b>Type:</b> {data.component_type}
      </p>
      <div className="table-container">
        <p>Conditions</p>
        <div className="tablex">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Minimum Money</th>
                <th>Maximum Money</th>
                <th>Gender</th>
                <th>Amount</th>
                <th>Minimum Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.globalConditions.map((condition, index) => (
                <ConditionRow
                  condition={condition}
                  no={index + 1}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
