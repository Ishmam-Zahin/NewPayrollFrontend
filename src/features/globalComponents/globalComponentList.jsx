import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import NewComponent from "./newComponent";
import ComponentCard from "./componentCard";
import getGlobalComponentList from "../../helper/getGlobalComponentList";

export default function GlobalComponentList() {
  const token = useSelector((state) => state.userState.token);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["componentList"],
    queryFn: () => getGlobalComponentList({ token }),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }
  return (
    <div className="main-area component-page-container">
      <h1>Global Components</h1>
      <NewComponent token={token} />
      <div className="componentCard componentCardHeader">
        <div>No</div>
        <div>Name</div>
        <div>Type</div>
        <div>Actions</div>
      </div>
      {data.map((component, index) => (
        <ComponentCard
          component={component}
          no={index + 1}
          token={token}
          key={component.id}
        />
      ))}
    </div>
  );
}
