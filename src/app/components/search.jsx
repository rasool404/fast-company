import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearch }) => {
    return (
        <div>
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default Search;
