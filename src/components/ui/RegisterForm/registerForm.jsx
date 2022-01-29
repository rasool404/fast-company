import React, {useEffect, useState} from 'react';
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/TextField/textField";
import api from '../../../api'
import SelectField from "../../common/form/SelectField/selectField";
import RadioField from "../../common/form/RadioField/radioField";
import MultiSelectField from "../../common/form/MultiSelectField/multiSelectField";
import CheckBoxField from "../../common/form/CheckBoxField/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'муж',
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})

    useEffect(() => {
        validate()
    }, [data])

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data))
        api.qualities.fetchAll().then(data => setQualities(data))

    }, [])

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
        },
        profession: {
            isRequired: {
                message: 'Выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message: 'Вы не можете использовать приложение без лицензионного соглашения'
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
            <SelectField
                onChange={handleChange}
                options={professions}
                defaultOptions='Выберите...'
                error={errors.profession}
                value={data.profession}
                label="Выберите вашу профессию"
                name='profession'
            />
            <RadioField
                options={[
                    {name: 'муж', value: 'муж'},
                    {name: 'жен', value: 'жен'},
                    {name: 'хз', value: 'хз'},
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберите ваш пол'
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name='qualities'
                defaultValue={data.qualities}
                label='Выберите ваши качества'
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name='licence'
                error={errors.licence}
            >
                Подтвердить лецензионное соглашение
            </CheckBoxField>
            <button
                className='btn btn-primary w-100 mx-auto'
                disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;