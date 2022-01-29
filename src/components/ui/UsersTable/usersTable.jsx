import React from 'react';
import PropTypes from "prop-types";
import Bookmark from "../../common/Bookmark/bookmark";
import Qualities from "../qualities";
import Table from "../../common/table";

const UsersTable = ({selectedSort, onSort, users, onToggleBookMark, deleteUser}) => {
    const columns = {
        name: {path:'name', name:'Имя'},
        qualities: {name:'Качества', component: (user) => <Qualities qualities={user.qualities} />},
        profession: {path:'profession.name', name:'Профессия'},
        completedMeetings: {path:'completedMeetings', name:'Встретился раз'},
        rate: {path:'rate', name:'Оценка'},
        bookmark: {
            path:'bookmark',
            name:'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}>
                    Удалить
                </button>
            )}
    }

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    deleteUser: PropTypes.func,
    usersAll: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSort: PropTypes.func,
    currentSort: PropTypes.object,
    onToggleBookMark: PropTypes.func,
}

export default UsersTable;