import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, onChange, defaultOption, options, error }) => {
    const getInputClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name="profession"
                value={defaultOption}
                onChange={handleChange}
            >
                <option disabled value={defaultOption}>
                    {optionsArray &&
                        [
                            optionsArray.find((option) => {
                                return option.value === defaultOption;
                            })
                        ][0].name}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string
    ]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
