import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ value, placeholder, onChange }) => {
  return (
    <div className="mb-3">
      <input
        value={value}
        onChange={onChange}
        className="form-control"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

SearchField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchField;
