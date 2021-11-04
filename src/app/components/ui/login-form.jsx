import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../common/form/text-field";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электроннная почта обязательна для заполнения" },
      isEmail: { message: "Некорректно введен адрес электронной почты" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: { message: "Пароль должен содержать не менее 8 символов", value: 8 }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValide = !Object.keys(errors).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Авторизоваться</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button className="btn btn-primary w-100" disabled={!isValide}>
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
