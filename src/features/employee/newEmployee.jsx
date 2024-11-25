import { useState } from "react";

import CreateEmployeeForm from "./createEmployeeForm";

export default function NewEmployee({ token }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="btn btn-green createnew-btn"
      >
        CREATE NEW EMPLOYEE
      </button>
      {visible ? (
        <CreateEmployeeForm data={null} setVisible={setVisible} token={token} />
      ) : null}
    </>
  );
}
