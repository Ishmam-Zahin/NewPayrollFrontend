import { useState } from "react";

import CreateUserForm from "./createUserForm";

export default function NewUser({ token }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="btn btn-green createnew-btn"
      >
        CREATE NEW USER
      </button>
      {visible ? (
        <CreateUserForm setVisible={setVisible} token={token} />
      ) : null}
    </>
  );
}
