import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onIncreaseCurrentPage,
  onDecreaseCurrentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  if (pageCount <= 1) return null;

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <li className={`page-item ${currentPage <= 1 && "disabled"}`}>
          <span
            onClick={onDecreaseCurrentPage}
            className="page-link"
            role="button"
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && "active"}`}
          >
            <span
              onClick={() => onPageChange(page)}
              className="page-link"
              role="button"
            >
              {page}
            </span>
          </li>
        ))}
        <li className={`page-item ${currentPage >= pageCount && "disabled"}`}>
          <span
            onClick={onIncreaseCurrentPage}
            className="page-link"
            role="button"
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onIncreaseCurrentPage: PropTypes.func.isRequired,
  onDecreaseCurrentPage: PropTypes.func.isRequired
};

export default Pagination;
