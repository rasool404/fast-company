import React, {useEffect, useState} from 'react';
import Avatar from "../Avatar/avatar";
import * as dayjs from 'dayjs'

const Comments = ({commentForUser, removeCommit, users}) => {
    const [map, setMap] = useState(new Map())

    useEffect(() => {
        getNameUser()
    }, [users, commentForUser])

    const getNameUser = () => {
        users.forEach((user) => {
            commentForUser.forEach((userComment) => {
                if (user._id === userComment.userId) {
                    setMap(new Map(map.set(user._id, user.name)))
                }
            })
        })
    }

    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Коментарии</h2>
                    <hr/>
                    {commentForUser.map((comment) => (
                        <div className="bg-light card-body mb-3" key={comment._id}>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex flex-start">
                                        <Avatar classItem="rounded-circle shadow-1-strong me-3" width={65}
                                                height={65}/>
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">{map.get(comment.userId)} <span
                                                        className="small">{dayjs(+comment.created_at).format('DD.MM.YYYY')}</span>
                                                    </p>
                                                    <button
                                                        className="btn btn-sm text-primary d-flex align-items-center"
                                                        onClick={() => removeCommit(comment._id)}
                                                    >
                                                        <i className="bi bi-x-lg"/>
                                                    </button>
                                                </div>
                                                <p className="small mb-0">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Comments;