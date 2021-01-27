import React, { useContext, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { BlogsContext } from "./Context";
import Form from "./Form/Form";

const Create = () => {
  const [state, setState] = useState({ title: "", content: "" });
  const { serverUrl } = useContext(BlogsContext);

  const url = `${serverUrl}/blogs`;
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
