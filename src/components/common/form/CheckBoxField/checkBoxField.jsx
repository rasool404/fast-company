import React from 'react';
import PropTypes from "prop-types";

const CheckBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = () => {
        onChange({name: name, value: !value})
    }

    const getInputClasses = () => {
        return 'form-check-input' + (error? ' is-invalid' : ' is-valid')
    }

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className={getInputClasses()}
                    type="checkbox"
                    id={name}
                    onChange={handleChange}
                    checked={value}
                />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
                {error && <div className='invalid-feedback'>{error}</div>}
            </div>
        </div>
    );
};

CheckBoxField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default CheckBoxField;