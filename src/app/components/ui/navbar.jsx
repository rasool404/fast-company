import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Гланая
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Регистрация
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users">
          Пользователи
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
