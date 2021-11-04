import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const rednderPhrase = (number) => {
    const term =
      String(number).match(/[2-4]$/) && String(number).slice(-2, -1) !== "1"
        ? "человека"
        : "человек";

    return (
      <div className={`badge bg-${number ? "primary" : "danger"} fs-2 mb-3`}>
        {number
          ? `${number} ${term} ${
            number === 1 ? "тусанeт" : "тусанут"
          } с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </div>
    );
  };

  return <>{rednderPhrase(length)}</>;
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
