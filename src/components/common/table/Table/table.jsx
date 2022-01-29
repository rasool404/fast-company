import React from 'react';
import TableHeader from "../TableHeader/tableHeader";
import TableBody from "../TableBody/tableBody";

const Table = ({data, columns, onSort, selectedSort}) => {
    return (
        <table className="table">
            <TableHeader {...{selectedSort, onSort, columns}} />
            <TableBody {...{columns, data}} />
        </table>
    );
};

export default Table;