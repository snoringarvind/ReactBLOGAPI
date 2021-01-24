import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="Navigation">
      <Link className="nav-links" to="/blogs">
        Blogs
      </Link>
      <Link className="nav-links" to="/create">
        Create
      </Link>
      <Link className="nav-links" to="/logout">
        Logout
      </Link>
    </div>
  );
};

export default Navigation;
