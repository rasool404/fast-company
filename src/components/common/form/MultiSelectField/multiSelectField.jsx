import React, {useEffect} from 'react';
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({options, onChange, name, defaultValue, label}) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === 'object' ?
        Object.keys(options).map(optionName => ({
            label: options[optionName].name,
            value: options[optionName]._id
        })) : options
    
    const handleChange = (value) => {
        onChange({name: name, value})
    }

    return (
        <div className="mb-4">
            <label
                htmlFor="validationDefault04"
                className="form-label"
            >
                {label}
            </label>
            <Select
                isMulti
                onChange={handleChange}
                options={optionsArray}
                classNamePrefix='select'
                className='basic-multi-select'
                name={name}
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultOptions: PropTypes.string,
    defaultValue: PropTypes.array,
}

export default MultiSelectField;