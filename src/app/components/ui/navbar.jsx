import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">
          Гланая
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Регистрация
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/users">
          Пользователи
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
