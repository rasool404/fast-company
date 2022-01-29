import React from 'react';
import PropTypes from "prop-types";

const TableHeader = ({onSort, selectedSort, columns}) => {

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort((currentSort) => ({...currentSort, order: currentSort.order === 'asc' ? 'desc' : 'asc'}))
        } else {
            onSort({path: item, order: 'asc'})
        }
    }

    const renderArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === 'desc') {
                return <i className="bi bi-caret-up-fill" />
            } else {
                return <i className="bi bi-caret-down-fill" />
            }
        }
        return null
    }

    return (
        <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th
                    key={column}
                    onClick={columns[column].path ?
                        () => handleSort(columns[column].path)
                        : undefined}
                    {...{role: columns[column].path && 'button'}}
                    scope="col"
                >
                    {columns[column].name}
                    {columns[column].path ? renderArrow(selectedSort, columns[column].path) : undefined}
                </th>
            ))}
        </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
}

export default TableHeader;