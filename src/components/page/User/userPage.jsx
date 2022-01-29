import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import {getMaterialUrl} from '../../../utils/getMaterialUrl'
import api from "../../../api";
import Loader from "../../common/Loader";
import UserCard from "../../ui/UserCard/userCard";
import UserComments from "../../ui/UserComments/userComments";

const UserPage = () => {
    const location = useLocation()
    const userId = getMaterialUrl(location.pathname)
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data))
    }, [])

    if (user) {
        return (
            <div className="container mt-5">
                <div className="row gutters-sm">
                    <UserCard
                        userId={userId}
                        userName={user.name}
                        userProfession={user.profession.name}
                        qualities={user.qualities}
                        completedMeetings={user.completedMeetings}
                        rate={user.rate}
                    />
                    <UserComments userId={userId}/>
                </div>
            </div>
        );
    } else return <Loader/>
};

export default UserPage;