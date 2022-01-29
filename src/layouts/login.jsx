import React, {useState} from 'react';
import LoginForm from "../components/ui/LoginForm/loginForm";
import RegisterForm from "../components/ui/RegisterForm/registerForm";
import {useParams} from "react-router-dom";

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type === 'register' ? type : 'login')

    const toggleFormType = () => {
        setFormType(prevState => prevState === 'register' ? 'login' : 'register')
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === 'register' ? (
                        <>
                            <h3 className='mb-4'>Регистрация</h3>
                            <RegisterForm/>
                            <p>Уже есть аккаунт? <a role="button" onClick={toggleFormType}>Войти</a></p>
                        </>
                    ) : (
                        <>
                            <h3 className='mb-4'>Вход</h3>
                            <LoginForm/>
                            <p>Нет аккайнта? <a role="button" onClick={toggleFormType}>Зарегистрироваться</a></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;