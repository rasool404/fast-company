import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
  return (
    <span className="d-block text-center text-danger" role="button" {...rest}>
      <i className={`bi bi-bookmark${status ? "-fill" : ""} fs-4`}></i>
    </span>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool
};

export default Bookmark;
