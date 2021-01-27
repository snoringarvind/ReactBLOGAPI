import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import uniqid from "uniqid";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";
import "./Detail.css";
import { BlogsContext } from "../Context";

const Detail = () => {
  const { serverUrl } = useContext(BlogsContext);
  const [blogDetail, setblogDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [error, setError] = useState("");
  const [commentError, setCommentError] = useState("");

  const [comment, setComment] = useState([]);

  const [commentsLoading, setCommentsLoading] = useState(true);

  const [gotComments, setGotComments] = useState(false);

  const axios_blogDetail = async () => {
    try {
      const response = await axios({
        url: `${serverUrl}/blog/${params.id}`,
        method: "GET",
      });
      // console.log(response);
      setblogDetail(response.data);
      setLoading(false);
      setError("");
    } catch (err) {
      console.log("Detail=", err.message);
      setLoading(false);
      setError(err.message);
    }
  };

  const axios_getComment = async () => {
    // console.log(params.id);
    try {
      const response = await axios({
        url: `${serverUrl}/blog/${params.id}/comment`,
        method: "GET",
      });
      // console.log(response);
      // console.log(response.data);
      setComment(response.data);
      setCommentsLoading(false);
      setCommentError("");
    } catch (err) {
      setCommentError(err.message);
      setCommentsLoading(false);
      console.log("Detail=", err.message);
    }
  };

  useEffect(() => {
    axios_blogDetail();
  }, []);

  useEffect(() => {
    axios_getComment();
  }, [gotComments]);

  const displayError = () => {
    return <div className="error">{error}</div>;
  };

  const displayCommentError = () => {
    return <div className="comment-error">{commentError}</div>;
  };
  const displayBlog = () => {
    return (
      <div className="blog">
        <>
          {" "}
          <div className="title">{blogDetail.title}</div>
          <div className="content">{blogDetail.content}</div>
          <div className="update-btn">
            <Link to={`/blog/${blogDetail._id}/update`}>
              <button>Update</button>
            </Link>
          </div>
          <div className="delete-btn">
            <Link to={`/blog/${blogDetail._id}/delete`}>
              <button>Delete</button>
            </Link>
          </div>
        </>
      </div>
    );
  };

  return (
    <div className="Detail">
      {loading && "loading...."}
      {!loading && (error ? displayError() : displayBlog())}
      <CommentForm
        comment={comment}
        setComment={setComment}
        setGotComments={setGotComments}
        gotComments={gotComments}
        params={params}
        commentsLoading={commentsLoading}
        setCommentsLoading={setCommentsLoading}
      />
      {commentsLoading && "comments loading...."}

      {!commentsLoading &&
        (commentError ? (
          displayCommentError()
        ) : comment.length > 0 ? (
          <div className="comments-container">
            <div className="comments">
              {comment.map((value, index) => {
                return (
                  <CommentDisplay
                    key={uniqid()}
                    comment={value}
                    index={index}
                    params={params}
                    gotComments={gotComments}
                    setGotComments={setGotComments}
                    setCommentsLoading={setCommentsLoading}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>No comments on this blog.</div>
        ))}
    </div>
  );
};

export default Detail;
