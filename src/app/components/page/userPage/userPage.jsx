import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "./cardForUser/userCard";
import QualitiesCard from "./cardForUser/qualitiesCard";
import MeetingsCard from "./cardForUser/meetingsCard";
import CommentsList from "../../ui/comments/commentsList";
import CommentForm from "../../ui/commentForm";
import EditorForm from "../../ui/editorForm";

const UserPage = ({ userId, edit }) => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comments) => setComments(comments));
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleDelete = (id) => {
        api.comments.remove(id);
        setComments(
            comments.filter((comment) => {
                return comment._id !== id;
            })
        );
    };

    const handleSubmit = (data) => {
        api.comments.add(data).then((newComment) => {
            setComments((prev) => [...prev, newComment]);
        });
    };

    if (user && !edit) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard user={user} />
                        <MeetingsCard user={user} />
                    </div>

                    {comments && (
                        <div className="col-md-8">
                            <CommentForm
                                pageId={userId}
                                handleSubmit={handleSubmit}
                            />
                            <CommentsList
                                comments={comments}
                                label="Comments"
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    } else if (edit && user) {
        return <EditorForm user={user} userId={userId} />;
    } else {
        return <p>loading ...</p>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
    edit: PropTypes.string
};

export default UserPage;
