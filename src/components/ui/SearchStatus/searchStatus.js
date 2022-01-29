import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({number}) => {
  if (number > 4 || number === 1) {
    return <span className="badge bg-primary">{number} человек хочет с тобой тусануть</span>
  } else if (number <= 4 && number !== 0) {
    return <span className="badge bg-primary">{number} человека хочет с тобой тусануть</span>
  } else if (number === 0) {
    return <span className="badge bg-danger">Сори брат с тобой не тусанут</span>
  }
};

SearchStatus.propTypes = {
  number: PropTypes.number
}

export default SearchStatus;