import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import uniqid from "uniqid";
import "./List.css";
import { BlogsContext } from "../Context";

const List = () => {
  console.log("hiiiiiiiii");
  const [blogList, setBlogList] = useState([]);
  const [error, setError] = useState("");
  const { serverUrl } = useContext(BlogsContext);

  // loading is true until we get a response from the server
  const [loading, setLoading] = useState(true);

  const axios_blogList = async () => {
    try {
      const response = await axios({
        url: `${serverUrl}/blogs`,
        method: "GET",
      });
      // console.log(response.data);
      setBlogList(response.data);
      setLoading(false);
    } catch (err) {
      console.log("List=", err.message);
      setError(err.message); //important server errors
      setLoading(false);
    }
  };

  useEffect(() => {
    axios_blogList();
  }, []);

  const displayBlogs = () => {
    // console.log(blogList);
    if (blogList.length == 0) {
      return <div>No blogs to display.</div>;
    } else {
      let arr = [];
      for (let i = 0; i < blogList.length; i++) {
        let x = (
          <div className="card" key={uniqid()}>
            <Link to={`/blog/${blogList[i]._id}`} className="card-link">
              <div className="title">{blogList[i].title}</div>
              <div className="content list-content">{blogList[i].content}</div>
            </Link>
          </div>
        );
        arr.push(x);
      }
      return arr;
    }
  };

  const displayError = () => {
    return <div className="error">{error}</div>;
  };

  return (
    <div className="List">
      {loading && "loading....."}
      {!loading && (error ? displayError() : displayBlogs())}
    </div>
  );
};

export default List;
