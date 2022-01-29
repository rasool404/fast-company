import React, {useEffect, useState} from 'react';
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/TextField/textField";
import CheckBoxField from "../../common/form/CheckBoxField/checkBoxField";

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: '', stayOn: false})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Введите корректый емейл'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содердать хотя бы одну заглавную букву'
            },
            isConfigDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль должен содержать минимум 8 символов',
                value: 8
            }
        }
    }

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()

        if (!isValid) return
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Email'
                name='email'
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />

            <TextField
                label='Пароль'
                name='password'
                onChange={handleChange}
                value={data.password}
                type='password'
                error={errors.password}
            />

            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name='stayOn'
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className='btn btn-primary w-100 mx-auto'
                disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;