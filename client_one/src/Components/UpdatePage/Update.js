import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "../Form/Form";
import "../Form/Form.css";

const Update = () => {
  const params = useParams();
  const [error, setError] = useState("");
  const [state, setState] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  const axios_blogUpdate = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3000/api/blog/${params.id}`,
        method: "GET",
      });
      setState(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Update", err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  const displayError = () => {
    return <div className="error">{error}</div>;
  };

  useEffect(() => {
    axios_blogUpdate();
  }, []);

  const url = `http://localhost:3000/api/blog/${params.id}`;
  const method = "PUT";

  return (
    <div className="Update">
      {loading && "loading...."}
      {!loading &&
        (error ? (
          displayError()
        ) : (
          <Form state={state} setState={setState} url={url} method={method} />
        ))}
    </div>
  );
};

export default Update;
