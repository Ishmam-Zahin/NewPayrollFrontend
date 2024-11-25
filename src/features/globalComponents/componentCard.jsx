import { Link } from "react-router-dom";

import DeleteButton from "./deleteButton";

export default function ComponentCard({ component, no, token }) {
  return (
    <div className="componentCard">
      <div>0{no}</div>
      <div>{component.name}</div>
      <div>{component.component_type}</div>
      <div>
        <Link to={`/globalComponent/detail/${component.id}`}>
          <button className="btn btn-green btn-small">VIEW</button>
        </Link>
        <DeleteButton token={token} id={component.id} />
      </div>
    </div>
  );
}
