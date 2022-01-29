import React, {useEffect, useState} from 'react';
import TextField from "../../common/form/TextField/textField";
import SelectField from "../../common/form/SelectField/selectField";
import RadioField from "../../common/form/RadioField/radioField";
import MultiSelectField from "../../common/form/MultiSelectField/multiSelectField";
import {validator} from "../../../utils/validator";
import api from "../../../api";
import {useHistory, useRouteMatch} from 'react-router-dom'
import _ from 'lodash'

const EditPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'муж',
        qualities: [],
        licence: false
    })
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})
    const [defaultQuality] = useState([])
    const match = useRouteMatch()
    const userId = match.params.userId
    const history = useHistory()

    useEffect(() => {
        validate()
    }, [data])

    useEffect(() => {
        api.users.getById(userId).then(data => setData(data))
        api.professions.fetchAll().then(data => setProfessions(data))
        api.qualities.fetchAll().then(data => setQualities(data))
    }, [])

    useEffect(() => {
        changeQualities(data.qualities)
    }, [data.qualities])

    const changeQualities = (qualities) => {
        qualities.forEach((quality) => {
            const name = quality.name ? quality.name : quality.label
            const value = quality._id ? quality._id : quality.value

            defaultQuality.push({label: name, value: value})
        })
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Введите корректый емейл'
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

        const users = JSON.parse(localStorage.getItem('users'))

        const editUser = users.find(key => key._id === userId)

        if (_.isEqual(editUser, data)) return
        updateUserData(users)
    }

    const compareProfession = (selectedProfession) => {
        return Object.values(professions).find(key => key._id === selectedProfession)
    }

    const compareQualities = (selectedQualities) => {
        let qualitiesEdit = []

        selectedQualities.forEach((selectedQuality) => {
            const qualityId = selectedQuality.value ? selectedQuality.value : selectedQuality._id

            qualitiesEdit.push(Object.values(qualities).find(key => key._id === qualityId))
        })

        return qualitiesEdit
    }

    const updateUserData = (users) => {

        users.forEach((user) => {
            if (user._id === userId) {
                user.name = data.name
                user.email = data.email
                user.profession = compareProfession(data.profession)
                user.sex = data.sex
                user.qualities = compareQualities(data.qualities)
            }
        })

        localStorage.setItem('users', JSON.stringify(users))
        window.location.assign(`/users/${userId}`)
    }

    return (
        <>
            <div className='container mt-5'>
                <button
                    className='btn btn-primary w-60 mx-auto'
                    onClick={() => history.goBack()}
                >
                    Назад
                </button>
            </div>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Имя'
                                name='name'
                                onChange={handleChange}
                                value={data.name}
                                error={errors.name}
                            />
                            <TextField
                                label='Email'
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                defaultOptions='Выберите...'
                                error={errors.profession}
                                value={data.profession._id}
                                label="Выберите вашу профессию"
                                name='profession'
                            />
                            <RadioField
                                options={[
                                    {name: 'муж', value: 'male'},
                                    {name: 'жен', value: 'female'},
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
                                defaultValue={defaultQuality}
                                label='Выберите ваши качества'
                            />
                            <button
                                className='btn btn-primary w-100 mx-auto'
                                disabled={!isValid}
                                onClick={handleSubmit}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPage;