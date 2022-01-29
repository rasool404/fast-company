import React from 'react';
import {Link} from "react-router-dom";
import QualitiesList from "../qualities";
import Avatar from "../Avatar/avatar";

const UserCard = ({userId, qualities, userName, completedMeetings, rate, userProfession}) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card mb-3">
                <div className="card-body">
                    <Link to={`/users/${userId}/edit`}>
                        <button
                            className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <i className="bi bi-gear" />
                        </button>
                    </Link>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <Avatar classItem="rounded-circle" width={150}/>
                        <div className="mt-3">
                            <h4>{userName}</h4>
                            <p className="text-secondary mb-1">{userProfession}</p>
                            <div className="text-muted">
                                <i className="bi bi-caret-down-fill text-primary" role="button"/>
                                <i className="bi bi-caret-up text-secondary" role="button" />
                                <span className="ms-2">{rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div
                    className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Качества</span>
                    </h5>
                    <p className="card-text">
                        <QualitiesList qualities={qualities} />
                    </p>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Встретился раз</span>
                    </h5>

                    <h1 className="display-1">{completedMeetings}</h1>
                </div>
            </div>
        </div>
    );
};

export default UserCard;