import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, label, onDelete }) => {
    return (
        <>
            {comments.length !== 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>{label}</h2>
                        <hr />
                        {comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment._id}
                                    publishedTime={comment.created_at}
                                    commentText={comment.content}
                                    userId={comment.userId}
                                    commentId={comment._id}
                                    onDelete={onDelete}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
    label: PropTypes.string,
    onDelete: PropTypes.func
};

export default CommentsList;
