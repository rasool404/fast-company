import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

const Pagination = ({users, pageSize, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(users / pageSize)
    const pages = _.range(1, pageCount + 1)

    if (pageCount === 1) return null
    return (
        <>
            <nav className="wrapper__body-users-paginate">
                <ul className="pagination">
                    {pages.map((page) =>
                        <li className={"page-item" + (page === currentPage ? " active" : "")} key={page}>
                            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    users: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
}

export default Pagination;