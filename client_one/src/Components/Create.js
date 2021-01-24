import React, { useState } from "react";
import Form from "./Form";

const Create = () => {
  const [state, setState] = useState({ title: "", content: "" });
  const url = "http://localhost:3000/api/blogs";
  const method = "POST";
  return (
    <div className="Create">
      <Form state={state} setState={setState} url={url} method={method} />
    </div>
  );
};

export default Create;
