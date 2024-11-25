import { useState } from "react";

import CreateComponentForm from "./createComponentForm";

export default function NewComponent({ token }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="btn btn-green createnew-btn"
      >
        CREATE NEW COMPONENT
      </button>
      {visible ? (
        <CreateComponentForm
          data={null}
          setVisible={setVisible}
          token={token}
        />
      ) : null}
    </>
  );
}
