import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    return (
        <button className='bookmark-button' {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")} />
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
