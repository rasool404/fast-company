import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditorForm = ({ user, userId }) => {
    const history = useHistory();

    const [data, setData] = useState({
        email: user.email,
        name: user.name,
        profession: user.profession._id,
        sex: "male",
        qualities: Object.keys(user.qualities).map((optionName) => ({
            label: user.qualities[optionName].name,
            value: user.qualities[optionName]._id,
            color: user.qualities[optionName].color
        })),
        licence: false
    });

    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "Почта обязательна для заполнения!" },
            isEmail: { message: "Email введен некорректно!" }
        },
        profession: {
            isRequired: { message: "Обзятельно выбериту вашу профессию!" }
        },
        name: {
            isRequired: {
                message: "Обязательно нужно указать имя пользвателя"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users
            .update(userId, {
                ...data,
                qualities: data.qualities.map((qual) => {
                    return {
                        _id: qual.value,
                        name: qual.label,
                        color: qual.color
                    };
                }),
                profession:
                    professions[
                        Object.keys(professions).find((profession) => {
                            return (
                                professions[profession]._id === data.profession
                            );
                        })
                    ]
            })
            .then((newData) => {
                setData(newData);
            });
        history.push("/users");
    };

    const handleButton = () => {
        history.push("/users/" + userId);
    };

    if (user) {
        return (
            <div className="container mt-5">
                <div className="row d-flex">
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={handleButton}
                        >
                            Назад
                        </button>
                    </div>
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                name="profession"
                                options={professions}
                                defaultOption={data.profession}
                                label="Выберите вашу профессию!"
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Others", value: "others" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                            />
                            <button
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

EditorForm.propTypes = {
    user: PropTypes.object,
    userId: PropTypes.string
};

export default EditorForm;
