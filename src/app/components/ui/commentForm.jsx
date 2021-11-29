import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ pageId, handleSubmit }) => {
    const users = JSON.parse(localStorage.getItem("users"));

    const [data, setData] = useState({
        userId: "",
        pageId: pageId,
        content: ""
    });

    const handleChangeForUser = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            userId: target.value
        }));
    };

    const handleChangeForText = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            content: target.value
        }));
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleSubmit(data);
        setData({
            userId: "",
            pageId: pageId,
            content: ""
        });
        e.target[0].value = "default";
        e.target[1].value = "";
    };

    console.log(data);
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <form action="" onSubmit={(e) => onSubmit(data, e)}>
                        <h2>New comment</h2>
                        <div className="mb-4">
                            <select
                                className="form-select"
                                defaultValue="default"
                                onChange={handleChangeForUser}
                                name="userId"
                            >
                                <option disabled value="default">
                                    Выберите пользователя
                                </option>

                                {users.map((user) => {
                                    return (
                                        <option key={user._id} value={user._id}>
                                            {user.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Сообщение</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                name="content"
                                onChange={handleChangeForText}
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-primary"
                                // onClick={() => onSubmit(data)}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    pageId: PropTypes.string,
    handleSubmit: PropTypes.func
};

export default CommentForm;
