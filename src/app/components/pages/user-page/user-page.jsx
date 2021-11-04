import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../../components/ui/qualities";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className="col-md-6 mx-auto text-center">
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>Завершенные встречи: {user.completedMeetings}</p>
        <h3>Рейтинг: {user.rate}</h3>
        <button onClick={handleClick} className="btn btn-primary">
          Все пользователи
        </button>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center my-5">
        <div
          className="spinner-border"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
