import React, {useEffect} from 'react';
import PropTypes from "prop-types";

const SelectField = ({label, value, onChange, defaultOptions, options, name, error}) => {
    const optionsArray = !Array.isArray(options) && typeof(options) === 'object' ?
        Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id })) : options

    const getInputClasses = () => {
        return 'form-select' + (error? ' is-invalid' : '')
    }

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    return (
        <div className="mb-4">
            <label
                htmlFor="validationDefault04"
                className="form-label"
            >
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationDefault04"
                value={value}
                onChange={handleChange}
                name={name}
            >
                <option
                    disabled
                    value=""
                >
                    {defaultOptions}
                </option>
                {optionsArray &&
                    optionsArray.map(option => (
                        <option
                            value={option.value ? option.value : option._id}
                            key={option.value ? option.value : option._id}
                        >
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOptions: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectField;