import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Form from "./Form/Form";

const Create = () => {
  const [state, setState] = useState({ title: "", content: "" });
  const url = "http://localhost:3000/api/blogs";
  const method = "POST";

  const match = useRouteMatch().isExact;
  console.log(match);
  return (
    <div className="Create">
      <Form state={state} setState={setState} url={url} method={method} />
    </div>
  );
};

export default Create;
