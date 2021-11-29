import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {/* eslint-disable */}
            {!userId ? (
                <UsersListPage />
            ) : (
                <UserPage userId={userId} edit={edit} />
            )}
            {/* eslint-enable */}
        </>
    );
};

export default Users;
