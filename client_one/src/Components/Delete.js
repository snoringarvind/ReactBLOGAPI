import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { BlogsContext } from "./Context";

const Delete = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [setIsAuth] = isAuthValue;
  // const [jwtData, setJwtData] = jwtDataValue;

  const params = useParams();
  const [blog, setBlog] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();
  console.log(history);

  useEffect(() => {
    const axios_blogDetail = async () => {
      try {
        const response = await axios({
          url: `http://localhost:3000/api/blog/${params.id}`,
          method: "GET",
        });
        console.log(response);
        setLoading(false);
        setBlog(response.data);
      } catch (err) {
        console.log("Delete=", err.message);
        setError(err.message);
      }
    };
    axios_blogDetail();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);

    const jwt = JSON.parse(localStorage.getItem("jwtData"));
    if (jwt == null) {
      window.location.reload();
    }

    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };

      await axios({
        url: `http://localhost:3000/api/blog/${params.id}`,
        headers: headers,
        method: "DELETE",
      });
      setLoadingBtn(false);
      setIsDeleted(true);
      setError("");
    } catch (err) {
      setError(err.message);
      console.log("DELETE=", err.message);
    }
  };

  const displayError = () => {
    return <div className="error">{error}</div>;
  };

  return (
    <div className="Delete">
      {loading && "Loading..."}
      {!loading &&
        (error ? (
          displayError()
        ) : (
          <>
            <div className="Detail">
              <div className="title">{blog.title}</div>
              <div className="content">{blog.content}</div>
            </div>
            <div className="confirm-delete-msg">
              <p>Are you sure, you want to delete this blog?</p>
            </div>
            <div className="delete-btn">
              <button onClick={submitHandler}>
                {loadingBtn ? "Deleting...." : "Delete"}
              </button>
            </div>
            {isDeleted && <Redirect to="/blogs" />}
          </>
        ))}
    </div>
  );
};

export default Delete;
